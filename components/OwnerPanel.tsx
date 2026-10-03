"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { LockKeyhole, Plus, Trash2, X } from "lucide-react";
import { defaultMenu, MenuItem } from "./MenuSection";

const GALLERY_KEY = "cucucina-gallery";
const MENU_KEY = "cucucina-menu";
const PASSWORD = "cucucina-demo";

type Tab = "gallery" | "menu";

export function OwnerPanel({onClose}:{onClose:()=>void}) {
  const [logged,setLogged]=useState(false),[pass,setPass]=useState(""),[tab,setTab]=useState<Tab>("gallery");
  const [gallery,setGallery]=useState<string[]>([]),[menu,setMenu]=useState<MenuItem[]>(defaultMenu),[error,setError]=useState("");

  useEffect(()=>{
    try {
      const g=localStorage.getItem(GALLERY_KEY); if(g) setGallery(JSON.parse(g));
      const m=localStorage.getItem(MENU_KEY); if(m) setMenu(JSON.parse(m));
    } catch {}
  },[]);

  function saveGallery(next:string[]){setGallery(next);localStorage.setItem(GALLERY_KEY,JSON.stringify(next));}
  function saveMenu(next:MenuItem[]){setMenu(next);localStorage.setItem(MENU_KEY,JSON.stringify(next));window.dispatchEvent(new Event("storage"));}

  function addImages(e:ChangeEvent<HTMLInputElement>){
    const files=Array.from(e.target.files||[]);
    files.forEach(file=>{
      if(!file.type.startsWith("image/")) return;
      const reader=new FileReader();
      reader.onload=()=>saveGallery([...gallery, String(reader.result)]);
      reader.readAsDataURL(file);
    });
    e.target.value="";
  }

  function addMenuItem(){
    saveMenu([...menu,{id:crypto.randomUUID(),name:"Nowa pizza",description:"składniki · składniki · składniki",price:"00 zł"}]);
  }

  function updateMenu(id:string, field:keyof MenuItem, value:string){
    saveMenu(menu.map(item=>item.id===id?{...item,[field]:value}:item));
  }

  function login(){
    if(pass===PASSWORD){setLogged(true);setError("");}
    else setError("Nieprawidłowe hasło.");
  }

  return <div className="owner-overlay"><div className="owner-panel">
    <button className="owner-close" onClick={onClose} aria-label="Zamknij"><X/></button>
    {!logged ? <div className="login">
      <div className="owner-icon"><LockKeyhole/></div>
      <div className="eyebrow">C U C U C I N A / OWNER</div>
      <h2>Panel właściciela</h2>
      <p>Zarządzaj osobno galerią i menu bez dotykania kodu strony.</p>
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Hasło demonstracyjne" onKeyDown={e=>e.key==="Enter"&&login()}/>
      <button className="button dark full" onClick={login}>Zaloguj się</button>
      {error&&<small className="error">{error}</small>}
      <small>DEMO: hasło <b>cucucina-demo</b>. Wersja lokalna, dane zapisują się w przeglądarce.</small>
    </div> : <>
      <div className="owner-top">
        <div><div className="eyebrow">OWNER MODE</div><h2>{tab==="gallery"?"Galeria":"Menu"}</h2></div>
        {tab==="gallery" ? <label className="button dark"><Plus size={17}/> Dodaj zdjęcia<input hidden type="file" accept="image/*" multiple onChange={addImages}/></label> : <button className="button dark" onClick={addMenuItem}><Plus size={17}/> Dodaj pozycję</button>}
      </div>

      <div className="owner-tabs">
        <button className={tab==="gallery"?"active":""} onClick={()=>setTab("gallery")}>Galeria</button>
        <button className={tab==="menu"?"active":""} onClick={()=>setTab("menu")}>Menu</button>
      </div>

      {tab==="gallery" ? <>
        <p className="owner-hint">Galeria i menu są przechowywane niezależnie. W tej wersji demonstracyjnej zmiany zapisują się lokalnie w tej przeglądarce.</p>
        <div className="owner-grid">{gallery.map((src,i)=><div className="owner-photo" key={src+i}><img src={src} alt=""/><button onClick={()=>saveGallery(gallery.filter((_,n)=>n!==i))} aria-label="Usuń zdjęcie"><Trash2 size={15}/></button></div>)}</div>
      </> : <>
        <p className="owner-hint">Edytuj nazwę, składniki i cenę każdej pozycji. Zmiany dotyczą tylko sekcji menu.</p>
        <div className="owner-menu-list">
          {menu.map((item,i)=><div className="owner-menu-item" key={item.id}>
            <span className="dish-no">{String(i+1).padStart(2,"0")}</span>
            <div className="owner-menu-fields">
              <input value={item.name} onChange={e=>updateMenu(item.id,"name",e.target.value)} aria-label="Nazwa pizzy"/>
              <input value={item.description} onChange={e=>updateMenu(item.id,"description",e.target.value)} aria-label="Składniki"/>
              <input value={item.price} onChange={e=>updateMenu(item.id,"price",e.target.value)} aria-label="Cena"/>
            </div>
            <button className="owner-delete" onClick={()=>saveMenu(menu.filter(x=>x.id!==item.id))} aria-label="Usuń pozycję"><Trash2 size={16}/></button>
          </div>)}
        </div>
      </>}
    </>}
  </div></div>
}
