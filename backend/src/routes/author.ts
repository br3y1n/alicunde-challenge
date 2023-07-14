import express, { Request, Response } from "express";
import { authors, books } from "../data";
import { Author } from "../entities";

const AUTHOR_ROUTE = "/authors";
const authorRoute = express.Router();

authorRoute.post(
  AUTHOR_ROUTE,
  (
    { body: newAuthor }: Request<undefined, undefined, Author>,
    res: Response
  ) => {
    const { id } = newAuthor;
    const existingAuthor = authors.some((author) => author.id === id);

    if (existingAuthor) {
      return res.status(400).json({ error: "El autor ya existe." });
    }

    authors.push(newAuthor);

    res.status(201).json(newAuthor);
  }
);

authorRoute.get(AUTHOR_ROUTE, (_: Request, res: Response) => {
  const authorsWithBooks = authors.map((author) => ({
    ...author,
    books: books.filter((book) => book.authors.includes(author.id)),
  }));

  res.json(authorsWithBooks);
});

export default authorRoute;
