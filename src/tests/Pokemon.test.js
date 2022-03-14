import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

const pokemon = data[0];
const { id, averageWeight: { value, measurementUnit }, name, type, image } = pokemon;

let history;

describe('Teste do componente Pokemon', () => {
  beforeEach(() => {
    const router = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    history = router.history;
  });
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    // acessar os elementos da tela
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByRole('img', { name: /pikachu sprite/i });

    // fazer os testes
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', image);
    expect(pokeImage).toHaveAttribute('alt', `${name} sprite`);
  });

  it(
    `Teste se o card do Pokémon indicado na Pokédex contém um link
     de navegação para exibir detalhes deste Pokémon.`, () => {
      // acessar os elementos da tela
      const pokeDetails = screen.getByRole('link', { name: /more details/i });

      // fazer os testes
      expect(pokeDetails).toBeInTheDocument();
      expect(pokeDetails).toHaveAttribute('href', `/pokemons/${id}`);
    },
  );

  it(`Teste se ao clicar no link de navegação do Pokémon,
   é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    // acessar os elementos da tela
    const pokeDetails = screen.getByRole('link', { name: /more details/i });

    // interagir com os elementos
    userEvent.click(pokeDetails);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');

    // fazer os testes
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.innerHTML).toEqual(name);
    expect(pokeType.innerHTML).toEqual(type);
  });

  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
   onde <id> é o id do Pokémon cujos detalhes se deseja ver.`, () => {
    // acessar os elementos da tela
    const pokeDetails = screen.getByRole('link', { name: /more details/i });

    // interagir com os elementos
    userEvent.click(pokeDetails);

    // fazer os testes
    expect(history.location.pathname).toEqual(`/pokemons/${id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    // acessar os elementos da tela
    const pokeImage = screen.getByAltText(`${name} is marked as favorite`);

    // fazer os testes
    expect(pokeImage).toHaveAttribute('src', '/star-icon.svg');
    expect(pokeImage).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});

// acessar os elementos da tela

// interagir com os elementos

// fazer os testes
