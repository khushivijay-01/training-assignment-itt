import { getCart, saveCart, getOrderData, setOrderData } from "./utilityFunctions.js";
import { cardTemplate } from "./templateFile.js";
const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart-total");
const buyNowButton = document.querySelector(".btn.primary");
if (!cartContainer || !cartTotal || !buyNowButton) {
    throw new Error("Cart DOM elements not found!");
}
let cart = getCart();
function calculateTotal(cart) {
    return cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
}
function renderCart() {
    if (!cartContainer || !cartTotal)
        return;
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty</p>";
        cartTotal.textContent = "";
        return;
    }
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = cardTemplate(item);
        const plusButton = div.querySelector(".plus");
        const minusButton = div.querySelector((".minus"));
        const quantitySpan = div.querySelector((".qty"));
        if (plusButton && quantitySpan) {
            plusButton.addEventListener("click", () => {
                item.quantity++;
                quantitySpan.textContent = item.quantity.toString();
                updateCart();
            });
        }
        if (minusButton && quantitySpan) {
            minusButton.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                }
                else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        }
        cartContainer.appendChild(div);
    });
    cartTotal.textContent = `Total: ₹${calculateTotal(cart)}`;
}
function updateCart() {
    saveCart(cart);
    renderCart();
}
renderCart();
buyNowButton.addEventListener("click", () => {
    const currentCart = getCart();
    if (currentCart.length === 0) {
        const toastEl = document.getElementById("emptyToast");
        if (toastEl) {
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
        }
        return;
    }
    const totalAmount = calculateTotal(cart);
    const order = {
        orderId: Date.now(),
        items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image ?? "",
        })),
        totalAmount,
        orderDate: new Date().toLocaleString(),
    };
    const orders = getOrderData();
    orders.push(order);
    setOrderData(orders);
    localStorage.removeItem("cart");
    const toastEl = document.getElementById("successToast");
    if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
});
//# sourceMappingURL=renderCart.js.map