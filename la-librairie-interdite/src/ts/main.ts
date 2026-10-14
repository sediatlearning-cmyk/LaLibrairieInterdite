import { Header } from "./components/header/header.js";

async function main(): Promise<void> {
    const headerContainer = document.querySelector("#header");
    if (!headerContainer) return;

    headerContainer.appendChild(await Header());
}
main();