import { getCart, saveCart, getOrderData, setOrderData } from "./utilityFunctions.ts";
import { cardTemplate } from "./templateFile.ts";
import type { CartItem, OrderData } from "./types.ts";

declare const bootstrap: any;
const cartContainer = document.getElementById("cart-container") as HTMLElement | null;
const cartTotal = document.getElementById("cart-total") as HTMLElement | null;
const buyNowButton = document.querySelector(".btn.primary") as HTMLButtonElement | null;

if (!cartContainer || !cartTotal || !buyNowButton) {
  throw new Error("Cart DOM elements not found!");
}

let cart: CartItem[] = getCart();

function calculateTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function renderCart(): void {
  if(!cartContainer || !cartTotal) return;
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTotal.textContent = "";
    return;
  }

  cart.forEach((item: CartItem, index: number): void => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = cardTemplate(item);

    const plusButton = div.querySelector<HTMLButtonElement>(".plus");
    const minusButton = div.querySelector<HTMLButtonElement>((".minus"));
    const quantitySpan = div.querySelector<HTMLSpanElement>((".qty"));

    if(plusButton && quantitySpan) {
        plusButton.addEventListener("click", (): void => {
            item.quantity++;
            quantitySpan.textContent = item.quantity.toString();
            updateCart();
        });
    }

   if (minusButton && quantitySpan) {
      minusButton.addEventListener("click", (): void => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart.splice(index, 1);
        }
        updateCart();
      });
    }

    cartContainer.appendChild(div);
  });

  cartTotal.textContent = `Total: ₹${calculateTotal(cart)}`;
}

function updateCart(): void {
  saveCart(cart);
  renderCart();
}

renderCart();

buyNowButton.addEventListener("click", (): void => {
  const currentCart: CartItem[] = getCart();

  if (currentCart.length === 0) {
    const toastEl = document.getElementById("emptyToast") as HTMLElement | null;
    if(toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
    return;
  }

  const totalAmount: number = calculateTotal(cart);

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

  const orders: OrderData[] = getOrderData();
  orders.push(order);

  setOrderData(orders);
  localStorage.removeItem("cart");
  const toastEl = document.getElementById("successToast");
  if(toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
});
