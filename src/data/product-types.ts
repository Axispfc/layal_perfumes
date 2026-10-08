export type Category = "masculino" | "feminino" | "unissex" | "kits";
export type Product = {
 id: string; slug: string; name: string; brand?: string; category: Category;
 priceCents: number; volume: string; family?: string;
 notes: { top: string | null; heart: string | null; base: string | null };
 color?: string; bestseller: boolean; description: string; isDemo: boolean;
 photoPath?: string | null;
};
