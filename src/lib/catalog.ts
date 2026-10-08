import { products, type Product } from "@/data/products";
export interface CatalogRepository { list(): Promise<Product[]>; findBySlug(slug: string): Promise<Product | undefined> }
export const catalog: CatalogRepository = { async list() { return products; }, async findBySlug(slug) { return products.find(p => p.slug === slug); } };
export const money = (cents: number) => new Intl.NumberFormat("pt-BR", {style:"currency",currency:"BRL"}).format(cents/100);
