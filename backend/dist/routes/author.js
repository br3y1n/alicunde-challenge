"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../data");
const AUTHOR_ROUTE = "/authors";
const authorRoute = express_1.default.Router();
authorRoute.post(AUTHOR_ROUTE, ({ body: newAuthor }, res) => {
    const { id } = newAuthor;
    const existingAuthor = data_1.authors.some((author) => author.id === id);
    if (existingAuthor) {
        return res.status(400).json({ error: "El autor ya existe." });
    }
    data_1.authors.push(newAuthor);
    res.status(201).json(newAuthor);
});
authorRoute.get(AUTHOR_ROUTE, (_, res) => {
    const authorsWithBooks = data_1.authors.map((author) => ({
        ...author,
        books: data_1.books.filter((book) => book.authors.includes(author.id)),
    }));
    res.json(authorsWithBooks);
});
exports.default = authorRoute;
