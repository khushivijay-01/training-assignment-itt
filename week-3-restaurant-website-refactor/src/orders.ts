import { orderItemTemplate, orderItemTotalTemplate } from "./templateFile.ts";
import { getOrderData } from "./utilityFunctions.ts";
import type { OrderData, CartItem } from "./types.ts";

class OrdersPage {
  private container: HTMLElement | null;
  private orders: OrderData[];
  constructor() {
    this.container = document.getElementById("orders-container");
    this.orders = getOrderData();
  }

  public init(): void {
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

  private renderOrders(): void {
    if (!this.container) return;
    this.orders.forEach((order: OrderData): void => {
      const orderDiv = document.createElement("div");

      const itemsHTML: string = order.items
        .map((item: CartItem) => orderItemTemplate(item, order))
        .join("");

      orderDiv.innerHTML = orderItemTotalTemplate(itemsHTML, order.totalAmount);
      if(!this.container) return;
      
      this.container.appendChild(orderDiv);
    });
  }
}

const ordersPage = new OrdersPage();
ordersPage.init();
