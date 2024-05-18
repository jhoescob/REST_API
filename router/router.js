import { Router } from "express";

import { Controller } from "../controller/controller.js";

export const createMovieRouter = ({ modelIn }) => {
  const router = Router();

  const controller = new Controller({ model: modelIn });

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/", controller.update);
  router.delete("", controller.delete);

  return router;
};
