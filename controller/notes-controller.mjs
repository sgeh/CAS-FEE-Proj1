import NoteService from '../services/notes-service';
import Note from '../services/note';

export default class NotesController {
    constructor(service) {
        this.service = service || new NoteService();
    }

    async getNotes(req, res) {
        res.json(Note.toDtos(await this.service.getAll()));
    }

    async getNote(req, res) { //:id
        const changedNode = await this.service.get(req.params.id);
        res.json(changedNode.toDto());
    }

    async insertNote(req, res) {
        const changedNode = await this.service.insert(Note.fromDto(req.body));
        res.json(changedNode.toDto());
    }

    async updateNote(req, res) {
        const changedNode = await this.service.update(Note.fromDto(req.body));
        res.json(changedNode.toDto());
    }

    async deleteNote(req, res) {  //:id
        const changedNode = await this.service.delete(req.params.id);
        res.json(changedNode.toDto());
    }
};