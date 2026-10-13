import { Home } from "./pages/home/home.js";

const routes: Record<string, () => Promise<HTMLElement>> = {
    "home": Home,
};
let currentRoute:string = "home"

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

