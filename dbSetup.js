// dbSetup.js
import { connection } from "./models/mysql/dbConfig.js";

async function setupDatabase() {
  try {
    // Drop the existing movies table if it exists
    await connection.query("DROP TABLE IF EXISTS movies;");

    // Create the new movies table
    const createTableQuery = `
      CREATE TABLE movies (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        director VARCHAR(255) NOT NULL,
        duration INT NOT NULL,
        poster TEXT,
        rate DECIMAL(3, 1) NOT NULL CHECK (rate >= 0)
      );
    `;
    await connection.query(createTableQuery);

    console.log("Movies table created successfully");
  } catch (error) {
    console.error("Error setting up the database:", error);
  } finally {
    await connection.end();
  }
}

setupDatabase();
