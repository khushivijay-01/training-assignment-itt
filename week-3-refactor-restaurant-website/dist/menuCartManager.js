import { getCart, saveCart } from "./utilityFunctions.js";
export function addToCart(product, quantity) {
    let cart = getCart();
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
        if (quantity > 0) {
            existingItem.quantity = quantity;
        }
        else {
            cart = cart.filter(item => item.id !== product.id);
        }
    }
    else if (quantity > 0) {
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
export function updateCartCount() {
    const cartCountEl = document.getElementById("cart-count");
    if (!cartCountEl)
        return;
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems.toString();
}
//# sourceMappingURL=menuCartManager.js.map