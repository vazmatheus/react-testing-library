import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('NotFound component test', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/digimon');
  });

  it(`'Tests if page contains an h2 heading
  with the text Page requested not found 😭'`, () => {
    // access screen elements
    const title = screen.getByRole('heading', { name: /page requested not found/i });

    // do the tests
    expect(title).toBeInTheDocument();
  });

  it('Tests if page shows a specific image', () => {
    // access screen elements
    const image = screen.getByAltText(/pikachu crying/i);

    // do the tests
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
