import { addToCart } from "./menuCartManager.js";
import { productCardTemplate } from "./templateFile.js";
import type { Product, ProductCardMap } from "./types.js";

export const productCardMap: Record<string, ProductCardMap> = {};

export function createProductCard(product: Product, index: number, section: HTMLElement): HTMLElement {
  const card = document.createElement("div");
  card.className = "carousel-card";
  card.dataset.name = product.name.toLowerCase();
  card.innerHTML = productCardTemplate(product);

  handleEvents(card, product);
  registerCardMap(card, section, index, product);

  return card;
}

function handleEvents(card: HTMLElement, product: Product): void {
  const addButton = card.querySelector(".add-btn") as HTMLButtonElement | null;
  const qtyControls = card.querySelector(".qty-controls") as HTMLElement | null;
  const plusButton = card.querySelector(".plus") as HTMLButtonElement | null;
  const minusButton = card.querySelector(".minus") as HTMLButtonElement | null;
  const qtySpan = card.querySelector(".qty") as HTMLElement | null;

  if (!addButton || !qtyControls || !plusButton || !minusButton || !qtySpan) return;

  let quantity = 0;

  card.addEventListener("click", (): void => {
    window.location.href = `product.html?id=${product.id}`;
  });

  addButton.addEventListener("click", (e:MouseEvent): void => {
    e.stopPropagation();
    quantity = 1;
    qtySpan.textContent = quantity.toString();
    addButton.classList.add("hidden");
    qtyControls.classList.remove("hidden");
    addToCart(product, quantity);
  });

  plusButton.addEventListener("click", (e:MouseEvent): void => {
    e.stopPropagation();
    if (quantity < product.stock) {
      quantity++;
      qtySpan.textContent = quantity.toString();
      addToCart(product, quantity);
    }
  });

  minusButton.addEventListener("click", (e:MouseEvent): void => {
    e.stopPropagation();
    if (quantity > 1) {
      quantity--;
      qtySpan.textContent = quantity.toString();
    } else {
      quantity = 0;
      qtyControls.classList.add("hidden");
      addButton.classList.remove("hidden");
    }
    addToCart(product, quantity);
  });
}

function registerCardMap(card: HTMLElement, section: HTMLElement, index: number, product: Product): void {
  const track = section.querySelector(".carousel-track") as HTMLElement;

  productCardMap[product.name.toLowerCase()] = {
    section: section,
    track: track,
    index: index,
  };
}
