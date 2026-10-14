import { updateQuantityCart } from "../components/header/header.js";
import { BookModel } from "../models/Book-Model";


export function addToCart(book: BookModel, quantity: number): void {
    const cart: Map<number, number> = getRawCart();
    if(cart.has(book.isbn)) {
        console.warn("Already in shopping cart update to new quantity")
    }
    if(quantity != 0) {
        cart.set(book.isbn, quantity)
        updateQuantityCart()
    }
    saveRawCart(cart)
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