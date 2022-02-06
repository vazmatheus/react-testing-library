import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste do componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    // acessar os elementos da tela
    const title = screen.getByRole('heading', { name: 'About Pokédex' });

    // fazer os testes
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    // acessar os elementos da tela
    const textAbout = screen.getAllByText(/pokémons/i);

    // fazer os testes
    expect(textAbout).toHaveLength(2);
    textAbout.forEach((text) => {
      expect(text).toBeInTheDocument();
    });
  });

  it('Testa se a página contém a imagem de uma Pokédex.', () => {
    // acessar os elementos da tela
    const pokeImage = screen.getByAltText('Pokédex');

    // fazer os testes
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
