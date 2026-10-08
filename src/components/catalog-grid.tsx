"use client";
import {useState} from "react";
import type {Product} from "@/data/products";
import {ProductCard} from "./product-card";
const options=[{id:"todos",label:"Todos os perfumes"},{id:"masculino",label:"Masculino"},{id:"feminino",label:"Feminino"},{id:"kits",label:"Kits"},{id:"mais-vendidos",label:"Mais vendidos"}];
export function CatalogGrid({products,initial="todos"}:{products:Product[];initial?:string}) {const [active,setActive]=useState(options.some(o=>o.id===initial)?initial:"todos");const filtered=products.filter(p=>active==="todos" || (active==="mais-vendidos"?p.bestseller:p.category===active));return <><div className="filters" aria-label="Categorias de perfumes">{options.map(o=><button key={o.id} aria-pressed={active===o.id} className={active===o.id?"active":""} onClick={()=>setActive(o.id)}>{o.label}</button>)}</div><p className="sr-only" aria-live="polite">{filtered.length} produtos demonstrativos</p><div className="product-grid">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div><p className="catalog-note">* Nomes, valores, volumes e notas são fictícios. A seleção “mais vendidos” também é demonstrativa.</p></>;}
