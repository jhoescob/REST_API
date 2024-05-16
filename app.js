import express from "express";
import { moviesRouter } from "./router/router.js";
import { corsMiddleware } from "./middleware/cors.js";

const app = express();
const port = 3000;
const desiredPort = process.env.PORT ?? port;

//middleware
app.use(corsMiddleware());
app.use(express.json());
//routes
app.use("/movies", moviesRouter);

app.listen(desiredPort, () => {
  console.log(`Example app listening on port http://localhost:${desiredPort}`);
});
