require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });

  it('Testa se fetch é chamada dentro de fetchProducts com o endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Testa se a função fetchProducts retorna o objeto correto', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('Testa se a função fetchProducts retorna um erro quando chamada sem parâmetros', async () => {
    expect.assertions(1);
    expect(fetchProducts()).rejects.toThrow('You must provide an url');
  });
});
