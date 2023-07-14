import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import authorRoute from "./routes/author";
import bookRoute from "./routes/book";
import averageRoute from "./routes/average";

const app = express();
app.use(bodyParser.json());
app.use(authorRoute);
app.use(bookRoute);
app.use(averageRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
