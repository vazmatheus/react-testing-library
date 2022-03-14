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

  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista
   quando o botão Próximo pokémon é clicado.`, () => {
    let pokeName = screen.getByTestId(pokemonNameTestId);
    expect(pokeName.innerHTML).toEqual(data[0].name);

    for (let i = 1; i < data.length; i += 1) {
      const button = screen.getByTestId('next-pokemon');
      expect(button.innerHTML).toEqual('Próximo pokémon');
      userEvent.click(button);

      pokeName = screen.getByTestId(pokemonNameTestId);
      expect(pokeName.innerHTML).toEqual(data[i].name);
    }

    const button = screen.getByTestId('next-pokemon');
    expect(button.innerHTML).toEqual('Próximo pokémon');
    userEvent.click(button);
    pokeName = screen.getByTestId(pokemonNameTestId);
    expect(pokeName.innerHTML).toEqual(data[0].name);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
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

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const allFilter = screen.getAllByRole('button')[0];
    expect(allFilter.innerHTML).toEqual('All');
    userEvent.click(allFilter);
    const pokeName = screen.getByTestId(pokemonNameTestId);
    expect(pokeName.innerHTML).toEqual(data[0].name);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.innerHTML).toEqual(data[0].type);
  });
});
