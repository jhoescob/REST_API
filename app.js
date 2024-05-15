const express = require("express");
var cors = require("cors");
const data = require("./data");
const app = express();

const { validateMovie, validatePartialMovie } = require("./schemas-zod/movies");

const port = 3000;
const desiredPort = process.env.PORT ?? port;

//middleware

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:1234",
        "https://movies.com",
        "https://midu.dev",
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());

//methods
app.get("/", (req, res) => {
  res.status(200).json(data);
});

//Find ID
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  const movie = data.find((data) => data.id === id);

  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

//filter Gender
app.get("/movies", (req, res) => {
  const { gender } = req.query;

  if (gender) {
    const movie = data.filter((data) =>
      data.genre.some((g) => g.toLowerCase() === gender.toLowerCase())
    );
    return res.json(movie);
  }
});

app.post("/api", (req, res) => {
  console.log("req.body", req.body);
  const result = validateMovie(req.body);

  console.log("result", result);

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  res.status(200).json({ message: "Movie added" });
});
app.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});
app.listen(desiredPort, () => {
  console.log(`Example app listening on port http://localhost:${desiredPort}`);
});
