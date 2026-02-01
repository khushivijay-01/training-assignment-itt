import { setUserData, getUserData } from "./utilityFunctions.js";
const loginButton = document.getElementById("loginBtn");
const loginPanel = document.getElementById("login-panel");
const closeLogin = document.getElementById("close-login");
const continueButton = document.getElementById("continueBtn");
const profileDiv = document.getElementById("profile");
const profileName = document.getElementById("profile-name");
const profileMenu = document.getElementById("profile-menu");
const logoutButton = document.getElementById("logoutBtn");
const ordersButton = document.getElementById("ordersBtn");
const accountButton = document.getElementById("accountBtn");
const nameInput = document.getElementById("login-name");
const phoneInput = document.getElementById("login-phone");
const emailInput = document.getElementById("login-email");
const popupMessage = document.getElementById("popupMessage");
if (!loginButton || !loginPanel || !closeLogin || !continueButton ||
    !profileDiv || !profileName || !profileMenu || !logoutButton ||
    !ordersButton || !accountButton || !nameInput || !phoneInput || !emailInput) {
    throw new Error("Required DOM element not found!");
}
function showPopup(message, duration = 3000) {
    if (!popupMessage)
        return;
    popupMessage.textContent = message;
    popupMessage.style.display = "block";
    setTimeout(() => {
        popupMessage.style.display = "none";
    }, duration);
}
function showProfile(user) {
    if (!loginButton || !profileDiv || !profileName)
        return;
    loginButton.classList.add("hidden");
    profileDiv.classList.remove("hidden");
    profileName.textContent = user.name;
}
loginButton.addEventListener("click", () => {
    loginPanel.classList.add("show");
});
closeLogin.addEventListener("click", () => {
    loginPanel.classList.remove("show");
});
continueButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    if (!name || !phone) {
        showPopup("Please enter both name and phone number");
        return;
    }
    if (phone.length < 10) {
        showPopup("Phone number must be at least 10 digits");
        return;
    }
    const user = { name, phone, email };
    setUserData(user);
    loginPanel.classList.remove("show");
    showProfile(user);
    showPopup(`Welcome ${name}!`);
});
profileDiv.addEventListener("click", () => {
    profileMenu.classList.toggle("hidden");
});
accountButton.addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu.classList.add("hidden");
    window.location.href = "index.html";
});
function showLogin() {
    if (!loginButton || !profileDiv || !profileMenu) {
        throw new Error("Login not found");
    }
    loginButton.classList.remove("hidden");
    profileDiv.classList.add("hidden");
    profileMenu.classList.add("hidden");
}
logoutButton.addEventListener("click", (e) => {
    e.stopPropagation();
    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    localStorage.removeItem("userData");
    showLogin();
    showPopup("You have logged out");
});
ordersButton.addEventListener("click", () => {
    window.location.href = "orders.html";
});
window.addEventListener("DOMContentLoaded", () => {
    const user = getUserData();
    if (user) {
        showProfile(user);
    }
});
//# sourceMappingURL=login.js.map