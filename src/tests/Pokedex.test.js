import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

const pokemonNameTestId = 'pokemon-name';

describe('Teste do componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
      />,
    );
  });

  it('Test if page contains an h2 heading with the text Encountered pokemons', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it(`Test if the next Pokemon on the list is displayed
  when the Next Pokemon button is clicked`, () => {
    let pokeName = screen.getByTestId(pokemonNameTestId);
    expect(pokeName.innerHTML).toEqual(data[0].name);

    for (let i = 1; i < data.length; i += 1) {
      const button = screen.getByTestId('next-pokemon');
      expect(button.innerHTML).toEqual('Next pokémon');
      userEvent.click(button);

      pokeName = screen.getByTestId(pokemonNameTestId);
      expect(pokeName.innerHTML).toEqual(data[i].name);
    }

    const button = screen.getByTestId('next-pokemon');
    expect(button.innerHTML).toEqual('Next pokémon');
    userEvent.click(button);
    pokeName = screen.getByTestId(pokemonNameTestId);
    expect(pokeName.innerHTML).toEqual(data[0].name);
  });

  it('Test if the Pokédex has the filter buttons', () => {
    const pokemonTypes = [];
    data.forEach(({ type }) => {
      if (!pokemonTypes.includes(type)) pokemonTypes.push(type);
    });

    const filterButtons = screen.getAllByTestId('pokemon-type-button');

    filterButtons.forEach((filter, i) => {
      const type = pokemonTypes[i];
      expect(filter.innerHTML).toEqual(type);
      userEvent.click(filter);

      const pokeType = screen.getByTestId('pokemon-type');
      expect(pokeType.innerHTML).toEqual(type);
    });

    const allFilter = screen.getAllByRole('button')[0];
    expect(allFilter.innerHTML).toEqual('All');
  });

  it('Test if the Pokédex contains a button to reset the filter', () => {
    const allFilter = screen.getAllByRole('button')[0];
    expect(allFilter.innerHTML).toEqual('All');
    userEvent.click(allFilter);
    const pokeName = screen.getByTestId(pokemonNameTestId);
    expect(pokeName.innerHTML).toEqual(data[0].name);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toEqual(data[0].type);
  });
});
