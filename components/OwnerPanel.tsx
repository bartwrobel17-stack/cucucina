"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { LockKeyhole, Plus, Trash2, X } from "lucide-react";
import { defaultMenu, MenuItem } from "./MenuSection";

const GALLERY_KEY="cucucina-gallery", MENU_KEY="cucucina-menu", MENU_PHOTOS_KEY="cucucina-menu-photos", PASSWORD="cucucina-demo";
type Tab="gallery"|"menu";

export function OwnerPanel({onClose}:{onClose:()=>void}){
  const [logged,setLogged]=useState(false),[pass,setPass]=useState(""),[tab,setTab]=useState<Tab>("gallery");
  const [gallery,setGallery]=useState<string[]>([]),[menu,setMenu]=useState<MenuItem[]>(defaultMenu),[menuPhotos,setMenuPhotos]=useState<string[]>([]),[error,setError]=useState("");
  useEffect(()=>{try{const g=localStorage.getItem(GALLERY_KEY);if(g)setGallery(JSON.parse(g));const m=localStorage.getItem(MENU_KEY);if(m)setMenu(JSON.parse(m));const p=localStorage.getItem(MENU_PHOTOS_KEY);if(p)setMenuPhotos(JSON.parse(p))}catch{}},[]);
  function saveGallery(n:string[]){setGallery(n);localStorage.setItem(GALLERY_KEY,JSON.stringify(n));window.dispatchEvent(new Event("storage"))}
  function saveMenu(n:MenuItem[]){setMenu(n);localStorage.setItem(MENU_KEY,JSON.stringify(n));window.dispatchEvent(new Event("storage"))}
  function saveMenuPhotos(n:string[]){setMenuPhotos(n);localStorage.setItem(MENU_PHOTOS_KEY,JSON.stringify(n));window.dispatchEvent(new Event("storage"))}
  function addFiles(e:ChangeEvent<HTMLInputElement>,kind:"gallery"|"menu"){Array.from(e.target.files||[]).forEach(file=>{if(!file.type.startsWith("image/"))return;const r=new FileReader();r.onload=()=>{const v=String(r.result);if(kind==="gallery")saveGallery([...JSON.parse(localStorage.getItem(GALLERY_KEY)||"[]"),v]);else saveMenuPhotos([...JSON.parse(localStorage.getItem(MENU_PHOTOS_KEY)||"[]"),v])};r.readAsDataURL(file)});e.target.value=""}
  function addMenuItem(){saveMenu([...menu,{id:crypto.randomUUID(),name:"Nowa pizza",description:"składniki · składniki · składniki",price:"00 zł",image:undefined}])}
  function updateMenu(id:string,field:keyof MenuItem,value:string){saveMenu(menu.map(x=>x.id===id?{...x,[field]:value}:x))}
  function updatePhoto(id:string,src:string){saveMenu(menu.map(x=>x.id===id?{...x,image:src}:x))}
  function login(){if(pass===PASSWORD){setLogged(true);setError("")}else setError("Nieprawidłowe hasło.")}
  return <div className="owner-overlay"><div className="owner-panel"><button className="owner-close" onClick={onClose}><X/></button>
  {!logged?<div className="login"><div className="owner-icon"><LockKeyhole/></div><div className="eyebrow">C U C U C I N A / OWNER</div><h2>Panel właściciela</h2><p>Zarządzaj osobno galerią i menu, razem ze zdjęciami.</p><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Hasło demonstracyjne" onKeyDown={e=>e.key==="Enter"&&login()}/><button className="button dark full" onClick={login}>Zaloguj się</button>{error&&<small className="error">{error}</small>}<small>DEMO: hasło <b>cucucina-demo</b>. Wersja lokalna, dane zapisują się w przeglądarce.</small></div>
  :<><div className="owner-top"><div><div className="eyebrow">OWNER MODE</div><h2>{tab==="gallery"?"Galeria":"Menu"}</h2></div>{tab==="gallery"?<label className="button dark"><Plus size={17}/> Dodaj zdjęcia<input hidden type="file" accept="image/*" multiple onChange={e=>addFiles(e,"gallery")}/></label>:<button className="button dark" onClick={addMenuItem}><Plus size={17}/> Dodaj pozycję</button>}</div>
  <div className="owner-tabs"><button className={tab==="gallery"?"active":""} onClick={()=>setTab("gallery")}>Galeria</button><button className={tab==="menu"?"active":""} onClick={()=>setTab("menu")}>Menu</button></div>
  {tab==="gallery"?<><p className="owner-hint">Galeria strony jest niezależna od menu.</p><div className="owner-grid">{gallery.map((src,i)=><div className="owner-photo" key={src+i}><img src={src} alt=""/><button onClick={()=>saveGallery(gallery.filter((_,n)=>n!==i))}><Trash2 size={15}/></button></div>)}</div></>
  :<><div className="menu-photo-upload"><div><div className="eyebrow">PEŁNE ZDJĘCIA MENU</div><h3>Dodaj zdjęcia całej karty</h3><p>Możesz wrzucić kilka stron menu. Pojawią się pod pozycjami pizzy.</p></div><label className="button dark"><Plus size={17}/> Dodaj zdjęcia menu<input hidden type="file" accept="image/*" multiple onChange={e=>addFiles(e,"menu")}/></label></div>
  {menuPhotos.length>0&&<div className="menu-photo-grid">{menuPhotos.map((src,i)=><div className="menu-photo-item" key={src+i}><img src={src} alt={"Pełne menu "+(i+1)}/><button onClick={()=>saveMenuPhotos(menuPhotos.filter((_,n)=>n!==i))}><Trash2 size={15}/></button></div>)}</div>}
  <p className="owner-hint">Każda pozycja może mieć własne zdjęcie. Nazwę, składniki, cenę i zdjęcie zmieniasz osobno.</p><div className="owner-menu-list">{menu.map((item,i)=><div className="owner-menu-item" key={item.id}><span className="dish-no">{String(i+1).padStart(2,"0")}</span><div className="owner-menu-fields"><input value={item.name} onChange={e=>updateMenu(item.id,"name",e.target.value)}/><input value={item.description} onChange={e=>updateMenu(item.id,"description",e.target.value)}/><input value={item.price} onChange={e=>updateMenu(item.id,"price",e.target.value)}/><label className="menu-item-photo"><span>{item.image?"Zmień zdjęcie":"Dodaj zdjęcie"}</span><input hidden type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>updatePhoto(item.id,String(r.result));r.readAsDataURL(f);e.target.value=""}}/></label></div><div className="owner-item-actions">{item.image&&<img src={item.image} alt=""/>}<button className="owner-delete" onClick={()=>saveMenu(menu.filter(x=>x.id!==item.id))}><Trash2 size={16}/></button></div></div>)}</div></>}
  </>}</div></div>
}
