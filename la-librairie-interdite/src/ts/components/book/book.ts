import { BookModel } from "../../models/Book-Model";

export async function book(book:BookModel): Promise<HTMLElement> {
    const response = await fetch("/src/ts/components/book/book.html");
    if (!response.ok) throw new Error("Impossible de charger le header");

    const html = await response.text();
    const page = document.createElement("section");
    page.innerHTML = html;
    const title = page.querySelector(".book-title");
    if (title) title.textContent = book.title;
    return page;
}
