"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";

export type MenuItem = { id: string; name: string; description: string; price: string };

export const defaultMenu: MenuItem[] = [
  { id: "mortadela-pistacjowa", name: "Mortadela Pistacjowa", description: "pistacja · mortadela · mozzarella", price: "34 zł" },
  { id: "margherita", name: "Margherita", description: "pomodoro · fior di latte · bazylia", price: "28 zł" },
  { id: "nduja", name: "Nduja", description: "pikantna nduja · mozzarella · miód", price: "33 zł" },
];

const KEY = "cucucina-menu";

export function readMenu(): MenuItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : defaultMenu;
  } catch {
    return defaultMenu;
  }
}

export function MenuSection() {
  const [items, setItems] = useState<MenuItem[]>(defaultMenu);

  useEffect(() => {
    setItems(readMenu());
    const onStorage = () => setItems(readMenu());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <section className="menu-section" id="menu">
      <div className="section-head">
        <div>
          <div className="eyebrow">02 / MENU</div>
          <h2>Krótko. Konkretnie.<br/><em>Do ostatniego kęsa.</em></h2>
        </div>
        <span className="price-note">40–60 zł / OSOBĘ</span>
      </div>
      <div className="dishes">
        {items.map((item, i) => (
          <article className="dish" key={item.id}>
            <span className="dish-no">{String(i + 1).padStart(2, "0")}</span>
            <div><h3>{item.name}</h3><p>{item.description}</p></div>
            <strong>{item.price}</strong>
          </article>
        ))}
      </div>
      <div className="menu-bottom">
        <p>Pełne menu dostępne na miejscu.</p>
        <a className="button outline" href="tel:+48514055895">Zamów telefonicznie <Phone size={16}/></a>
      </div>
    </section>
  );
}
