import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

const pokemon = data[0];

describe('Teste do componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
  });

  it(`Teste se as informações detalhadas do
    Pokémon selecionado são mostradas na tela.`, () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /pikachu details/i,
    });
    expect(heading).toBeInTheDocument();

    const pokeDetails = screen.queryByRole('link', { name: /more details/i });
    expect(pokeDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    expect(summary).toBeInTheDocument();

    const description = screen.getByText(pokemon.summary);
    expect(description).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com os mapas
    contendo as localizações do pokémon`, () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    });
    expect(heading).toBeInTheDocument();

    const locations = screen.getAllByAltText(`${pokemon.name} location`);
    expect(locations).toHaveLength(pokemon.foundAt.length);
    locations.forEach((l, i) => {
      expect(l).toHaveAttribute('src', pokemon.foundAt[i].map);
      expect(l).toHaveAttribute('alt', `${pokemon.name} location`);
      const locationName = screen.getByText(pokemon.foundAt[i].location);
      expect(locationName).toBeInTheDocument();
    });
  });

  it(`Teste se o usuário pode favoritar um pokémon
    através da página de detalhes.`, () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(false);

    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
