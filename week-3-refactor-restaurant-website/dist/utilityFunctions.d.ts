import type { EnquiryData, CartItem, UserData, OrderData } from "./types.js";
export declare function getCart(): CartItem[];
export declare function saveCart(cart: CartItem[]): void;
export declare function getEnquiryData(): EnquiryData[];
export declare function setEnquiryData(enquiries: EnquiryData[]): void;
export declare function getOrderData(): OrderData[];
export declare function setOrderData(order: OrderData[]): void;
export declare function getUserData(): UserData | null;
export declare function setUserData(user: UserData): void;
//# sourceMappingURL=utilityFunctions.d.ts.map