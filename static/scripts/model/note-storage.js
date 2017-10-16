import { Note } from './note.js';

export class NoteStorage {
    constructor(dataService) {
        this._dataService = dataService;
    }

    createNote(title, description, importance, dateFinished) {
        return this._dataService.insert(new Note(title, description, importance, dateFinished));
    }

    updateNote(toUpdate) {
        return this._dataService.update(toUpdate);
    }

    getNote(id) {
        return this._dataService.items.then(items => items.findBy({ id }));
    }

    getNotes(sortBy = "title", sortOrderAsc = false) {
        return this._dataService.items.then(items => items.sort(ComparsionUtils.compareAscDesc(sortBy, sortOrderAsc)));
    }
}
