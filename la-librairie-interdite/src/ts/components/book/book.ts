import { BookModel } from "../../models/Book-Model";
import { changeRoute } from "../../router.js";
import { ImageBook } from "../image-book/image-book.js";

export async function book(book:BookModel): Promise<HTMLElement> {
    const response = await fetch("/src/ts/components/book/book.html");
    if (!response.ok) throw new Error("Impossible de charger le header");

    const html = await response.text();
    const element: HTMLElement = new DOMParser()
    .parseFromString(html, "text/html").body.firstElementChild as HTMLElement;
    const title = element.querySelector(".book-title");
    if (title) title.textContent = book.title;
    const price = element.querySelector(".price")
    if(price) price.textContent = book.price.toString() + "€"
    const rarity = element.querySelector(".rarity")
    if(rarity) rarity.textContent = book.rarity
    const imageHolder = element.querySelector<HTMLImageElement>(".image-holder")
    const bookimage = await ImageBook(book.image)
    if(imageHolder) imageHolder.appendChild(bookimage);
    const bouttonBook = element.querySelector(".book-button")
    bouttonBook?.addEventListener('click', function() {
        console.log("Je suis le livre "+ book.isbn +" et jai ete cliquer")
        changeRoute('singlebook', book)
    })
    return element;
}
