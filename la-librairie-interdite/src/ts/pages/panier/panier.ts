import { bookCart } from "../../components/book-cart/book-cart.js";
import { getBooksInCart } from "../../services/CartService.js";

export async function Panier(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/pages/panier/panier.html");
    if (!response.ok) throw new Error("Impossible de charger le panier");

    const html = await response.text();
   
    const page = document.createElement("section");
    page.innerHTML = html;

    async function update() {
        const booksParentHtml = page.querySelector("#books")
        const allBookCart = await getBooksInCart();
        booksParentHtml?.replaceChildren("");
        if(allBookCart.length == 0) {
            const nombreElementPanierHtml = page.querySelector(".nombre-element-panier");
            nombreElementPanierHtml!.textContent = "le panier est vide";
        }
        else {
            for(const bookAndQuantity of allBookCart) {
                const newBook = await bookCart(update, updatePriceTotal,bookAndQuantity.book, bookAndQuantity.quantity);
                booksParentHtml?.appendChild(newBook);
            }

            const nombreElementPanierHtml = page.querySelector(".nombre-element-panier");
            nombreElementPanierHtml!.textContent = allBookCart.length + " ouvrages dans le panier"
        }

        updatePriceTotal();
    }
    async function updatePriceTotal(){
        let prixTotal = 0;
        const allBookCart = await getBooksInCart();
        for(const bookAndQuantity of allBookCart) {
            prixTotal += bookAndQuantity.quantity * bookAndQuantity.book.price;
        }
        const prixTotalHtml = page.querySelector("#total");
        prixTotalHtml!.textContent = prixTotal.toString();
    }
    await update();
    return page;
}