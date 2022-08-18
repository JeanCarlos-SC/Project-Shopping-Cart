require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchItem).toBe('function');
  });

  it('Testa se fetch é chamada dentro de fetchItem com o endpoint correto', async () => {
    expect.assertions(2);
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Testa se a função fetchItem retorna o objeto correto', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('Testa se a função fetchItem retorna um erro quando chamada sem parâmetros', async () => {
    expect.assertions(1);
    expect(fetchItem()).rejects.toThrow('You must provide an url');
  });
});
