import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

const pokemon = data[0];
const { id, averageWeight: { value, measurementUnit }, name, type, image } = pokemon;

let history;

describe('Pokemon component test', () => {
  beforeEach(() => {
    const router = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    history = router.history;
  });
  it('Tests if a card with the information of a given pokémon is rendered', () => {
    // access screen elements
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByRole('img', { name: /pikachu sprite/i });

    // do the tests
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', image);
    expect(pokeImage).toHaveAttribute('alt', `${name} sprite`);
  });

  it(
    `Test if the card of the Pokémon listed in the Pokédex contains a link
    navigation to view details of this Pokémon`, () => {
      // access screen elements
      const pokeDetails = screen.getByRole('link', { name: /more details/i });

      // do the tests
      expect(pokeDetails).toBeInTheDocument();
      expect(pokeDetails).toHaveAttribute('href', `/pokemons/${id}`);
    },
  );

  it(`Test that when clicking on the Pokémon navigation link,
  the application is redirected to the Pokémon details page`, () => {
    // access screen elements
    const pokeDetails = screen.getByRole('link', { name: /more details/i });

    // interagir com os elementos
    userEvent.click(pokeDetails);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');

    // do the tests
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.innerHTML).toEqual(name);
    expect(pokeType.innerHTML).toEqual(type);
  });

  it(`Also test if the URL displayed in the browser changes to /pokemon/<id>,
  where <id> is the id of the Pokémon whose details you want to see`, () => {
    // access screen elements
    const pokeDetails = screen.getByRole('link', { name: /more details/i });

    // interagir com os elementos
    userEvent.click(pokeDetails);

    // do the tests
    expect(history.location.pathname).toEqual(`/pokemons/${id}`);
  });

  it('Test if there is a star icon on favorite Pokemons', () => {
    // access screen elements
    const pokeImage = screen.getByAltText(`${name} is marked as favorite`);

    // do the tests
    expect(pokeImage).toHaveAttribute('src', '/star-icon.svg');
    expect(pokeImage).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
