"use client";
import {createContext,useContext,useEffect,useState,type ReactNode} from "react";
import {sanitizeCart,type CartItem} from "@/lib/cart";
const Context = createContext<{items:CartItem[];ready:boolean;add:(id:string)=>void;setQuantity:(id:string,q:number)=>void}>({items:[],ready:false,add:()=>{},setQuantity:()=>{}});
export function CartProvider({children}:{children:ReactNode}) {
 const [items,setItems]=useState<CartItem[]>([]); const [ready,setReady]=useState(false);
 // Restore browser storage after hydration; the initial server render stays deterministic.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{try { setItems(sanitizeCart(JSON.parse(localStorage.getItem("layal-cart-v1") ?? "[]"))); } catch {} setReady(true);},[]);
 useEffect(()=>{if(ready) {try {localStorage.setItem("layal-cart-v1",JSON.stringify(items));} catch {}}},[items,ready]);
 const add=(id:string)=>setItems(current=>sanitizeCart([...current,{id,quantity:1}]));
 const setQuantity=(id:string,q:number)=>setItems(current=>sanitizeCart(current.map(i=>i.id===id?{...i,quantity:q}:i)));
 return <Context.Provider value={{items,ready,add,setQuantity}}>{children}</Context.Provider>;
}
export const useCart=()=>useContext(Context);
