import { book } from "../../components/book/book.js";
export async function Home(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/pages/home/home.html");
    if (!response.ok) throw new Error("Impossible de charger la page d'accueil");

    const html = await response.text();
    const bok = await book({isbn:1, title: "Grimoire des éléments", rarity:"Commun", detail:"detail", price: 149, image:"", description: "" })
    const bok2 = await book({isbn:2, title: "Les Arcanes Oubliées", rarity:"Rare", detail:"detail", price: 100, image:"", description: "" })
    const page = document.createElement("section");
    page.innerHTML = html;
    page.querySelector('#books')?.appendChild(bok);
    page.querySelector('#books')?.appendChild(bok2);
    return page;
}