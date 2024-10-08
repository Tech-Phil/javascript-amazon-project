import { cart, addToCart } from "./cart.js";
import { products } from "../data/products.js";
import formatCurrency from "./utils/moneyCents.js";
import { renderAmazonHeader } from "./amazonHeader.js";

renderAmazonHeader();

function renderProductGrid() {
  let productsHTML = "";

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search')?.trim().toLocaleLowerCase();

  let filteredProducts = products;
  
  if (search) {
    filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(search);
    });
  }
 
  filteredProducts.forEach((product) => {
    productsHTML += `
            <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
              Add to Cart 
            </button>
          </div>`;
  });

  document.querySelector(".js-product-grid").innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    });
  }
  //add to cart
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
      const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCart.classList.add('added-to-cart-vissible');

      setTimeout(() => {
        addedToCart.classList.remove('added-to-cart-vissible');
      }, 2500);
    });
  });
  const searchInput = document.querySelector('.js-search-bar');
  const productList = document.querySelector('.js-product-grid');
  const noResultsMessage = document.createElement('div');


  searchInput.addEventListener('keydown', (event) => {
    const query = event.target.value.trim();
    if (event.key === 'Enter') {
      if (!query) {
        showNoResultsMessage('No products match the search.');
        return;
      }
      const encodedQuery = encodeURIComponent(query);
      window.location.href = `amazon.html?search=${encodedQuery}`;
    }
  });

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      if (!search) {
        showNoResultsMessage('No products match the search.');
        return;
      }
      window.location.href = `amazon.html?search=${search}`;
    });

  function showNoResultsMessage(message) {
      noResultsMessage.textContent = message;
      noResultsMessage.style.color = 'red'; // Optional styling
      productList.innerHTML = ''; // Clear any previous products
      productList.appendChild(noResultsMessage); // Display message
    }
}
renderProductGrid();
