import express from 'express';
import NotesController from '../controller/notes-controller';

const routes = express.Router();
const controller = new NotesController();

routes.get("/", (req, res) => controller.getNotes(req, res));
routes.get("/:id/", (req, res) => controller.getNote(req, res));

routes.post("/", (req, res) => controller.insertNote(req, res));
routes.post("/:id/", (req, res) => controller.updateNote(req, res));

routes.delete("/:id/", (req, res) => controller.deleteNote(req, res));

export default routes;