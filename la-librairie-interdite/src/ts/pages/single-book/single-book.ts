import { ImageBook } from "../../components/image-book/image-book.js";
import { BookModel } from "../../models/Book-Model.js";

export async function SingleBook(params?: object): Promise<HTMLElement> {
    console.log("Ouverture de ", params)
    if(params == undefined) {
        throw Error("No params this page required params");   
    }
    const book: BookModel = params as BookModel;
    const response = await fetch("/src/ts/pages/single-book/single-book.html");
    if (!response.ok) throw new Error("Impossible de charger la page d'accueil");

    const html = await response.text();
    const page = document.createElement("section");
    page.innerHTML = html;
    const title = page.querySelector(".title")
    if (title) title.textContent = book.title;
    const rarity = page.querySelector(".rarity");
    if(rarity) rarity.textContent = book.rarity;
    const detail = page.querySelector(".detail");
    if (detail) detail.textContent = book.detail
    const bookImage = page.querySelector(".book-image");
    const generatedBookImage = await ImageBook(book.image);
    if(bookImage) bookImage.appendChild(generatedBookImage);
    const originalImage = page.querySelector<HTMLImageElement>(".orignal-image");
    if(originalImage) originalImage.src = "/src/assets/images/" + book.image;
    const selectedImage = page.querySelector(".selected-image")
    if(selectedImage == null){
        throw Error("Selected image cannot be null")
    }
    page.querySelector(".buttonBookImage")?.addEventListener("click", () => {
        const copyGeneratedImage = generatedBookImage.cloneNode(true);
        selectedImage.replaceChildren(copyGeneratedImage);
        page.querySelector(".buttonBookImage")?.classList.add("selected")
        page.querySelector(".buttonOriginalImage")?.classList.remove("selected")
    });
    page.querySelector(".buttonOriginalImage")?.addEventListener("click", () => {
        const image = document.createElement("img");
        image.classList.add("w-full", "h-full")
        image.src = "/src/assets/images/" + book.image;
        selectedImage.replaceChildren(image)
        page.querySelector(".buttonOriginalImage")?.classList.add("selected")
        page.querySelector(".buttonBookImage")?.classList.remove("selected")
    });
    const copyGeneratedImage = generatedBookImage.cloneNode(true);
    selectedImage.replaceChildren(copyGeneratedImage);
    page.querySelector(".buttonBookImage")?.classList.add("selected")
    page.querySelector(".buttonOriginalImage")?.classList.remove("selected")
    return page;
}