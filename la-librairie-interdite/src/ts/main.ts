import { Header } from "./components/header/header.js";

const button = document.querySelector<HTMLButtonElement>("#btn");

button?.addEventListener("click", () => {
  alert("TypeScript fonctionne !");
});

async function main(): Promise<void> {
    const headerContainer = document.querySelector("#header");
    if (!headerContainer) return;

    headerContainer.appendChild(await Header());
}
main();