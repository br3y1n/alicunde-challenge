import { Book } from "../entities";

const initialBook: Book = {
  id: 1,
  pages: 123,
  title: "Alicunde book",
  chapters: 5,
  authors: [1],
};

const books: Book[] = [initialBook];

export { books };
