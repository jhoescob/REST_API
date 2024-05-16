import { randomUUID } from 'node:crypto'

import data from "../../data.json" with { type: "json" };

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return data.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return data
  }

  static async getById ({ id }) {
    const movie = data.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    data.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = data.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    data.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = data.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    data[movieIndex] = {
      ...data[movieIndex],
      ...input
    }

    return data[movieIndex]
  }
}