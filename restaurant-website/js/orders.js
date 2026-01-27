"use strict";
function orderItemTemplate(item, order) {
  return `
          <hr />
            <div style="display:flex; gap: 800px; margin-bottom:15px; align-items:center;">
              <img 
                src="${item.image}" 
                style="width:200px; height:120px; object-fit:cover; border-radius:8px;"
              />
              <div>
                <h3>Order ID: ${order.orderId}</h3>
                <p>Date: ${order.orderDate}</p>
                <p style="margin:0; font-weight:600;">${item.name}</p>
                <p style="margin:4px 0;">₹${item.price} × ${item.quantity}</p>
                <p style="margin:0; color:#555;">
                  Subtotal: ₹${item.price * item.quantity}
                </p>
              </div>
            </div>
          `;
}

function orderTemplate(itemsHTML, totalAmount) {
  return `
    ${itemsHTML}
    <p><strong>Total:</strong> ₹${totalAmount}</p>
    <hr />
  `;
}
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
    this.orders.forEach((order) => {
      const orderDiv = document.createElement("div");

      const itemsHTML = order.items
        .map((item) => orderItemTemplate(item, order))
        .join("");

      orderDiv.innerHTML = orderTemplate(itemsHTML, order.totalAmount);

      this.container.appendChild(orderDiv);
    });
  }
}

const ordersPage = new OrdersPage();
ordersPage.init();
