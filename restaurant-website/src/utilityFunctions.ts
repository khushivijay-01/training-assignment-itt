import type { EnquiryData, CartItem, UserData, OrderData } from "./types.ts";

export function getFromLocalStorage<T>(key: string, value: T): T {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : value;
}

export function setToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCart(): CartItem[]  {
  return getFromLocalStorage<CartItem[]>("cart", []);
}

export function saveCart(cart: CartItem[]) : void{
  setToLocalStorage<CartItem[]>("cart" , cart);
}

export function getEnquiryData(): EnquiryData[] {
    return getFromLocalStorage<EnquiryData[]>("enquiries", []);
}

export function setEnquiryData(enquiries: EnquiryData[]): void {
  setToLocalStorage<EnquiryData[]>("enquiries", enquiries);
}

export function getOrderData(): OrderData[] {
  return getFromLocalStorage<OrderData[]>("orders", []);
}

export function setOrderData(orders: OrderData[]): void {
  setToLocalStorage<OrderData[]>("orders", orders);
}

export function getUserData(): UserData | null {
  return getFromLocalStorage<UserData | null>("userData", null);
}

export function setUserData(user: UserData): void {
  setToLocalStorage<UserData>("userData", user);
}