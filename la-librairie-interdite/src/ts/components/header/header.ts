import { changeRoute } from "../../router.js";
import { getNumberOfItemInCart } from "../../services/CartService.js";

function shopping() {
    changeRoute("panier")
}

let page: HTMLElement;

export async function Header(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/components/header/header.html");
    if (!response.ok) throw new Error("Impossible de charger le header");

    page = document.createElement("div");
    page.innerHTML = await response.text();
    page.querySelector("#cart-button")?.addEventListener("click", shopping)
    const numberItemHtmlElement: HTMLElement|null = page.querySelector(".number-of-item");
    return page.firstElementChild as HTMLElement;
}

export function updateQuantityCart(): void {
    const numberOfItemInCart = getNumberOfItemInCart()
    const numberItemHtmlElement: HTMLElement|null = document.querySelector(".number-of-item");
    if(!numberItemHtmlElement) console.error("cant find number item html element")
    if(numberOfItemInCart == 0) {
        numberItemHtmlElement?.classList.add("invisible")
    }else {
        numberItemHtmlElement?.classList.remove("invisible")
    }

    if(numberItemHtmlElement) numberItemHtmlElement.textContent = numberOfItemInCart.toString()
}