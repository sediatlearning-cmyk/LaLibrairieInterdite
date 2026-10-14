import { BookModel } from "../models/Book-Model";

export async function getBooks(): Promise<BookModel[]> {
    const response = await fetch("/public/data/livres.json");

    if (!response.ok) throw new Error("Impossible de charger les livres");

    return await response.json() as BookModel[];
}