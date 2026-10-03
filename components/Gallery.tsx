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

  function renderImage(src:string, alt:string, fill=true){
    if(src.startsWith("data:")) return <img src={src} alt={alt} />;
    return <Image src={src} alt={alt} fill={fill} sizes="(max-width:700px) 50vw, 33vw" />;
  }

  return <>
    <div className="masonry">
      {items.map((src,i)=><button key={src+i} className={"gallery-card g"+(i%5)} onClick={()=>setActive(i)}>
        {renderImage(src,"Cucucina, zdjęcie "+(i+1))}
      </button>)}
    </div>
    {active!==null&&<div className="lightbox" role="dialog" aria-modal="true">
      <button className="lb-close" onClick={()=>setActive(null)}><X/></button>
      <button className="lb-prev" onClick={()=>setActive((active-1+items.length)%items.length)}><ChevronLeft/></button>
      <div className="lb-image">{renderImage(items[active],"Podgląd galerii Cucucina")}</div>
      <button className="lb-next" onClick={()=>setActive((active+1)%items.length)}><ChevronRight/></button>
      <span className="lb-count">{active+1} / {items.length}</span>
    </div>}
  </>;
}
