import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('App component testing', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it(`'Tests if the top of the application 
  contains a fixed set of navigation links'`, () => {
    // access screen elements
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favPokemonsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    // do the tests
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonsLink).toBeInTheDocument();
  });

  it(`'Tests if the application is redirected to the home page,
  in the URL / by clicking the Home link in the navigation bar'`, () => {
    // access screen elements
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    // interact with the elements
    userEvent.click(homeLink);
    // do the tests
    expect(heading2).toBeInTheDocument();
  });

  it(`'Tests if the application is redirected to the About page,
  in the /about URL, by clicking the About link in the navigation bar'`, () => {
    // access screen elements
    const aboutLink = screen.getByRole('link', { name: 'About' });
    // interact with the elements
    userEvent.click(aboutLink);
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    // do the tests
    expect(heading2).toBeInTheDocument();
  });

  it(`'Tests if the application is redirected to the Favorite Pokemons page,
  in the URL /favorites, by clicking on the Favorite Pokémons link 
  in the navigation bar'`, () => {
    // access screen elements
    const favPokemonsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    // interact with the elements
    userEvent.click(favPokemonsLink);
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    // do the tests
    expect(heading2).toBeInTheDocument();
  });

  it(`'Tests if the application is redirected to the Not Found page
  when entering an unknown URL'`, () => {
    // access screen elements
    const { history } = renderWithRouter(<App />);
    // interact with the elements
    history.push('notFound');
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    // do the tests
    expect(heading2).toBeInTheDocument();
  });
});
