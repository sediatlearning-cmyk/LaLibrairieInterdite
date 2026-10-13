export async function Home(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/pages/home/home.html");
    if (!response.ok) throw new Error("Impossible de charger la page d'accueil");

    const html = await response.text();
    const page = document.createElement("section");
    page.innerHTML = html;
    return page;
}