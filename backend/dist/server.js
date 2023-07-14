"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const initialBook = {
    id: 1,
    pages: 123,
    title: "Alicunde book",
    chapters: 5,
    authors: [1],
};
const initialAuthor = {
    id: 1,
    name: "Brayayin",
};
const books = [initialBook];
const authors = [initialAuthor];
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.post("/books", (req, res) => {
    const newBook = req.body;
    const { id, title, chapters, pages, authors: bookAuthors } = newBook;
    const existingBook = books.every((book) => book.id === id);
    if (existingBook) {
        return res.status(400).json({ error: "El libro ya existe." });
    }
    const nonExistentAuthors = bookAuthors.filter((authorId) => !authors.find((author) => author.id === authorId));
    if (nonExistentAuthors.length > 0) {
        return res.status(400).json({ error: "Algunos autores no existen." });
    }
    books.push(newBook);
    res.status(201).json(newBook);
});
app.get("/books", (_, res) => {
    const booksWithAuthors = books.map((book) => ({
        ...book,
        authors: book.authors.map((authorId) => authors.find((author) => author.id === authorId)),
    }));
    res.json(booksWithAuthors);
});
app.post("/authors", (req, res) => {
    const newAuthor = req.body;
    const { id } = newAuthor;
    const existingAuthor = authors.find((author) => author.id === id);
    if (existingAuthor) {
        return res.status(400).json({ error: "El autor ya existe." });
    }
    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});
app.get("/authors", (_, res) => {
    const authorsWithBooks = authors.map((author) => ({
        ...author,
        books: books.filter((book) => book.authors.includes(author.id)),
    }));
    res.json(authorsWithBooks);
});
app.get("/books/:id/average", (req, res) => {
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
