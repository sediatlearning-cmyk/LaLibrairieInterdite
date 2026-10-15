import { BookModel } from "../../models/Book-Model.js";
import { addToCart, removeBookFromCart } from "../../services/CartService.js";
import { ImageBook } from "../image-book/image-book.js";

export async function bookCart(update: () => Promise<void>,updatePriceTotal: () => Promise<void>, book:BookModel, quantity: number): Promise<HTMLElement> {
    const response = await fetch("/src/ts/components/book-cart/book-cart.html");
    if (!response.ok) throw new Error("Impossible de charger le header");

    const html = await response.text();
    const element: HTMLElement = new DOMParser()
    .parseFromString(html, "text/html").body.firstElementChild as HTMLElement;
    const title = element.querySelector(".book-title");
    if (title) title.textContent = book.title;
    const price = element.querySelector(".price")
    if(price) price.textContent = book.price.toString() + "€"
    const imageHolder = element.querySelector(".image-holder")
    const bookimage = await ImageBook(book.image)
    if(imageHolder) imageHolder.appendChild(bookimage);


    /* Quantity value */
    const quantityInput = element.querySelector<HTMLInputElement>("#quantite")!;
    const plusButton = element.querySelector(".plus-button");
    const minusButton = element.querySelector(".minus-button");
    function clampQuantityValue() {
        quantityInput.value = String(Math.max(1, Math.min(10, Number(quantityInput.value) || 1)));
        addToCart(book, Number(quantityInput.value));
        updatePriceTotal()
    }
    quantityInput.addEventListener("change", () => {
        clampQuantityValue();
    });


    plusButton?.addEventListener("click", () => {
        if (quantityInput) quantityInput.value = String(Number(quantityInput.value) + 1);
        clampQuantityValue();
    })


    minusButton?.addEventListener("click", () => {
        if (quantityInput) quantityInput.value = String(Number(quantityInput.value) - 1);
        clampQuantityValue();
    })
    quantityInput.value = String(quantity)

    /* Delete button */
    const deleteButton = element.querySelector(".delete");
    deleteButton?.addEventListener("click", () => {
        removeBookFromCart(book);
        element.innerHTML = "";
        update();
    })
    return element;
}
