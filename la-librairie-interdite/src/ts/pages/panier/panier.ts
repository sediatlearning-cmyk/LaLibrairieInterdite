import { book } from "../../components/book/book";

export async function Panier(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/pages/panier/panier.html");
    if (!response.ok) throw new Error("Impossible de charger le panier");

    const html = await response.text();
   
    const page = document.createElement("section");
    page.innerHTML = html;

    return page;
}