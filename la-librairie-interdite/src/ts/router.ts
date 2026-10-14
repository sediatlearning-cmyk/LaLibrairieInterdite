import { Home } from "./pages/home/home.js";
import { Panier } from "./pages/panier/panier.js";

const routes: Record<string, () => Promise<HTMLElement>> = {
    "home": Home,
    "panier": Panier,
};
let currentRoute:string = "panier"

async function display(){
    let content = document.getElementById("content");
    if(!content){
        console.error("Impossible de trouver l'element content");
        return;
    }
    const page: HTMLElement = await routes[currentRoute]();
    content.replaceChildren(page);
}

display()

