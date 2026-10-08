import { products } from "@/data/products";
export type CartItem = { id: string; quantity: number };
export function sanitizeCart(value: unknown): CartItem[] {
 if (!Array.isArray(value)) return [];
 const result: CartItem[] = [];
 for (const item of value) {
  if (!item || typeof item !== "object" || typeof item.id !== "string" || !products.some(p => p.id === item.id) || !Number.isInteger(item.quantity) || item.quantity < 1) continue;
  const existing = result.find(p => p.id === item.id);
  if (existing) existing.quantity = Math.min(99,existing.quantity + item.quantity);
  else result.push({id:item.id,quantity:Math.min(99,item.quantity)});
 }
 return result;
}
export function subtotal(items: CartItem[]): number { return items.reduce((sum,item) => sum + (products.find(p => p.id === item.id)?.priceCents ?? 0)*item.quantity,0); }
