import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('About component test', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Tests if the page contains an h2 heading with the text About Pokédex', () => {
    // aaccess screen elements
    const title = screen.getByRole('heading', { name: 'About Pokédex' });

    // do the tests
    expect(title).toBeInTheDocument();
  });

  it('Tests if the page contains two paragraphs of Pokédex text', () => {
    // aaccess screen elements
    const textAbout = screen.getAllByText(/pokémons/i);

    // do the tests
    expect(textAbout).toHaveLength(2);
    textAbout.forEach((text) => {
      expect(text).toBeInTheDocument();
    });
  });

  it('Tests if the page contains an image of a Pokédex', () => {
    // aaccess screen elements
    const pokeImage = screen.getByAltText('Pokédex');

    // do the tests
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
