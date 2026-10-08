import publishedData from "./published-products.json" with {type:"json"};
import {demoProducts} from "./demo-products";
import {parseOfficialCatalog,selectPublicCatalog} from "@/lib/official-catalog";
export type {Product,Category} from "./product-types";
export const officialProducts=parseOfficialCatalog({schemaVersion:1,products:publishedData});
export const products=selectPublicCatalog(officialProducts,demoProducts);
export const catalogMode=officialProducts.length?"official":"demo";
