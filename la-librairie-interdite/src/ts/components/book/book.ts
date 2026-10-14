import { BookModel } from "../../models/Book-Model";

export async function book(book:BookModel): Promise<HTMLElement> {
    const response = await fetch("/src/ts/components/book/book.html");
    if (!response.ok) throw new Error("Impossible de charger le header");

    const html = await response.text();
    const element: HTMLElement = new DOMParser()
    .parseFromString(html, "text/html").body.firstElementChild as HTMLElement;
    const title = element.querySelector(".book-title");
    if (title) title.textContent = book.title;
    const price = element.querySelector(".price")
    if(price) price.textContent = book.price.toString()
    const rarity = element.querySelector(".rarity")
    if(rarity) rarity.textContent = book.rarity
    return element;
}
