import NoteService from '../services/notes-service';
import Note from '../services/note';

export default class NotesController {
    constructor(service) {
        this.service = service || new NoteService();
    }

    getNotes(req, res) {
        this.service.getAll((err, notes) => {
            res.json(Note.toDtos(notes));
        })
    }

    getNote(req, res) { //:id
        this.service.get(req.params.id, (err, note) => {
            res.json(note.toDto());
        });
    }

    insertNote(req, res) {
        this.service.insert(Note.fromDto(req.body), (err, note) => {
            res.json(note.toDto());
        });
    }

    updateNote(req, res) {
        this.service.update(Note.fromDto(req.body), (err, note) => {
            res.json(note.toDto());
        });
    }

    deleteNote(req, res) {  //:id
        this.service.delete(req.params.id, (err, note) => {
            res.json(note.toDto());
        });
    }
};