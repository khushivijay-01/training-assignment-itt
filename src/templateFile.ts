import type { CartItem, OrderData, Product } from "./types.js";

export function cardTemplate(item: CartItem): string {
  return `
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
}

export function orderItemTemplate(item: CartItem, order: OrderData): string {
  return `
    <hr />
    <div class="orders-item">
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h3>Order ID: ${order.orderId}</h3>
        <p>Date: ${order.orderDate}</p>
        <p class="name">${item.name}</p>
        <p>₹${item.price} × ${item.quantity}</p>
        <p class="subtotal">Subtotal: ₹${item.price * item.quantity}</p>
      </div>
    </div>
  `;
}

export function orderItemTotalTemplate(itemsHTML: string, totalAmount: number): string {
  return `
    ${itemsHTML}
    <p><strong>Total:</strong> ₹${totalAmount}</p>
    <hr />
  `;
}

export function productCardTemplate(product: Product): string {
  return `
    <img src="${product.image}" alt="${product.name}">
    <div class="content">
      <h4>${product.name}</h4>
      <p>Stock: ${product.stock}</p>
      <div class="price">₹${product.price}</div>
      <div class="cart-controls">
        <button class="add-btn">ADD</button>
        <div class="qty-controls hidden">
          <button class="qty-btn minus">−</button>
          <span class="qty">1</span>
          <button class="qty-btn plus">+</button>
        </div>
      </div>
    </div>
  `;
}

export function categorySectionTemplate(categoryName: string): string {
  return `
    <h2 class="category-title">${categoryName}</h2>
    <div class="carousel-wrapper">
      <button class="nav-btn left">&#10094;</button>
      <div class="carousel-container">
        <div class="carousel-track"></div>
      </div>
      <button class="nav-btn right">&#10095;</button>
    </div>
  `;
}