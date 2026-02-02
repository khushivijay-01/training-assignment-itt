import type { EnquiryData, CartItem, UserData, OrderData } from "./types.js";

export function getCart(): CartItem[]  {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function saveCart(cart: CartItem[]) : void{
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getEnquiryData(): EnquiryData[] {
    return JSON.parse(localStorage.getItem("enquiries") || "[]");
}

export function setEnquiryData(enquiries: EnquiryData[]): void {
  localStorage.setItem("enquiries", JSON.stringify(enquiries));
}

export function getOrderData(): OrderData[] {
    return JSON.parse(localStorage.getItem("orders") || "[]");
}

export function setOrderData(order: OrderData[]): void {
  localStorage.setItem("orders", JSON.stringify(order));
}

export function getUserData(): UserData | null {
  const data = localStorage.getItem("userData");
  return data ? JSON.parse(data) : null;
}

export function setUserData(user: UserData): void {
  localStorage.setItem("userData", JSON.stringify(user));
}