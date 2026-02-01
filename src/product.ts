import { addToCart } from "./menuCartManager.js";
import type { Product } from "./types.js";

const params = new URLSearchParams(window.location.search);
const productId: string | null = params.get("id"); 
const productImg = document.getElementById("product-img") as HTMLImageElement | null;
const productName = document.getElementById("product-name") as HTMLElement | null;
const productPrice = document.getElementById("product-price") as HTMLElement | null;
const addButton = document.querySelector(".add-btn") as HTMLButtonElement | null;

async function fetchMenuData(): Promise<Product[]> {
  try {
    const res = await fetch("./data/menuItems.json");
    if (!res.ok) throw new Error("Menu data not found");
    const data = await res.json();
    return Object.values(data).flat() as Product[];
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function renderProduct(): Promise<void> {
  const items: Product[] = await fetchMenuData();
  const product: Product | undefined = items.find(p => p.id.toString() === productId);

  if (!product) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  if (productImg) {
    productImg.src = product.image;
    productImg.alt = product.name;
  }
  if (productName) productName.textContent = product.name;
  if (productPrice) productPrice.textContent = `${product.price}`;

  if (addButton) {
    addButton.addEventListener("click", (): void => {
      addToCart(product, 1);
      alert(`${product.name} added to cart!`);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderProduct();
});

