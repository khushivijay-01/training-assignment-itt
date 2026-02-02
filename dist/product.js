import { addToCart } from "./menuCartManager.js";
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productImg = document.getElementById("product-img");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const addButton = document.querySelector(".add-btn");
async function fetchMenuData() {
    try {
        const res = await fetch("/data/menuItems.json");
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
async function renderProduct() {
    const items = await fetchMenuData();
    const product = items.find(p => p.id.toString() === productId);
    if (!product) {
        document.body.innerHTML = "<h2>Product not found</h2>";
        return;
    }
    if (productImg) {
        productImg.src = product.image;
        productImg.alt = product.name;
    }
    if (productName)
        productName.textContent = product.name;
    if (productPrice)
        productPrice.textContent = `${product.price}`;
    if (addButton) {
        addButton.addEventListener("click", () => {
            addToCart(product, 1);
            alert(`${product.name} added to cart!`);
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    renderProduct();
});
//# sourceMappingURL=product.js.map