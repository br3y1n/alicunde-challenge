import express, { Request, Response } from "express";
import { books } from "../data";

const AVERAGE_ROUTE = "/books/:id/average";
const route = express.Router();

route.get(AVERAGE_ROUTE, (req: Request, res: Response) => {
  const { id } = req.params;

  const book = books.find((book) => book.id === Number(id));
  if (!book) {
    return res.status(404).json({ error: "El libro no existe." });
  }

  const average = (book.pages / book.chapters).toFixed(2);

  res.json({ id, average });
});

export default route;
