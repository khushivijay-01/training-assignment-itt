"use strict";

import { getCart } from "./utilityFunctions.js";

const menuContainer = document.getElementById("menu-container");
const productCardMap = {};

export function addToCart(product, quantity) {
  let cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity = quantity;
    if (existingItem.quantity === 0) {
      cart = cart.filter(item => item.id !== product.id);
    }
  } else if (quantity > 0) {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

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

function updateCartCount() {
  const cartCountEl = document.getElementById("cart-count");
  if (!cartCountEl) return;

  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalItems;
}

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    acc[item.category] ??= [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

function setupCarousel(section, totalCards) {
  const track = section.querySelector(".carousel-track");
  const prevBtn = section.querySelector(".nav-btn.left");
  const nextBtn = section.querySelector(".nav-btn.right");

  let currentIndex = 0;
  const cardWidth = 280; 
  const visibleCards = 3;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < totalCards - visibleCards) {
      currentIndex++;
      updateCarousel();
    }
  });
}

function createCategorySection(categoryName) {
  const section = document.createElement("section");
  section.className = "category-section";
  section.dataset.category = categoryName;

  section.innerHTML = `
    <h2 class="category-title">${categoryName}</h2>
    <div class="carousel-wrapper">
      <button class="nav-btn left">&#10094;</button>
      <div class="carousel-container">
        <div class="carousel-track"></div>
      </div>
      <button class="nav-btn right">&#10095;</button>
    </div>
  `;

  return section;
}

function createProductCard(product, index, section) {
  const card = document.createElement("div");
  card.className = "carousel-card";
  card.dataset.name = product.name.toLowerCase();

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="content">
      <h4>${product.name}</h4>
      <p>Stock: ${product.stock}</p>
      <div class="price">₹${product.price}</div>
      <div class="cart-controls">
        <button class="add-btn">ADD</button>
        <div class="qty-controls hidden">
          <button class="qty-btn minus">−</button>
          <span class="qty">1</span>
          <button class="qty-btn plus">+</button>
        </div>
      </div>
    </div>
  `;

  attachCardEvents(card, product);
  registerCardMap(card, section, index, product);

  return card;
}

function attachCardEvents(card, product) {
  const addBtn = card.querySelector(".add-btn");
  const qtyControls = card.querySelector(".qty-controls");
  const plusBtn = card.querySelector(".plus");
  const minusBtn = card.querySelector(".minus");
  const qtySpan = card.querySelector(".qty");

  let quantity = 0;

  card.addEventListener("click", () => {
    window.location.href = `product.html?id=${product.id}`;
  });

  addBtn.addEventListener("click", e => {
    e.stopPropagation();
    quantity = 1;
    qtySpan.textContent = quantity;
    addBtn.classList.add("hidden");
    qtyControls.classList.remove("hidden");
    addToCart(product, quantity);
  });

  plusBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (quantity < product.stock) {
      quantity++;
      qtySpan.textContent = quantity;
      addToCart(product, quantity);
    }
  });

  minusBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (quantity > 1) {
      quantity--;
      qtySpan.textContent = quantity;
      addToCart(product, quantity);
    } else {
      quantity = 0;
      qtyControls.classList.add("hidden");
      addBtn.classList.remove("hidden");
      addToCart(product, quantity); 
    }
  });
}

function registerCardMap(card, section, index, product) {
  productCardMap[product.name.toLowerCase()] = {
    section,
    track: section.querySelector(".carousel-track"),
    index
  };
}

function renderCategory(category, items) {
  const section = createCategorySection(category);
  const track = section.querySelector(".carousel-track");

  items.forEach((item, index) => {
    const card = createProductCard(item, index, section);
    track.appendChild(card);
  });

  setupCarousel(section, items.length);
  menuContainer.appendChild(section);
}

function initSearch() {
  const searchInput = document.getElementById("search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase().trim();
    if (!value) return;

    for (let key in productCardMap) {
      if (key.includes(value)) {
        scrollToProduct(key);
        break;
      }
    }
  });
}

function scrollToProduct(productName) {
  const data = productCardMap[productName];
  if (!data) return;

  const { section, track, index } = data;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  const cardWidth = 280;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

function initCategoryFilter() {
  const categoryFilter = document.getElementById("category-filter");
  if (!categoryFilter) return;

  categoryFilter.addEventListener("change", function () {
    const selectedCategory = this.value;
    if (selectedCategory === "all") window.scrollTo({ top: 0, behavior: "smooth" });
    else {
      const targetSection = document.querySelector(`.category-section[data-category="${selectedCategory}"]`);
      targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

async function initMenu() {
  const items = await fetchMenuData();
  const grouped = groupByCategory(items);

  Object.entries(grouped).forEach(([category, products]) => {
    renderCategory(category, products);
  });

  updateCartCount();
  initSearch();
  initCategoryFilter();
}

initMenu();
