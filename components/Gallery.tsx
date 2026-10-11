"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function Gallery({initial}:{initial:string[]}){
  const [items,setItems]=useState(initial);
  const [active,setActive]=useState<number|null>(null);

  useEffect(()=>{
    try { const x=localStorage.getItem("cucucina-gallery"); if(x) setItems(JSON.parse(x)); } catch {}
    const onStorage = () => {
      try { const x=localStorage.getItem("cucucina-gallery"); if(x) setItems(x ? JSON.parse(x) : initial); } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  },[initial]);

  useEffect(()=>{
    if(active===null) return;
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==="Escape") setActive(null);
      if(event.key==="ArrowLeft") setActive(current=>current===null?null:(current-1+items.length)%items.length);
      if(event.key==="ArrowRight") setActive(current=>current===null?null:(current+1)%items.length);
    };
    window.addEventListener("keydown",onKeyDown);
    document.body.style.overflow="hidden";
    return ()=>{window.removeEventListener("keydown",onKeyDown);document.body.style.overflow="";};
  },[active,items.length]);

  function renderImage(src:string, alt:string, fill=true){
    if(src.startsWith("data:")) return <img src={src} alt={alt} />;
    return <Image src={src} alt={alt} fill={fill} sizes="(max-width:700px) 50vw, 33vw" />;
  }

  return <>
    <div className="masonry">
      {items.map((src,i)=><button key={src+i} className={"gallery-card g"+(i%5)} onClick={()=>setActive(i)} aria-label={"Otwórz zdjęcie "+(i+1)}>
        {renderImage(src,"Cucucina, zdjęcie "+(i+1))}
      </button>)}
    </div>
    {active!==null&&<div className="lightbox" role="dialog" aria-modal="true">
      <button className="lb-close" onClick={()=>setActive(null)} aria-label="Zamknij galerię"><X/></button>
      <button className="lb-prev" onClick={()=>setActive((active-1+items.length)%items.length)} aria-label="Poprzednie zdjęcie"><ChevronLeft/></button>
      <div className="lb-image">{renderImage(items[active],"Podgląd galerii Cucucina")}</div>
      <button className="lb-next" onClick={()=>setActive((active+1)%items.length)} aria-label="Następne zdjęcie"><ChevronRight/></button>
      <span className="lb-count">{active+1} / {items.length}</span>
    </div>}
  </>;
}
