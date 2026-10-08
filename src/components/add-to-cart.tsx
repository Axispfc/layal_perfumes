"use client";
import {useState} from "react";
import Link from "next/link";
import {ShoppingBag} from "lucide-react";
import {useCart} from "./cart-provider";
export function AddToCart({id}:{id:string}) {const {add,ready,items}=useCart();const [added,setAdded]=useState(false);const full=(items.find(i=>i.id===id)?.quantity ?? 0)>=99;return <><button className="button gold full" disabled={!ready || full} onClick={()=>{add(id);setAdded(true);}}><ShoppingBag size={17}/>{full?"Limite de 99 unidades": "Adicionar ao carrinho"}</button><p role="status" className="add-status">{added&&<>Produto demonstrativo adicionado. <Link href="/carrinho">Ver carrinho →</Link></>}</p></>;}
