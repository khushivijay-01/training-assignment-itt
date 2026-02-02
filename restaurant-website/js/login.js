"use strict";

const loginBtn = document.getElementById("loginBtn");
const loginPanel = document.getElementById("login-panel");
const closeLogin = document.getElementById("close-login");
const continueBtn = document.getElementById("continueBtn");
const profileDiv = document.getElementById("profile");
const profileName = document.getElementById("profile-name");
const profileMenu = document.getElementById("profile-menu");
const logoutBtn = document.getElementById("logoutBtn");
const ordersBtn = document.getElementById("ordersBtn");
const accountBtn = document.getElementById("accountBtn");

const nameInput = document.getElementById("login-name");
const phoneInput = document.getElementById("login-phone");
const emailInput = document.getElementById("login-email");

loginBtn.addEventListener("click", () => {
  loginPanel.classList.add("show");
});

closeLogin.addEventListener("click", () => {
  loginPanel.classList.remove("show");
});

continueBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !phone) {
    alert("Please enter both name and phone number.");
    return;
  }

  const user = { name, phone, email};
  localStorage.setItem("user", JSON.stringify(user));

  loginPanel.classList.remove("show");
  showProfile(user);
});

function showProfile(user) {
  loginBtn.classList.add("hidden"); 
  profileDiv.classList.remove("hidden");
  profileName.textContent = user.name;
}

profileDiv.addEventListener("click", () => {
  profileMenu.classList.toggle("hidden");
});

accountBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  profileMenu.classList.add("hidden");
  window.location.href = "index.html";
});

logoutBtn.addEventListener("click", () => {
  profileDiv.classList.add("hidden");
  profileMenu.classList.add("hidden");
  loginBtn.classList.remove("hidden");
  localStorage.removeItem("cart");
  localStorage.removeItem("orders");
  localStorage.removeItem("user"); 
  window.location.href = "index.html";
});

ordersBtn.addEventListener("click", () => {
  window.location.href = "orders.html";
});

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    showProfile(user);
  }
});
