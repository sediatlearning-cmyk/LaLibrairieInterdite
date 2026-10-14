export async function ImageBook(bookImg: string): Promise<HTMLElement> {
    const response = await fetch("/src/ts/components/image-book/image-book.html");
    if (!response.ok) throw new Error("Impossible de charger le header");

    const html = await response.text();
    const element: HTMLElement = new DOMParser()
    .parseFromString(html, "text/html").body.firstElementChild as HTMLElement;

    const imageHolder = element.querySelector<HTMLImageElement>(".image-holder")
    if(imageHolder) imageHolder.src = "/src/assets/images/" + bookImg;

    return element;
}