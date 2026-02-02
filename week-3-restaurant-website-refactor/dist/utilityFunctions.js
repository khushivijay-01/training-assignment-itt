export function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}
export function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
export function getEnquiryData() {
    return JSON.parse(localStorage.getItem("enquiries") || "[]");
}
export function setEnquiryData(enquiries) {
    localStorage.setItem("enquiries", JSON.stringify(enquiries));
}
export function getOrderData() {
    return JSON.parse(localStorage.getItem("orders") || "[]");
}
export function setOrderData(order) {
    localStorage.setItem("orders", JSON.stringify(order));
}
export function getUserData() {
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
}
export function setUserData(user) {
    localStorage.setItem("userData", JSON.stringify(user));
}
//# sourceMappingURL=utilityFunctions.js.map