import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import type {Product} from "@/data/products";
import {money} from "@/lib/catalog";
import {ProductVisual} from "./product-visual";
export function ProductCard({product}:{product:Product}) {return <article className="product-card"><Link href={`/produtos/${product.slug}`} className="product-art">{product.isDemo&&<span className="demo-tag">DEMONSTRAÇÃO</span>}<ProductVisual key={product.photoPath} product={product}/>{product.isDemo&&<span className="art-caption">ILUSTRAÇÃO CONCEITUAL</span>}</Link><div className="product-meta"><span>{product.brand ?? product.family}</span><span>{product.volume}{product.isDemo?"*":""}</span></div><Link href={`/produtos/${product.slug}`}><h3>{product.name}</h3></Link><div className="product-price"><span>{money(product.priceCents)} {product.isDemo&&<small>valor de teste</small>}</span><Link href={`/produtos/${product.slug}`} aria-label={`Ver detalhes de ${product.name}`}><ArrowUpRight size={20}/></Link></div><Link className="details-link" href={`/produtos/${product.slug}`}>Visualizar detalhes</Link></article>;}
