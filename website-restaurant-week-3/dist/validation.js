export function isValidEmail(email) {
    return email.includes("@") && email.includes(".");
}
export function isValidPhone(phone) {
    return phone.length >= 10;
}
export function isRequiredField(value) {
    return value.trim().length > 0;
}
//# sourceMappingURL=validation.js.map