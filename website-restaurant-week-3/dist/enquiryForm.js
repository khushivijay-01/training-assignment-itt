import { getEnquiryData, setEnquiryData } from "./utilityFunctions.js";
import { isValidEmail, isValidPhone, isRequiredField } from "./validation.js";
const enquiryForm = document.querySelector(".enquiry form");
const formMsg = document.getElementById("formMsg");
const popupMessage = document.getElementById("popupMessage");
if (!enquiryForm || !formMsg || !popupMessage) {
    throw new Error("Required DOM elements not found!");
}
enquiryForm.after(formMsg);
function showMsg(message, color) {
    if (!formMsg)
        return;
    formMsg.textContent = message;
    formMsg.style.color = color;
}
enquiryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneNumberInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");
    if (!nameInput || !emailInput || !phoneNumberInput || !messageInput) {
        showMsg("Form elements missing!", "red");
        return;
    }
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phoneNumber = phoneNumberInput.value.trim();
    const message = messageInput.value.trim();
    if (!isRequiredField(name) || !isRequiredField(email) || !isRequiredField(phoneNumber)) {
        showMsg("Please fill all required fields", "red");
        return;
    }
    if (!isValidEmail(email)) {
        showMsg("Please enter a valid email address", "red");
        return;
    }
    if (!isValidPhone(phoneNumber)) {
        showMsg("Please enter a valid phone number (digits only, min 10)", "red");
        return;
    }
    const enquiryData = {
        name: name,
        email: email,
        phone: phoneNumber,
        message: message,
    };
    const enquiries = getEnquiryData();
    enquiries.push(enquiryData);
    setEnquiryData(enquiries);
    enquiryForm.reset();
    formMsg.textContent = "";
    popupMessage.style.display = "block";
    setTimeout(() => {
        popupMessage.style.display = "none";
    }, 3000);
});
//# sourceMappingURL=enquiryForm.js.map