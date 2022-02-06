import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste do componente FavoritePokemons', () => {
  it(`'Testa se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos'`, () => {
    // acessar os elementos da tela
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/no favorite pokemon found/i);

    // fazer os testes
    expect(text).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    // acessar os elementos da tela
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });

    // interagir com os elementos
    userEvent.click(details);

    // acessar os elementos da tela
    const favCheckbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    // interagir com os elementos
    userEvent.click(favCheckbox);

    // acessar os elementos da tela
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });

    // interagir com os elementos
    userEvent.click(linkFavorites);

    // acessar os elementos da tela
    const pokemonName = screen.getByTestId('pokemon-name');

    // fazer os testes
    expect(pokemonName).toBeInTheDocument();
  });
});
