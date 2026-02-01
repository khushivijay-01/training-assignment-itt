import { getEnquiryData, setEnquiryData} from "./utilityFunctions.js";
import type { EnquiryData } from "./types.js";
import { isValidEmail, isValidPhone, isRequiredField } from "./validation.js";

const enquiryForm = document.querySelector<HTMLFormElement>(".enquiry form");
const formMsg = document.getElementById("formMsg") as HTMLElement | null;
const popupMessage = document.getElementById("popupMessage") as HTMLElement | null;

if( !enquiryForm || !formMsg || !popupMessage) {
    throw new Error("Required DOM elements not found!");
}

enquiryForm.after(formMsg);

function showMsg(message: string, color: string): void {
  if(!formMsg) return;
  formMsg.textContent = message;
  formMsg.style.color = color;
}

enquiryForm.addEventListener("submit", (e): void => {
  e.preventDefault();

  const nameInput = document.getElementById("name") as HTMLInputElement | null;
  const emailInput = document.getElementById("email") as HTMLInputElement | null;
  const phoneNumberInput = document.getElementById("phone") as HTMLInputElement | null;
  const messageInput = document.getElementById("message") as HTMLTextAreaElement | null;

  if(!nameInput || !emailInput || !phoneNumberInput || !messageInput) {
    showMsg("Form elements missing!" , "red");
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

  const enquiryData: EnquiryData = {
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

  setTimeout((): void => {
    popupMessage.style.display = "none";
  }, 3000);
});
