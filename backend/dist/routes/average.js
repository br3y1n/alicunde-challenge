"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../data");
const AVERAGE_ROUTE = "/books/:id/average";
const route = express_1.default.Router();
route.get(AVERAGE_ROUTE, (req, res) => {
    const { id } = req.params;
    const book = data_1.books.find((book) => book.id === Number(id));
    if (!book) {
        return res.status(404).json({ error: "El libro no existe." });
    }
    const average = (book.pages / book.chapters).toFixed(2);
    res.json({ id, average });
});
exports.default = route;
