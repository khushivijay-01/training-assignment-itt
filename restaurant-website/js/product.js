import { addToCart } from "./menuRender.js";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id"); 
const productImg = document.getElementById("product-img");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const addBtn = document.querySelector(".add-btn");

async function fetchMenuData() {
  try {
    const res = await fetch("./data/menuItems.json");
    if (!res.ok) throw new Error("Menu data not found");
    const data = await res.json();
    return Object.values(data).flat();
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function renderProduct() {
  const items = await fetchMenuData();
  const product = items.find(p => p.id.toString() === productId);

  if (!product) {
    document.body.innerHTML = "<h2>Product not found</h2>";
    return;
  }

  productImg.src = product.image;
  productImg.alt = product.name;
  productName.textContent = product.name;
  productPrice.textContent = product.price;

  addBtn.addEventListener("click", () => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  });
}

renderProduct();
