import { setUserData, getUserData } from "./utilityFunctions.js";
import type { UserData } from "./types.js";
import { isValidEmail, isValidPhone, isRequiredField } from "./validation.js";

const loginButton = document.getElementById("loginBtn") as HTMLButtonElement | null;
const loginPanel = document.getElementById("login-panel") as HTMLElement | null;
const closeLogin = document.getElementById("close-login") as HTMLElement | null;
const continueButton = document.getElementById("continueBtn") as HTMLButtonElement | null;
const profileDiv = document.getElementById("profile") as HTMLElement | null;
const profileName = document.getElementById("profile-name") as HTMLElement | null;
const profileMenu = document.getElementById("profile-menu") as HTMLElement | null;
const logoutButton = document.getElementById("logoutBtn") as HTMLButtonElement | null;
const ordersButton = document.getElementById("ordersBtn") as HTMLButtonElement | null;
const accountButton = document.getElementById("accountBtn") as HTMLButtonElement | null;

const nameInput = document.getElementById("login-name") as HTMLInputElement | null;
const phoneInput = document.getElementById("login-phone") as HTMLInputElement | null;
const emailInput = document.getElementById("login-email") as HTMLInputElement | null;

const popupMessage = document.getElementById("popupMessage") as HTMLElement | null;

if(
    !loginButton || !loginPanel || !closeLogin || !continueButton ||
    !profileDiv || !profileName || !profileMenu || !logoutButton ||
    !ordersButton || !accountButton || !nameInput || !phoneInput || !emailInput
) {
    throw new Error("Required DOM element not found!");
}

function showPopup(message: string, duration = 3000): void {
  if (!popupMessage) return;
  popupMessage.textContent = message;
  popupMessage.style.display = "block";

  setTimeout(() => {
    popupMessage.style.display = "none";
  }, duration);
}

function showProfile(user: UserData): void{
  if(!loginButton || !profileDiv || !profileName) return;
  loginButton.classList.add("hidden"); 
  profileDiv.classList.remove("hidden");
  profileName.textContent = user.name;
}

loginButton.addEventListener("click", ():void => {
  loginPanel.classList.add("show");
});

closeLogin.addEventListener("click", (): void => {
  loginPanel.classList.remove("show");
});

continueButton.addEventListener("click", ():void => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!isRequiredField(name) || !isRequiredField(email) || !isRequiredField(phone)) {
      showPopup("Please fill all required fields");
      return;
    }
  
    if (!isValidEmail(email)) {
      showPopup("Please enter a valid email address");
      return;
    }
  
    if (!isValidPhone(phone)) {
      showPopup("Please enter a valid phone number (digits only, min 10)");
      return;
    }
  

  const user: UserData = { name, phone, email};
  setUserData(user);

  loginPanel.classList.remove("show");
  showProfile(user);
  showPopup(`Welcome ${name}!`);
});

profileDiv.addEventListener("click", (): void => {
  profileMenu.classList.toggle("hidden");
});

accountButton.addEventListener("click", (e: MouseEvent): void => {
  e.stopPropagation();
  profileMenu.classList.add("hidden");
  window.location.href = "index.html";
});

function showLogin(): void {
  if(!loginButton || !profileDiv || !profileMenu){
    throw new Error("Login not found");
  }
  loginButton.classList.remove("hidden");
  profileDiv.classList.add("hidden");
  profileMenu.classList.add("hidden");
}

logoutButton.addEventListener("click", (e: MouseEvent): void => {
  e.stopPropagation();

  localStorage.removeItem("cart");
  localStorage.removeItem("orders");
  localStorage.removeItem("userData"); 

  showLogin();
  showPopup("You have logged out");
});

ordersButton.addEventListener("click", (): void => {
  window.location.href = "orders.html";
});

window.addEventListener("DOMContentLoaded", ():void => {
  const user = getUserData();           
  if (user) {             
    showProfile(user);
  }
});
