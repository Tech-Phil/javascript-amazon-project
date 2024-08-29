import {cart} from './cart.js';

export function renderAmazonHeader() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

const amazonHeaderHTML = `<a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity js-cart-quantity">${cartQuantity}</div>
          <div class="cart-text">Cart</div>
        </a>`;
      document.querySelector('.js-amazon-cart-header').innerHTML = amazonHeaderHTML;
}


