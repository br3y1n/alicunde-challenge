"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const author_1 = __importDefault(require("./routes/author"));
const book_1 = __importDefault(require("./routes/book"));
const average_1 = __importDefault(require("./routes/average"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(author_1.default);
app.use(book_1.default);
app.use(average_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
