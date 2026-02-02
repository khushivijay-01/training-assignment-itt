export function isValidEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}

export function isValidPhone(phone: string): boolean {
  return phone.length >= 10;
}

export function isRequiredField(value: string): boolean {
  return value.trim().length > 0;
}
