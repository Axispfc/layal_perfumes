import type {Metadata} from "next";
import {CartProvider} from "@/components/cart-provider";
import {Header,Footer,WhatsApp} from "@/components/shell";
import "./globals.css";
export const metadata:Metadata={title:{default:"Layal Perfumes | A essência do extraordinário",template:"%s | Layal Perfumes"},description:"Explore o universo Layal de perfumaria árabe. Primeira versão demonstrativa, sem vendas reais.",robots:{index:false,follow:false}};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="pt-BR"><body><CartProvider><a href="#conteudo" className="skip-link">Pular para o conteúdo</a><Header/><main id="conteudo">{children}</main><Footer/><WhatsApp/></CartProvider></body></html>;}
