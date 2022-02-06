import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Teste do componente NotFound', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/digimon');
  });

  it(`'Testa se página contém um heading h2
  com o texto Page requested not found 😭'`, () => {
    // acessar os elementos da tela
    const title = screen.getByRole('heading', { name: /page requested not found/i });

    // fazer os testes
    expect(title).toBeInTheDocument();
  });

  it('Testa se página mostra uma imagem especifica.', () => {
    // acessar os elementos da tela
    const image = screen.getByAltText(/pikachu crying/i);

    // fazer os testes
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
