import { book } from "../../components/book/book.js";
import { BookModel } from "../../models/Book-Model.js";
import { changeRoute } from "../../router.js";
import { getBooks } from "../../services/BookService.js";
export async function SingleBook(params?: object): Promise<HTMLElement> {
    console.log("Ouverture de ", params)
    if(params == undefined) {
        throw Error("No params this page required params");   
    }
    const book: BookModel = params as BookModel;
    const response = await fetch("/src/ts/pages/single-book/single-book.html");
    if (!response.ok) throw new Error("Impossible de charger la page d'accueil");

    const html = await response.text();
    const page = document.createElement("section");
    page.innerHTML = html;
    const title = page.querySelector(".title")
    if (title) title.textContent = book.title;
    const rarity = page.querySelector(".rarity");
    if(rarity) rarity.textContent = book.rarity;
    const detail = page.querySelector(".detail");
    if (detail) detail.textContent = book.detail
    return page;
}