"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../data");
const BOOK_ROUTE = "/books";
const bookRoute = express_1.default.Router();
bookRoute.post(BOOK_ROUTE, ({ body: newBook }, res) => {
    const { id, authors: bookAuthors } = newBook;
    const existingBook = data_1.books.some((book) => book.id === id);
    if (existingBook) {
        return res.status(400).json({ error: "El libro ya existe." });
    }
    const nonExistentAuthors = bookAuthors.some((authorId) => !data_1.authors.some((author) => author.id === authorId));
    if (nonExistentAuthors) {
        return res.status(400).json({ error: "Algunos autores no existen." });
    }
    data_1.books.push(newBook);
    res.status(201).json(newBook);
});
bookRoute.get(BOOK_ROUTE, (_, res) => {
    const booksWithAuthors = data_1.books.map((book) => {
        const authorsMapped = book.authors.map((authorId) => data_1.authors.find((author) => author.id === authorId));
        return { ...book, authors: authorsMapped };
    });
    res.json(booksWithAuthors);
});
exports.default = bookRoute;
