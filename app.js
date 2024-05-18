import express from "express";

import { corsMiddleware } from "./middleware/cors.js";
import { createMovieRouter } from "./router/router.js";

import { MovieModel } from "./models/mysql/mysqlModel.js";

const app = express();
const port = 3000;
const desiredPort = process.env.PORT ?? port;

//middleware
app.use(corsMiddleware());
app.use(express.json());
//routes

app.use("/movies", createMovieRouter({ modelIn: MovieModel }));

app.listen(desiredPort, () => {
  console.log(`Example app listening on port http://localhost:${desiredPort}`);
});
