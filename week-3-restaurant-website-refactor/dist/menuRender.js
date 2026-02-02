import { categorySectionTemplate } from "./templateFile.js";
import { createProductCard, productCardMap } from "./menuProductCardManager.js";
import { updateCartCount } from "./menuCartManager.js";
const menuContainer = document.getElementById("menu-container");
if (!menuContainer)
    throw new Error("Menu container not found");
async function fetchMenuData() {
    try {
        const res = await fetch("./data/menuItems.json");
        if (!res.ok)
            throw new Error("Menu data not found");
        const data = await res.json();
        return Object.values(data).flat();
    }
    catch (err) {
        console.error(err);
        return [];
    }
}
function groupByCategory(items) {
    return items.reduce((acc, item) => {
        const category = item.category ?? "uncategorized";
        if (!acc[category])
            acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});
}
function createCategorySection(categoryName) {
    const section = document.createElement("section");
    section.className = "category-section";
    section.dataset.category = categoryName;
    section.innerHTML = categorySectionTemplate(categoryName);
    return section;
}
function setupCarousel(section, totalCards) {
    const track = section.querySelector(".carousel-track");
    const prevButton = section.querySelector(".nav-btn.left");
    const nextButton = section.querySelector(".nav-btn.right");
    if (!track || !prevButton || !nextButton)
        return;
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
function renderCategory(category, items) {
    const section = createCategorySection(category);
    const track = section.querySelector(".carousel-track");
    items.forEach((item, index) => {
        const card = createProductCard(item, index, section);
        track.appendChild(card);
    });
    setupCarousel(section, items.length);
    menuContainer?.appendChild(section);
}
function initSearch() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput)
        return;
    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase().trim();
        if (!value)
            return;
        for (let key in productCardMap) {
            if (key.includes(value)) {
                productCardMap[key]?.section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
                if (productCardMap[key]?.track) {
                    productCardMap[key].track.style.transform = `translateX(-${productCardMap[key].index * 280}px)`;
                }
                break;
            }
        }
    });
}
function initCategoryFilter() {
    const categoryFilter = document.getElementById("category-filter");
    if (!categoryFilter)
        return;
    categoryFilter.addEventListener("change", function () {
        const selectedCategory = this.value;
        if (selectedCategory === "all") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        else {
            const targetSection = document.querySelector(`.category-section[data-category="${selectedCategory}"]`);
            targetSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}
export async function initMenu() {
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
//# sourceMappingURL=menuRender.js.map