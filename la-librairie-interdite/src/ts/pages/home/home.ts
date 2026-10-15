import { book } from "../../components/book/book.js";
import { BookModel } from "../../models/Book-Model.js";
import { getAllRarities, getBooks, getMinimumMaxPrice } from "../../services/BookService.js";

let currentFilters: Map<string, boolean>;
const listBooks: BookModel[] = await getBooks()
export async function Home(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/pages/home/home.html");
    if (!response.ok) throw new Error("Impossible de charger la page d'accueil");


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
    currentFilters = new Map<string, boolean>;
    for (const rarity of allRarites) {
        currentFilters.set(rarity, true)
        const rarityHtmlElement = document.createElement("label");
        rarityHtmlElement.classList.add("flex", "items-center", "gap-2", "text-text-grey", "cursor-pointer");

        const inputHtmlElement = document.createElement("input");
        inputHtmlElement.type = "checkbox";
        inputHtmlElement.value = rarity;
        inputHtmlElement.checked = true;

        rarityHtmlElement.appendChild(inputHtmlElement);
        rarityHtmlElement.appendChild(document.createTextNode(rarity));
        raritiesHtmlElement.appendChild(rarityHtmlElement);

        inputHtmlElement.addEventListener("change", () => {
            const isChecked = inputHtmlElement.checked;
            currentFilters.set(rarity, isChecked);
            redisplayAllBooks();
        });
    }
    }
    return page;
}

async function redisplayAllBooks() {
    const filteredBooks = listBooks.filter(book => currentFilters.get(book.rarity));

    const booksContainer = document.querySelector('#books');
    if (!booksContainer) return;

    booksContainer.replaceChildren();

    for (const abook of filteredBooks) {
        const bookObject = await book(abook);
        booksContainer.appendChild(bookObject);
    }
}