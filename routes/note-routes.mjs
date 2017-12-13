import express from 'express';
import NotesController from '../controller/notes-controller';

const routes = express.Router();
const controller = new NotesController();

routes.get("/", controller.getNotes.bind(controller));
routes.get("/:id/", controller.getNote.bind(controller));

routes.post("/", controller.insertNote.bind(controller));
routes.post("/:id/", controller.updateNote.bind(controller));

routes.delete("/:id/", controller.deleteNote.bind(controller));

export default routes;