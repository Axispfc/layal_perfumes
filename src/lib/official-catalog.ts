import type {Product,Category} from "@/data/product-types";
const categories: Category[] = ["masculino","feminino","unissex","kits"];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function parseOfficialCatalog(value: unknown): Product[] {
 if (!value || typeof value !== "object" || !("schemaVersion" in value) || value.schemaVersion !== 1 || !("products" in value) || !Array.isArray(value.products)) throw new Error("Catálogo oficial: estrutura ou versão inválida.");
 if(value.products.length > 21) throw new Error("Catálogo oficial: limite inicial de 21 cadastros.");
 const ids=new Set<string>();const slugs=new Set<string>();const result:Product[]=[];
 for(const entry of value.products) {
  if(!entry || typeof entry!=="object" || typeof entry.id!=="string" || !slugPattern.test(entry.id) || !entry.id.startsWith("layal-") || ids.has(entry.id)) throw new Error("Catálogo oficial: ID ausente, inválido ou duplicado.");
  ids.add(entry.id);
  if(entry.status!=="draft" && entry.status!=="published") throw new Error(`Catálogo ${entry.id}: status inválido.`);
  if(entry.status==="draft") continue;
  const text=(key:string):string=>{const v=entry[key];if(typeof v!=="string" || !v.trim())throw new Error(`Catálogo ${entry.id}: ${key} obrigatório.`);return v.trim();};
  const slug=text("slug");
  if(!slugPattern.test(slug) || slugs.has(slug))throw new Error(`Catálogo ${entry.id}: slug inválido ou duplicado.`);
  slugs.add(slug);
  if(!Number.isSafeInteger(entry.priceCents) || entry.priceCents<=0)throw new Error(`Catálogo ${entry.id}: preço deve ser inteiro positivo em centavos.`);
  if(!categories.includes(entry.category))throw new Error(`Catálogo ${entry.id}: categoria inválida.`);
  if(typeof entry.bestseller!=="boolean")throw new Error(`Catálogo ${entry.id}: bestseller deve ser booleano.`);
  if(!entry.notes || typeof entry.notes!=="object")throw new Error(`Catálogo ${entry.id}: notas obrigatórias; use null quando não informadas.`);
  const note=(key:string):string|null=>{const v=entry.notes[key];if(v===null)return null;if(typeof v!=="string" || !v.trim())throw new Error(`Catálogo ${entry.id}: nota ${key} inválida.`);return v.trim();};
  const photo=entry.photoPath;
  if(photo!==null && (typeof photo!=="string" || !/^\/images\/products\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|jpeg|png|webp)$/.test(photo)))throw new Error(`Catálogo ${entry.id}: fotografia deve usar caminho local padronizado em /images/products/ ou null.`);
  if(entry.family!==null && (typeof entry.family!=="string" || !entry.family.trim()))throw new Error(`Catálogo ${entry.id}: família deve ser texto ou null.`);
  result.push({id:entry.id,slug,name:text("name"),brand:text("brand"),priceCents:entry.priceCents,volume:text("volume"),category:entry.category,description:text("description"),family:entry.family?.trim(),notes:{top:note("top"),heart:note("heart"),base:note("base")},photoPath:photo,bestseller:entry.bestseller,isDemo:false});
 }
 return result;
}
export function selectPublicCatalog(official: Product[], demo:Product[]): Product[] { return official.length ? official : demo; }
