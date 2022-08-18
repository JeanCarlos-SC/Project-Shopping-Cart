const fetchItem = async (ItemID) => {
  const url = `https://api.mercadolibre.com/items/${ItemID}`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
