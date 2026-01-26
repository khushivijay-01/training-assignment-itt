"use strict";

class OrdersPage {
  constructor() {
    this.container = document.getElementById("orders-container");
    this.orders = JSON.parse(localStorage.getItem("orders")) || [];
  }

  init() {
    if (!this.container) {
      console.error("orders-container not found");
      return;
    }

    if (this.orders.length === 0) {
      this.container.innerHTML = "<p>No orders placed yet.</p>";
      return;
    }

    this.renderOrders();
  }

  renderOrders() {
    this.orders.forEach(order => {
      const orderDiv = document.createElement("div");

      const itemsHTML = order.items
        .map(item => {
          return `
            <div style="display:flex; gap:10px; margin-bottom:10px;">
              <div>
                <p>${item.name}</p>
                <p>₹${item.price} × ${item.quantity}</p>
              </div>
            </div>
          `;
        })
        .join("");

      orderDiv.innerHTML = `
        <hr />
        <h3>Order ID: ${order.orderId}</h3>
        <p>Date: ${order.orderDate}</p>

        ${itemsHTML}

        <p><strong>Total:</strong> ₹${order.totalAmount}</p>
      `;

      this.container.appendChild(orderDiv);
    });
  }
}

const ordersPage = new OrdersPage();
ordersPage.init();
