"use client";
import Image from "next/image";
import {useState} from "react";
import {ImageIcon} from "lucide-react";
import type {Product} from "@/data/product-types";
import {Bottle} from "./bottle";
export function ProductVisual({product,large=false}:{product:Product;large?:boolean}) {
 const [failed,setFailed]=useState(false);
 if(product.isDemo)return <Bottle color={product.color} large={large}/>;
 if(!product.photoPath || failed)return <div className="photo-placeholder" role="img" aria-label={`Fotografia oficial de ${product.name} ainda indisponível`}><ImageIcon size={large?40:28} strokeWidth={1}/><span>Fotografia oficial em breve</span><small>{product.brand} · {product.name}</small></div>;
 return <div className="official-photo"><Image src={product.photoPath} alt={`Frasco original de ${product.name} — ${product.brand}`} fill sizes={large?"(max-width:700px) 88vw, 45vw":"(max-width:700px) 44vw, 24vw"} unoptimized style={{objectFit:"contain"}} onError={()=>setFailed(true)}/></div>;
}
