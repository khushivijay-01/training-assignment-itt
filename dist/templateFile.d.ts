import type { CartItem, OrderData, Product } from "./types.js";
export declare function cardTemplate(item: CartItem): string;
export declare function orderItemTemplate(item: CartItem, order: OrderData): string;
export declare function orderItemTotalTemplate(itemsHTML: string, totalAmount: number): string;
export declare function productCardTemplate(product: Product): string;
export declare function categorySectionTemplate(categoryName: string): string;
//# sourceMappingURL=templateFile.d.ts.map