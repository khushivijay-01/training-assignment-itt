"use strict";

import { getCart, saveCart } from "../storage.js";

const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const buyNowBtn = document.querySelector(".btn.primary");

function calculateTotal(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

let cart = getCart();

function renderCart() {
  if (!cartContainer) return;
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.textContent = "";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      
      <div class="cart-details">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>

        <div class="qty-controls">
          <button class="minus">−</button>
          <span class="qty">${item.quantity}</span>
          <button class="plus">+</button>
        </div>
      </div>

      <div class="item-total">
        ₹${item.price * item.quantity}
      </div>
    `;

    const plusBtn = div.querySelector(".plus");
    const minusBtn = div.querySelector(".minus");
    const qtySpan = div.querySelector(".qty");

    plusBtn.addEventListener("click", () => {
      item.quantity++;
      qtySpan.textContent = item.quantity;
      updateCart();
    });

    minusBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1);
      }
      updateCart();
    });

    cartContainer.appendChild(div);
  });

  cartTotal.textContent = `Total: ₹${calculateTotal(cart)}`;
}

function updateCart() {
  saveCart(cart);
  renderCart();
}

renderCart();

buyNowBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    const toastEl = document.getElementById("emptyToast");
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    return;
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const order = {
    orderId: Date.now(),
    items: cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    totalAmount,
    orderDate: new Date().toLocaleString(),
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");
  const toastEl = document.getElementById("successToast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
});
