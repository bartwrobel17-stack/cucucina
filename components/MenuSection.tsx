"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

export type MenuItem = { id:string; name:string; description:string; price:string; image?:string };

export const defaultMenu:MenuItem[] = [
  {id:"margherita",name:"Margherita Classic",description:"Pomidory San Marzano D.O.P · mozzarella fior di latte · basilico · Grana Padano DOP · EVO",price:"36 zł",image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"},
  {id:"marinara",name:"Marinara Moderno",description:"Pomidory San Marzano DOP · oregano · basilico · czosnek · anchois · kapary · oliwki · EVO",price:"30 zł",image:"https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=85"},
  {id:"salami-classica",name:"Salami Classica",description:"Pomidory San Marzano DOP · mozzarella fior di latte · Salami Napoli · Grana Padano · pieprz · basilico · EVO",price:"45 zł",image:"https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85"},
  {id:"salami-piccante",name:"Salami Piccante",description:"Pomidory San Marzano DOP · Provola affumicata · Spianata Calabrese piccante · peperoncino · szalotka · pieprz · EVO",price:"46 zł",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85"},
  {id:"quattro-formaggi",name:"Quattro Formaggi",description:"Mozzarella fior di latte · Taleggio · Gorgonzola Dolce · Grana Padano · basilico · EVO",price:"47 zł",image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"},
  {id:"melanzane",name:"Pizza Melanzane",description:"Pomidory San Marzano DOP · mozzarella fior di latte · grillowany bakłażan · Grana Padano · czosnek · basilico · EVO",price:"45 zł",image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85"},
  {id:"mista-carne",name:"Pizza Mista di Carne",description:"Pomidory San Marzano · Provola affumicata · prosciutto cotto · salami piccante · salsiccia · szalotka · peperoncino",price:"53 zł",image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85"},
  {id:"cotto",name:"Pizza Cotto",description:"Mozzarella fior di latte · prosciutto cotto · Grana Padano · czarny pieprz · EVO",price:"45 zł",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85"},
  {id:"parma",name:"Parma",description:"Pomidory San Marzano DOP · mozzarella fior di latte · prosciutto crudo · pomidorki cherry · mini mozzarella · Grana Padano",price:"53 zł",image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"},
  {id:"cucucina",name:"Cucucina",description:"Pomidory San Marzano DOP · mozzarella fior di latte · red cheddar · chorizo piccante · pieczona słodka papryka · szalotka · peperoncino",price:"53 zł",image:"https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=900&q=85"},
  {id:"salsiccia",name:"Salsiccia di Friarielli",description:"Mozzarella fior di latte · provola affumicata · salsiccia Veneto · friarielli · pieprz · basilico",price:"45 zł",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85"}
];

const KEY="cucucina-menu";

function readMenu():MenuItem[]{
  try{const raw=localStorage.getItem(KEY);return raw?JSON.parse(raw):defaultMenu}catch{return defaultMenu}
}

export function MenuSection(){
  const [items,setItems]=useState<MenuItem[]>(defaultMenu);
  const [menuPhotos,setMenuPhotos]=useState<string[]>([]);
  useEffect(()=>{
    setItems(readMenu());
    try { const raw=localStorage.getItem("cucucina-menu-photos"); if(raw) setMenuPhotos(JSON.parse(raw)); } catch {}
    const onStorage=()=>{
      setItems(readMenu());
      try { const raw=localStorage.getItem("cucucina-menu-photos"); setMenuPhotos(raw?JSON.parse(raw):[]); } catch {}
    };
    window.addEventListener("storage",onStorage);
    return()=>window.removeEventListener("storage",onStorage)
  },[]);
  return <section className="menu-section" id="menu">
    <div className="section-head"><div><div className="eyebrow">02 / MENU</div><h2>Pełne menu.<br/><em>Bez zgadywania.</em></h2></div><span className="price-note">33–34 CM · PIZZA</span></div>
    <div className="menu-cards">{items.map(item=><article className="menu-card" key={item.id}>
      <div className="menu-card-image">{item.image&&<Image src={item.image} alt={item.name} fill sizes="(max-width:800px) 100vw, 33vw"/>}</div>
      <div className="menu-card-copy"><div><h3>{item.name}</h3><p>{item.description}</p></div><strong>{item.price}</strong></div>
    </article>)}</div>
    {menuPhotos.length>0&&<div className="full-menu-photos"><div className="eyebrow">PEŁNA KARTA MENU</div><div className="full-menu-grid">{menuPhotos.map((src,i)=><img key={src+i} src={src} alt={"Pełne menu Cucucina "+(i+1)}/>)}</div></div>}
    <div className="menu-bottom"><p>Pełna karta jest edytowalna w panelu właściciela.</p><a className="button outline" href="tel:+48514055895">Zamów telefonicznie <Phone size={16}/></a></div>
  </section>
}
