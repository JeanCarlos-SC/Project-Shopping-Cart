const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const getValue = () => localStorage.getItem('value');
const saveValue = (html) => localStorage.setItem('value', html);

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';
  const formatPrice = (price * 5.08).toLocaleString('pt-BR', 
  {
    style: 'currency',
    currency: 'BRL'
  });

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', formatPrice));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  const secItems = document.querySelector('.items');
  secItems.appendChild(section);
  return section;
};

const createLoading = () => {
  const sectioLoad = document.createElement('section');
  sectioLoad.className = 'loading';
  sectioLoad.innerText = 'Carregando...';
  const secItems = document.querySelector('.items');
  secItems.appendChild(sectioLoad);
};

const removeLoading = () => {
  const sectioLoad = document.querySelector('.loading');
  console.log(sectioLoad);
  sectioLoad.remove();
};

const getProducts = async () => {
  createLoading();
  const data = await fetchProducts('computador');
  removeLoading();
  const { results } = data;
  results.forEach(({ id: sku, title: name, thumbnail: image, price}) => {
    const newObj = {
      sku,
      name,
      image,
      price
    };
    createProductItemElement(newObj);
  });
};

const calcTotal = () => {
  const list = document.getElementsByClassName('cart__item');
  const items = [...list];
  const total = items.reduce((acc, item) => {
    const text = item.innerText;
    let price = (text.substring(text.indexOf('$') + 1, text.length - 1));
    price = price.replace('.', '');
    price = Number(price.replace(',', '.'));
    return acc + price;
  }, 0);
  totalPrice.innerHTML = `
  <span class="total-price">Subtotal: <strong>${total.toLocaleString('pt-BR', 
  {
    style: 'currency',
    currency: 'BRL'
  })}</strong></span>`;
  saveValue(totalPrice.innerHTML);
};

const cartItemClickListener = (event) => {
  const element = event.target;
  if (element.className === 'btn-delete') {
  const div = element.parentElement;
    div.remove();
    calcTotal();
    saveCartItems(cartItems.innerHTML);
  }
};

const createCartItemElement = ({ name, salePrice, thumbnail }) => {
  const div = document.createElement('div');
  const btnDel = document.createElement('button');
  btnDel.innerHTML = '&#10060';
  btnDel.className = 'btn-delete'
  const formatPrice = (salePrice * 5.08).toLocaleString('pt-BR', 
  {
    style: 'currency',
    currency: 'BRL'
  });
  div.className = 'cart__item';
  div.innerHTML = `<p>
  ${name}<br><br>
  <strong>${formatPrice}</strong></p>`;
  cartItems.appendChild(div);
  div.appendChild(createProductImageElement(thumbnail));
  div.appendChild(btnDel);
  saveCartItems(cartItems.innerHTML);
  calcTotal();
  return div;
};

const insertItem = async (urlId) => {
  const data = await fetchItem(urlId);
  const { title, price, thumbnail } = data;
    const newObj = {
      name: title,
      salePrice: price,
      thumbnail
  };
  createCartItemElement(newObj);
};

const clickListenerBtn = () => {
  const btn = document.body;
  btn.addEventListener('click', (event) => {
    if (event.target.className === 'item__add') {
      const father = event.target.parentElement;
      const id = father.firstElementChild.innerText;
      insertItem(id);
    }
  });
};

const emptyCart = () => {
const btnEmpty = document.querySelector('.empty-cart');
btnEmpty.addEventListener('click', () => {
   localStorage.clear();
   cartItems.innerHTML = '';
   totalPrice.innerHTML = '<span class="total-price">Subtotal: <strong>R$ 0.00<strong></span>';
 });
};

getProducts();
clickListenerBtn();
emptyCart();

window.onload = () => {
 cartItems.innerHTML = getSavedCartItems();
 if (localStorage.key('value')) {
 totalPrice.innerHTML = getValue();
 }
 cartItems.addEventListener('click', cartItemClickListener);
};