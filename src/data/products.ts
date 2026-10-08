import officialData from "./official-catalog.json";
import {demoProducts} from "./demo-products";
import {parseOfficialCatalog,selectPublicCatalog} from "@/lib/official-catalog";
export type {Product,Category} from "./product-types";
export const officialProducts=parseOfficialCatalog(officialData);
export const products=selectPublicCatalog(officialProducts,demoProducts);
export const catalogMode=officialProducts.length?"official":"demo";
