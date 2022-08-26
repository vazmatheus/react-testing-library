import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('FavoritePokemons component test', () => {
  it(`'Tests if the message No favorite pokemon found is displayed on the screen,
  if the person doesn't have favorite pokemons'`, () => {
    // access screen elements
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/no favorite pokemon found/i);

    // do the tests
    expect(text).toBeInTheDocument();
  });

  it('Tests if all favorite pokemon cards are displayed', () => {
    // access screen elements
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });

    // interact with the elements
    userEvent.click(details);

    // access screen elements
    const favCheckbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    // interact with the elements
    userEvent.click(favCheckbox);

    // access screen elements
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    // interact with the elements
    userEvent.click(linkFavorites);

    // access screen elements
    const pokemonName = screen.getByTestId('pokemon-name');

    // do the tests
    expect(pokemonName).toBeInTheDocument();
  });
});
