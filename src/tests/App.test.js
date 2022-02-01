import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste do componente App', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    // acessar os elementos da tela
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favPokemonsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    // fazer os testes
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favPokemonsLink).toBeInTheDocument();
  });

  it(`'Testa se a aplicação é redirecionada para a página inicial, 
  na URL / ao clicar no link Home da barra de navegação.'`, () => {
    // acessar os elementos da tela
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    // interagir com os elementos
    userEvent.click(homeLink);
    // fazer os testes
    expect(heading2).toBeInTheDocument();
  });

  it(`'Testa se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação.'`, () => {
    // acessar os elementos da tela
    const aboutLink = screen.getByRole('link', { name: 'About' });
    // interagir com os elementos
    userEvent.click(aboutLink);
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    // fazer os testes
    expect(heading2).toBeInTheDocument();
  });

  it(`'Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.'`, () => {
    // acessar os elementos da tela
    const favPokemonsLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    // interagir com os elementos
    userEvent.click(favPokemonsLink);
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    // fazer os testes
    expect(heading2).toBeInTheDocument();
  });

  it(`'Testa se a aplicação é redirecionada para a página Not Found
  ao entrar em uma URL desconhecida.'`, () => {
    // acessar os elementos da tela
    const { history } = renderWithRouter(<App />);
    // interagir com os elementos
    history.push('notFound');
    const heading2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    // fazer os testes
    expect(heading2).toBeInTheDocument();
  });
});
