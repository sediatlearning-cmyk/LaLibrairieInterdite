import { book } from "../../components/book/book.js";
import { BookModel } from "../../models/Book-Model.js";
import { getAllRarities, getBooks } from "../../services/BookService.js";
export async function Home(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/pages/home/home.html");
    if (!response.ok) throw new Error("Impossible de charger la page d'accueil");

    const listBooks: BookModel[] = await getBooks()
    const html = await response.text();
    const page = document.createElement("section");
    page.innerHTML = html;
    for (const cbook of listBooks) {
        const bookObject = await book(cbook)
        page.querySelector('#books')?.appendChild(bookObject);
    }
    const allRarites: string[] = await getAllRarities();
    const raritiesHtmlElement = page.querySelector(".rarities")
    if (raritiesHtmlElement == null) {
        throw new Error("rarities filter doesnt exist")
    }
    for (const rarity of allRarites) {
        const rarityHtmlElement = document.createElement("label");
        rarityHtmlElement.classList.add("flex", "items-center", "gap-2", "text-text-grey", "cursor-pointer");

        const inputHtmlElement = document.createElement("input");
        inputHtmlElement.type = "checkbox";
        inputHtmlElement.value = rarity;

        rarityHtmlElement.appendChild(inputHtmlElement);
        rarityHtmlElement.appendChild(document.createTextNode(rarity));
        raritiesHtmlElement.appendChild(rarityHtmlElement);
    }
    return page;
}