import { bookCart } from "../../components/book-cart/book-cart.js";
import { getBooksInCart } from "../../services/CartService.js";

export async function Panier(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/pages/panier/panier.html");
    if (!response.ok) throw new Error("Impossible de charger le panier");

    const html = await response.text();
   
    const page = document.createElement("section");
    page.innerHTML = html;

    const allBookCart = await getBooksInCart();
    console.log(allBookCart);
    const booksParentHtml = page.querySelector("#books")
    for(const bookAndQuantity of allBookCart) {
        const newBook = await bookCart(bookAndQuantity.book, bookAndQuantity.quantity);
        booksParentHtml?.appendChild(newBook);
    }
    return page;
}