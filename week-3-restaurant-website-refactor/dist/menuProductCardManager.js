import { addToCart } from "./menuCartManager.js";
import { productCardTemplate } from "./templateFile.js";
export const productCardMap = {};
export function createProductCard(product, index, section) {
    const card = document.createElement("div");
    card.className = "carousel-card";
    card.dataset.name = product.name.toLowerCase();
    card.innerHTML = productCardTemplate(product);
    handleEvents(card, product);
    registerCardMap(card, section, index, product);
    return card;
}
function handleEvents(card, product) {
    const addButton = card.querySelector(".add-btn");
    const qtyControls = card.querySelector(".qty-controls");
    const plusButton = card.querySelector(".plus");
    const minusButton = card.querySelector(".minus");
    const qtySpan = card.querySelector(".qty");
    if (!addButton || !qtyControls || !plusButton || !minusButton || !qtySpan)
        return;
    let quantity = 0;
    card.addEventListener("click", () => {
        window.location.href = `product.html?id=${product.id}`;
    });
    addButton.addEventListener("click", (e) => {
        e.stopPropagation();
        quantity = 1;
        qtySpan.textContent = quantity.toString();
        addButton.classList.add("hidden");
        qtyControls.classList.remove("hidden");
        addToCart(product, quantity);
    });
    plusButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (quantity < product.stock) {
            quantity++;
            qtySpan.textContent = quantity.toString();
            addToCart(product, quantity);
        }
    });
    minusButton.addEventListener("click", (e) => {
        e.stopPropagation();
        if (quantity > 1) {
            quantity--;
            qtySpan.textContent = quantity.toString();
        }
        else {
            quantity = 0;
            qtyControls.classList.add("hidden");
            addButton.classList.remove("hidden");
        }
        addToCart(product, quantity);
    });
}
function registerCardMap(card, section, index, product) {
    const track = section.querySelector(".carousel-track");
    productCardMap[product.name.toLowerCase()] = {
        section: section,
        track: track,
        index: index,
    };
}
//# sourceMappingURL=menuProductCardManager.js.map