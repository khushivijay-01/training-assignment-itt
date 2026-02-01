import { categorySectionTemplate } from "./templateFile.js";
import type { Product } from "./types.js";
import { createProductCard, productCardMap } from "./menuProductCardManager.js";
import { updateCartCount } from "./menuCartManager.js";

const menuContainer = document.getElementById("menu-container") as HTMLElement | null;
if (!menuContainer) throw new Error("Menu container not found");

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

function groupByCategory(items: Product[]): Record<string, Product[]> {
  return items.reduce<Record<string, Product[]>>((acc, item) => {
    const category = item.category ?? "uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});
}

function createCategorySection(categoryName: string): HTMLElement {
  const section = document.createElement("section");
  section.className = "category-section";
  section.dataset.category = categoryName;
  section.innerHTML = categorySectionTemplate(categoryName);
  return section;
}

function setupCarousel(section: HTMLElement, totalCards: number): void {
  const track = section.querySelector<HTMLElement>(".carousel-track");
  const prevButton = section.querySelector<HTMLElement>(".nav-btn.left");
  const nextButton = section.querySelector<HTMLElement>(".nav-btn.right");
  if (!track || !prevButton || !nextButton) return;

  let currentIndex = 0;
  const visibleCards = 3;

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.style.transform = `translateX(-${currentIndex * 280}px)`;
    }
  });
  nextButton.addEventListener("click", () => {
    if (currentIndex < totalCards - visibleCards) {
      currentIndex++;
      track.style.transform = `translateX(-${currentIndex * 280}px)`;
    }
  });
}

function renderCategory(category: string, items: Product[]): void {
  const section = createCategorySection(category);
  const track = section.querySelector(".carousel-track") as HTMLElement;

  items.forEach((item, index) => {
    const card = createProductCard(item, index, section);
    track.appendChild(card);
  });

  setupCarousel(section, items.length);
  menuContainer?.appendChild(section);
}

function initSearch(): void {
  const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
  if (!searchInput) return;

  searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase().trim();
    if (!value) return;

    for (let key in productCardMap) {
      if (key.includes(value)) {
        productCardMap[key]?.section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        if (productCardMap[key]?.track) {
          productCardMap[key]!.track.style.transform = `translateX(-${productCardMap[key]!.index * 280}px)`;
        }
        break;
      }
    }
  });
}

function initCategoryFilter(): void {
  const categoryFilter = document.getElementById("category-filter") as HTMLSelectElement | null;
  if (!categoryFilter) return;

  categoryFilter.addEventListener("change", function () {
    const selectedCategory = this.value;
    if (selectedCategory === "all")
    {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    else {
      const targetSection = document.querySelector(`.category-section[data-category="${selectedCategory}"]`) as HTMLElement | null;
      targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

export async function initMenu(): Promise<void> {
  const items = await fetchMenuData();
  const grouped = groupByCategory(items);

  Object.entries(grouped).forEach(([category, products]) => {
    renderCategory(category, products);
  });

  updateCartCount();
  initSearch();
  initCategoryFilter();
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
});
