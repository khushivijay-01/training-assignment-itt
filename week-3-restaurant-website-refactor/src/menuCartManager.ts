import { getCart, saveCart } from "./utilityFunctions.ts";
import type { Product, CartItem } from "./types.ts";

export function addToCart(product: Product, quantity: number): void {
  let cart: CartItem[] = getCart();
  const existingItem = cart.find((item: CartItem) => item.id === product.id);

  if (existingItem) {
    if(quantity > 0) {
      existingItem.quantity = quantity;
    } else {
      cart = cart.filter(item => item.id !== product.id);
    }
  } else if (quantity > 0) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  }

  saveCart(cart);
  updateCartCount();
}

export function updateCartCount(): void {
  const cartCountEl = document.getElementById("cart-count") as HTMLElement | null;
  if (!cartCountEl) return;

  const cart: CartItem[] = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalItems.toString();
}
