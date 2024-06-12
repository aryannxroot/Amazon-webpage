import {cart, deleteFromCart} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import {deliveryOptions} from "../data/deliveryoptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

function updateCheckoutQuantity() {
    let checkoutQuantity = 0;

    cart.forEach(() => {
        checkoutQuantity += 1;
    });

    document.querySelector('.js-checkout-quantity').innerHTML = `${checkoutQuantity} items`
}


let orderSummaryHtml = "";


cart.forEach((cartItem) => {
    const product = products.find((product) => {
        return product.id === cartItem.productId;
    })

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = deliveryOptions.find((deliveryOption) => {
        return deliveryOption.id === deliveryOptionId;
    })
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliverDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    orderSummaryHtml += `
        <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id = "${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(product,cartItem)}
              </div>
            </div>
          </div>
    `;
});

function deliveryOptionsHTML (product,cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliverDays,'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 ? 'FREE ' : `$${formatCurrency(deliveryOption.priceCents)} -`;

        html +=`
                <div class="delivery-option">
                    <input type="radio"
                    ${deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>
        `
    })

    return html;
}

updateCheckoutQuantity();
document.querySelector('.js-order-summary')
    .innerHTML = orderSummaryHtml;

document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            deleteFromCart(productId);

            const containerToRemove = document.querySelector(`.js-cart-item-container-${productId}`);
            containerToRemove.remove();
            updateCheckoutQuantity();
        })
    })

