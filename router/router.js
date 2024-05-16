import { Router } from "express";

import { MovieController } from "../controller/controller.js";

export const moviesRouter = Router();

moviesRouter.get("/", MovieController.getAll);

moviesRouter.get("/:id", MovieController.getById);

moviesRouter.post("/", MovieController.create);

moviesRouter.put("/", MovieController.update);

moviesRouter.delete("/", MovieController.delete);
