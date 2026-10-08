import {catalog} from "@/lib/catalog";
import {CatalogGrid} from "@/components/catalog-grid";
export const metadata={title:"Nossa coleção"};
export default async function CatalogPage({searchParams}:{searchParams:Promise<{categoria?:string}>}) {const params=await searchParams;return <section className="section page-section"><div className="eyebrow">O UNIVERSO DAS FRAGRÂNCIAS</div><h1>Nossa <em>coleção.</em></h1><p className="intro">Descubra uma essência que acompanha o seu jeito de estar no mundo.</p><p className="demo-notice">Catálogo demonstrativo: nomes, ilustrações, preços e características fictícios.</p><CatalogGrid products={await catalog.list()} initial={params.categoria} key={params.categoria ?? "todos"}/></section>;}
