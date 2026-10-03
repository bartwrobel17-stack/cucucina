import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Cucucina Pizzeria | Pizza neapolitańska w Poznaniu", description: "Cucucina Pizzeria na Polance w Poznaniu. Pizza neapolitańska, dobre składniki i kameralny klimat.", metadataBase: new URL("https://cucucina.vercel.app"), alternates: { canonical: "/" }, openGraph: { title: "Cucucina Pizzeria", description: "Pizza neapolitańska na Polance w Poznaniu.", type: "website" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pl"><body>{children}</body></html>; }