export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface UserData {
  name: string;
  phone: string;
  email: string;
}

export interface OrderData {
  orderId: number;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  stock: number;
}

export interface ProductCardMap {
  section: HTMLElement;
  track: HTMLElement | null;
  index: number;
}