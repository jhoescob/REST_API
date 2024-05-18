import { validateMovie, validatePartialMovie } from "../schemas-zod/movies.js";

export class Controller {
  constructor({ model }) {
    this.model = model;
  }

  getAll = async (req, res) => {
    const movies = await this.model.getAll();
    res.status(200).json(movies);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const movie = await this.model.getById({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
  };

  create = async (req, res) => {
    //zod validation
    const result = validateMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const movies = await this.model.create({ input: result.data });
    res.json(movies);
  };

  delete = async (req, res) => {
    const { id } = req.query;

    const result = await this.model.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.json({ message: "Movie deleted" });
  };

  update = async (req, res) => {
    //zod validation
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedMovie = await this.model.update({ id, input: result.data });

    return res.json(updatedMovie);
  };
}
