import Link from "next/link";
import {Sparkles} from "lucide-react";
export const metadata={title:"Encontre seu perfume ideal"};
export default function QuizPage() {return <section className="section quiz-page"><Sparkles size={36}/><div className="eyebrow">EM BREVE · EXPERIÊNCIA LAYAL</div><h1>Sua essência.<br/><em>Sua história.</em></h1><p>Estamos preparando o quiz “Encontre seu perfume ideal”. Uma jornada pelas suas preferências, ocasiões e famílias olfativas.</p><p>As recomendações estarão disponíveis após a chegada do catálogo oficial.</p><Link className="button gold" href="/catalogo">Explore a coleção demonstrativa →</Link></section>;}
