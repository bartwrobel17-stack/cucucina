"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock3, Instagram, MapPin, Menu, Phone, Star, X } from "lucide-react";
import { Gallery } from "../components/Gallery";
import { MenuSection } from "../components/MenuSection";
import { OwnerPanel } from "../components/OwnerPanel";

const photos = [
"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1800&q=85",
"https://images.unsplash.com/photo-1585828922344-85c9daa264b0?auto=format&fit=crop&w=1600&q=85",
"https://images.unsplash.com/photo-1767713362918-d6db856570ba?auto=format&fit=crop&w=1600&q=85",
"https://images.unsplash.com/photo-1715443973096-c74f7a532324?auto=format&fit=crop&w=1400&q=85",
"https://images.unsplash.com/photo-1672596467694-65f215f9b5fa?auto=format&fit=crop&w=1400&q=85",
"https://images.unsplash.com/photo-1660950185000-294b2e3b002e?auto=format&fit=crop&w=1400&q=85"
];
const reviews=[["Zosia „Skitusi” Kułakowska","Przepyszna pizza neapolitańska, bardzo dobrej jakości składniki i cudowne ciasto!"],["Paula Wojcieszak","Kameralna pizzeria na Polance. Fajny klimat, stoliczki na zewnątrz i bardzo dobre ciasto."],["Kinga P","Bardzo smaczna pizza, miła obsługa."]];

export default function Home(){ const [owner,setOwner]=useState(false); const [menu,setMenu]=useState(false); return <main>
<header className="nav"><a href="#" className="logo">cucu<span>cina</span></a><nav className={menu?"open":""}><a href="#menu">Menu</a><a href="#story">O nas</a><a href="#gallery">Galeria</a><a href="#opinie">Opinie</a><a href="#kontakt">Kontakt</a></nav><a className="nav-order" href="tel:+48514055895">Zamów / 514 055 895</a><button className="menu-btn" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X/>:<Menu/>}</button></header>
<section className="hero"><div className="hero-copy"><div className="eyebrow"><span>●</span> POZNAŃ · POLANKA</div><h1>Pizza, która<br/><em>robi wieczór.</em></h1><p>Neapolitańskie ciasto, porządne składniki i ten moment, kiedy pierwszy kęs mówi wszystko.</p><div className="hero-actions"><a className="button dark" href="#menu">Zobacz menu <ArrowUpRight size={17}/></a><a className="text-link" href="https://www.google.com/maps/dir/?api=1&destination=Katowicka+81C%2C+61-131+Pozna%C5%84" target="_blank">Wyznacz trasę <ArrowUpRight size={16}/></a></div></div><div className="hero-art"><div className="stamp">NAPOLETANA<br/><b>•</b> POZNAŃ <b>•</b><br/>DAL 2024</div><div className="hero-photo"><Image src={photos[0]} alt="Neapolitańska pizza" fill priority sizes="(max-width: 800px) 100vw, 55vw"/></div><div className="hero-note">DOBRE CIASTO.<br/>ZERO NUDY.</div></div></section>
<div className="ticker"><span>NEAPOLITAŃSKA</span><span>•</span><span>RĘCZNIE FORMOWANA</span><span>•</span><span>FERMENTOWANA</span><span>•</span><span>PIEC 450°C</span><span>•</span><span>NEAPOLITAŃSKA</span></div>
<section className="intro" id="story"><div><div className="eyebrow">01 / O CUCUCINA</div><h2>Mała pizzeria.<br/><em>Dużo charakteru.</em></h2></div><div className="intro-text"><p>Cucucina to kameralna pizzeria na Polance, gdzie liczy się prosta rzecz: świetna pizza i dobra atmosfera.</p><p>Robimy ją po neapolitańsku. Ciasto ma czas, składniki mają smak, a piec robi resztę.</p><a className="text-link" href="#kontakt">Wpadnij do nas <ArrowUpRight size={16}/></a></div></section>
<MenuSection />
<section className="gallery-section" id="gallery"><div className="section-head"><div><div className="eyebrow">03 / GALERIA</div><h2>Tak to<br/><em>wygląda.</em></h2></div><p className="section-copy">Trochę pizzy, trochę wnętrza, dużo Cucucina.</p></div><Gallery initial={photos}/></section>
<section className="reviews" id="opinie"><div className="review-score"><div className="eyebrow">04 / OPINIE</div><div className="score">4,6</div><div className="stars">{[1,2,3,4,5].map(i=><Star key={i} fill="currentColor" size={18}/>)}</div><p>72 opinie w Google</p></div><div className="review-list">{reviews.map(([name,text])=><article key={name}><div className="quote">“</div><p>{text}</p><div className="reviewer"><strong>{name}</strong><span>Google · opinia klienta</span></div></article>)}</div></section>
<section className="contact" id="kontakt"><div className="contact-main"><div className="eyebrow">05 / WPADNIJ</div><h2>Pizza czeka.<br/><em>Ty też?</em></h2><div className="contact-grid"><div><MapPin/><span>Katowicka 81C<br/>61-131 Poznań</span></div><div><Phone/><a href="tel:+48514055895">514 055 895</a></div><div><Clock3/><span>Pon–Nd<br/>godziny warto sprawdzić przed wizytą</span></div></div><div className="hero-actions"><a className="button light" href="https://www.google.com/maps/dir/?api=1&destination=Katowicka+81C%2C+61-131+Pozna%C5%84" target="_blank">Wyznacz trasę <ArrowUpRight size={17}/></a></div></div><div className="map"><iframe title="Mapa dojazdu do Cucucina" src="https://www.google.com/maps?q=Katowicka%2081C,%20Pozna%C5%84&output=embed" loading="lazy"/></div></section>
<footer><div className="footer-brand"><span className="logo">cucu<span>cina</span></span><p>Pizza neapolitańska<br/>Poznań · Polanka</p></div><div className="footer-links"><a href="tel:+48514055895">514 055 895</a><a href="https://www.instagram.com/" target="_blank"><Instagram size={17}/> Instagram</a><button onClick={()=>setOwner(true)}>Panel właściciela</button></div><div className="copyright">© 2026 Cucucina Pizzeria · Katowicka 81C, Poznań</div></footer>
{owner&&<OwnerPanel onClose={()=>setOwner(false)}/>}</main> }
