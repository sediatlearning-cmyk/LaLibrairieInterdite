import { Home } from "./pages/home/home.js";
import { SingleBook } from "./pages/single-book/single-book.js";
import { Panier } from "./pages/panier/panier.js";

const routes: Record<string, (params?: object) => Promise<HTMLElement>> = {
    "home": Home,
    "singlebook": SingleBook,
    "panier": Panier
};
let currentRoute:string = "home"
let currentParams: object | undefined
export async function changeRoute(route: string, params?: object) {
    currentRoute = route;
    currentParams = params;
    await display()
}

async function display(){
    let content = document.getElementById("content");
    if(!content){
        console.error("Impossible de trouver l'element content");
        return;
    }
    if(routes[currentRoute] == null) {
        console.error("cant find "+ currentRoute)
        return;
    }
    let page: HTMLElement;
    if(currentParams == undefined) {
        page = await routes[currentRoute]();
    } else {
        page = await routes[currentRoute](currentParams);
    }
    content.replaceChildren(page);
}

display()

