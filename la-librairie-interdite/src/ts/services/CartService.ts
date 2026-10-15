import { updateQuantityCart } from "../components/header/header.js";
import { BookModel } from "../models/Book-Model.js";
import { getBooks } from "./BookService.js";


export function addToCart(book: BookModel, quantity: number): void {
    const cart: Map<number, number> = getRawCart();
    if(quantity != 0) {
        cart.set(book.isbn, quantity)
    }
    saveRawCart(cart)
    updateQuantityCart()
}

function saveRawCart(cart: Map<number, number>): void {
    localStorage.setItem("cart", JSON.stringify([...cart]));
}
function getRawCart(): Map<number, number> {
    const cart = localStorage.getItem("cart");
    const map = cart ? new Map<number, number>(JSON.parse(cart)) : new Map<number, number>();
    return map;
}

function clearStorage(){
    localStorage.removeItem("cart");
}

export function getNumberOfItemInCart(): number {
    return getRawCart().size;
}

export async function getBooksInCart(): Promise<{ book: BookModel; quantity: number }[]> {
    const result: { book: BookModel; quantity: number }[] = [];
    const allBooks = await getBooks();
    const rawCart = getRawCart();

    for (const [isbn, quantity] of rawCart.entries()) {
        const book = allBooks.find(book => book.isbn === isbn);
        if (book) result.push({ book, quantity });
    }

    return result;
}

export function removeBookFromCart(book: BookModel): void {
    let rawCart = getRawCart();
    if(rawCart.has(book.isbn)) {
        rawCart.delete(book.isbn);
        saveRawCart(rawCart);
        updateQuantityCart();
    }else {
        console.warn("Cannot delete a book that is not in the shopping cart");
    }
}