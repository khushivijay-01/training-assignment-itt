import { orderItemTemplate, orderItemTotalTemplate } from "./templateFile.js";
import { getOrderData } from "./utilityFunctions.js";
class OrdersPage {
    container;
    orders;
    constructor() {
        this.container = document.getElementById("orders-container");
        this.orders = getOrderData();
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
        if (!this.container)
            return;
        this.orders.forEach((order) => {
            const orderDiv = document.createElement("div");
            const itemsHTML = order.items
                .map((item) => orderItemTemplate(item, order))
                .join("");
            orderDiv.innerHTML = orderItemTotalTemplate(itemsHTML, order.totalAmount);
            if (!this.container)
                return;
            this.container.appendChild(orderDiv);
        });
    }
}
const ordersPage = new OrdersPage();
ordersPage.init();
//# sourceMappingURL=orders.js.map