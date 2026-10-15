
import { book } from "../../components/book/book.js";
import { BookModel } from "../../models/Book-Model.js";
import { getAllRarities, getBooks, getMinimumMaxPrice } from "../../services/BookService.js";

export async function Home(): Promise<HTMLElement> {
    const response = await fetch("/src/ts/pages/home/home.html");
    if (!response.ok) throw new Error("Impossible de charger la page d'accueil");

    const page = document.createElement("section");
    page.innerHTML = await response.text();

    const listBooks: BookModel[] = await getBooks();
    const currentFilters = new Map<string, boolean>();
    const [min, max] = await getMinimumMaxPrice();

    let currentMinPrice = min;
    let currentMaxPrice = max;
    let renderId = 0;

    const booksContainer = page.querySelector<HTMLElement>("#books")!;
    const raritiesContainer = page.querySelector<HTMLElement>(".rarities")!;
    const minPrice = page.querySelector<HTMLInputElement>("#min-price")!;
    const maxPrice = page.querySelector<HTMLInputElement>("#max-price")!;
    const minValue = page.querySelector<HTMLElement>("#min-value")!;
    const maxValue = page.querySelector<HTMLElement>("#max-value")!;
    const progress = page.querySelector<HTMLElement>("#price-progress")!;

    // Affichage des livres filtrés
    async function redisplayAllBooks(): Promise<void> {
        const id = ++renderId;

        const filteredBooks = listBooks.filter(book =>
            currentFilters.get(book.rarity) === true &&
            book.price >= currentMinPrice &&
            book.price <= currentMaxPrice
        );

        const elements = await Promise.all(filteredBooks.map(book));

        // Ignore les anciens rendus
        if (id !== renderId) return;

        booksContainer.replaceChildren(...elements);
    }

    // Filtres par rareté
    const allRarities = await getAllRarities();

    for (const rarity of allRarities) {
        currentFilters.set(rarity, true);

        const label = document.createElement("label");
        label.classList.add("flex", "items-center", "gap-2", "text-text-grey", "cursor-pointer");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.value = rarity;
        input.checked = true;

        label.append(input, document.createTextNode(rarity));
        raritiesContainer.appendChild(label);

        input.addEventListener("change", () => {
            currentFilters.set(rarity, input.checked);
            void redisplayAllBooks();
        });
    }

    // Initialisation des prix
    [minPrice, maxPrice].forEach(input => {
        input.min = String(min);
        input.max = String(max);
    });

    minPrice.value = String(min);
    maxPrice.value = String(max);

    function updatePriceRange(): void {
        currentMinPrice = Number(minPrice.value);
        currentMaxPrice = Number(maxPrice.value);

        const range = max - min;

        minValue.textContent = `${currentMinPrice} €`;
        maxValue.textContent = `${currentMaxPrice} €`;

        progress.style.left = `${range ? ((currentMinPrice - min) / range) * 100 : 0}%`;
        progress.style.width = `${range ? ((currentMaxPrice - currentMinPrice) / range) * 100 : 100}%`;

        void redisplayAllBooks();
    }

    minPrice.addEventListener("input", () => {
        if (Number(minPrice.value) > Number(maxPrice.value)) {
            minPrice.value = maxPrice.value;
        }
        updatePriceRange();
    });

    maxPrice.addEventListener("input", () => {
        if (Number(maxPrice.value) < Number(minPrice.value)) {
            maxPrice.value = minPrice.value;
        }
        updatePriceRange();
    });

    updatePriceRange();

    return page;
}
