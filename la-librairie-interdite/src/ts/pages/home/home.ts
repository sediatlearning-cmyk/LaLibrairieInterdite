import { book } from "../../components/book/book.js";
import { BookModel } from "../../models/Book-Model.js";
import { getBooks } from "../../services/BookService.js";
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
    return page;
}