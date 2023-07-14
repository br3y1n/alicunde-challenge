import express, { Request, Response } from "express";
import bodyParser from "body-parser";

interface Book {
  id: number;
  title: string;
  chapters: number;
  pages: number;
  authors: number[];
}

interface Author {
  id: number;
  name: string;
}

const initialBook: Book = {
  id: 1,
  pages: 123,
  title: "Alicunde book",
  chapters: 5,
  authors: [1],
};
const initialAuthor: Author = {
  id: 1,
  name: "Brayayin",
};
const books: Book[] = [initialBook];
const authors: Author[] = [initialAuthor];

const app = express();
app.use(bodyParser.json());

app.post("/books", (req: Request, res: Response) => {
  const newBook = req.body as Book;
  const { id, title, chapters, pages, authors: bookAuthors } = newBook;
  const existingBook = books.every((book) => book.id === id);

  if (existingBook) {
    return res.status(400).json({ error: "El libro ya existe." });
  }

  const nonExistentAuthors = bookAuthors.filter(
    (authorId) => !authors.find((author) => author.id === authorId)
  );

  if (nonExistentAuthors.length > 0) {
    return res.status(400).json({ error: "Algunos autores no existen." });
  }

  books.push(newBook);

  res.status(201).json(newBook);
});

app.get("/books", (_: Request, res: Response) => {
  const booksWithAuthors = books.map((book) => ({
    ...book,
    authors: book.authors.map((authorId) =>
      authors.find((author) => author.id === authorId)
    ),
  }));

  res.json(booksWithAuthors);
});

app.post("/authors", (req: Request, res: Response) => {
  const newAuthor = req.body as Author;
  const { id } = newAuthor;
  const existingAuthor = authors.find((author) => author.id === id);

  if (existingAuthor) {
    return res.status(400).json({ error: "El autor ya existe." });
  }

  authors.push(newAuthor);

  res.status(201).json(newAuthor);
});

app.get("/authors", (_: Request, res: Response) => {
  const authorsWithBooks = authors.map((author) => ({
    ...author,
    books: books.filter((book) => book.authors.includes(author.id)),
  }));

  res.json(authorsWithBooks);
});

app.get("/books/:id/average", (req: Request, res: Response) => {
  const { id } = req.params;

  const book = books.find((book) => book.id === Number(id));
  if (!book) {
    return res.status(404).json({ error: "El libro no existe." });
  }

  const averagePagesPerChapter = (book.pages / book.chapters).toFixed(2);

  res.json({ id, averagePagesPerChapter });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
