import pool from "./dbConfig.js";

export class MovieModel {
  static async getAll() {
    const [movies] = await pool.query(
      "SELECT id, title,year, director, duration, poster,rate FROM movies;"
    );
    return movies;
  }

  static async getById({ id }) {
    const [movies] = await pool.query(
      `SELECT title, year, director, duration, poster, rate, id
          FROM movies WHERE id = ?;`,
      [id]
    );

    if (movies.length === 0) return null;

    return movies[0];
  }

  static async create({ input }) {
    const { title, year, duration, director, rate, poster } = input;
    const uuid = crypto.randomUUID();

    try {
      await pool.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate)
            VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      );
    } catch (e) {
      throw new Error("Error creating movie: " + e.message);
    }

    const [movies] = await pool.query(
      `SELECT title, year, director, duration, poster, rate, id
          FROM movies WHERE id = ?;`,
      [uuid]
    );

    return movies[0];
  }

  static async delete({ id }) {
    try {
      const [result] = await pool.query(`DELETE FROM movies WHERE id = ?;`, [
        id,
      ]);
    } catch (e) {
      throw new Error(`Error deleting movie: ${e.message}`);
    }

    return true;
  }

  static async update({ id, input }) {
    const { title, year, duration, director, rate, poster } = input;

    try {
      await pool.query(
        `UPDATE movies
            SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?
            WHERE id = ?;`,
        [title, year, director, duration, poster, rate, id]
      );
    } catch (e) {
      throw new Error("Error updating movie");
    }

    const [movies] = await pool.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
          FROM movies WHERE id = UUID_TO_BIN(?);`,
      [id]
    );

    return movies[0];
  }
}
