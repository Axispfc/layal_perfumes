"use client";

import {useEffect,useRef} from "react";

export function HeroVideo({src}:{src:string}) {
 const ref=useRef<HTMLVideoElement>(null);
 useEffect(()=>{
  const video=ref.current;
  if(!video) return;
  const preference=window.matchMedia("(prefers-reduced-motion: reduce)");
  const sync=()=>{
   if(preference.matches) video.pause();
   else void video.play().catch(()=>{/* Keep the dark fallback if autoplay is blocked. */});
  };
  sync();
  preference.addEventListener("change",sync);
  return ()=>{preference.removeEventListener("change",sync);video.pause();};
 },[]);
 return <video ref={ref} className="hero-video" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1}><source src={src} type="video/mp4"/></video>;
}
