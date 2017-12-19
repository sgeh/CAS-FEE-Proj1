import { Note } from './note.js';

/**
 * Client side bussiness service (as simple storage).
 */
export class NoteStorage {
    constructor(dataService) {
        this._dataService = dataService;
    }

    async createNote(title, description, importance, dateFinished) {
        return this._dataService.insert(new Note(title, description, importance, dateFinished));
    }

    async updateNote(toUpdate) {
        return this._dataService.update(toUpdate);
    }

    async deleteNote(toUpdate) {
        return this._dataService.delete(toUpdate);
    }

    async getNote(id) {
        return (await this._dataService.items).findBy({ id });
    }

    async getNotes(sortBy = "title", sortOrderAsc = false) {
        return (await this._dataService.items).sort(ComparsionUtils.compareAscDesc(sortBy, sortOrderAsc));
    }
}
