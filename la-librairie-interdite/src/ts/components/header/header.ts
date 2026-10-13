export async function Header(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/components/header/header.html");
    if (!response.ok) throw new Error("Impossible de charger le header");

    const html = await response.text();
    const document = new DOMParser().parseFromString(html, "text/html");
    const template = document.querySelector<HTMLTemplateElement>("#header-template");

    if (!template) throw new Error("Template header introuvable");

    const header = template.content.firstElementChild?.cloneNode(true) as HTMLElement;

    header.querySelector("#cart-button")?.addEventListener("click", () => {
        alert("Ouverture du panier");
    });

    return header;
}

Header()