import express, { Request, Response } from "express";
import { Book } from "../entities";
import { books, authors } from "../data";

const BOOK_ROUTE = "/books";
const bookRoute = express.Router();

bookRoute.post(
  BOOK_ROUTE,
  ({ body: newBook }: Request<undefined, undefined, Book>, res: Response) => {
    const { id, authors: bookAuthors } = newBook;
    const existingBook = books.some((book) => book.id === id);

    if (existingBook) {
      return res.status(400).json({ error: "El libro ya existe." });
    }

    const nonExistentAuthors = bookAuthors.some(
      (authorId) => !authors.some((author) => author.id === authorId)
    );

    if (nonExistentAuthors) {
      return res.status(400).json({ error: "Algunos autores no existen." });
    }

    books.push(newBook);

    res.status(201).json(newBook);
  }
);

bookRoute.get(BOOK_ROUTE, (_: Request, res: Response) => {
  const booksWithAuthors = books.map((book) => {
    const authorsMapped = book.authors.map((authorId) =>
      authors.find((author) => author.id === authorId)
    );

    return { ...book, authors: authorsMapped };
  });

  res.json(booksWithAuthors);
});

export default bookRoute;
