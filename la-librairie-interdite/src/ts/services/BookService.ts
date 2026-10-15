import { BookModel } from "../models/Book-Model";

export async function getBooks(): Promise<BookModel[]> {
    const response = await fetch("/public/data/livres.json");

    if (!response.ok) throw new Error("Impossible de charger les livres");

    return await response.json() as BookModel[];
}

export async function getAllRarities(): Promise<string[]> {
    const allBooks = await getBooks();
    return [...new Set(allBooks.map(book => book.rarity))];
}

export async function getMinimumMaxPrice(): Promise<number[]> {
    const allBooks = await getBooks();
    const min = Math.min(...allBooks.map(book => book.price));
    const max = Math.max(...allBooks.map(book => book.price));
    return [min,max]
}