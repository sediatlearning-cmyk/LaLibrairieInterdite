import { changeRoute } from "../../router.js";

function shopping() {
    changeRoute("panier")
}

export async function Header(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/components/header/header.html");
    if (!response.ok) throw new Error("Impossible de charger le header");

    const page = document.createElement("div");
    page.innerHTML = await response.text();
    page.querySelector("#cart-button")?.addEventListener("click", shopping)
    return page.firstElementChild as HTMLElement;
}