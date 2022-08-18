const QUERY = 'computador';
const fetchProducts = async (query) => {
 const ENDPOINT = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const request = await fetch(ENDPOINT);
  const response = await request.json();
  return response;
};

fetchProducts(QUERY);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
