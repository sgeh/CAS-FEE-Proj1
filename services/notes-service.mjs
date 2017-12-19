import Datastore from 'nedb';
import NoteEntityConverter from './note-entity-converter';
import { toQuery, toCountedQuery } from '../utils/db-utils';

export default class NotesController {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
        this.converter = new NoteEntityConverter();
    }

    /**
     * Inserts a new note into the data storage and return a Promise to support async/await.
     */
    async insert(note) {
        const insertedResult = await toQuery(finish => {
                this.db.insert(
                    this.converter.toEntity(note, true),
                    finish);
            });
        return this.converter.fromEntity(insertedResult);
    }

    /**
     * Updates an existing note in the data storage and return a Promise to support async/await.
     */
    async update(note, callback) {
        const updateResult = await toCountedQuery(finish => {
                this.db.update(
                    { _id: note.id },
                    { $set: this.converter.toEntity(note) },
                    {returnUpdatedDocs:true},
                    finish);
            });
        return this.converter.fromEntity(updateResult.doc);
    }

    /**
     * Deletes an existing note from the data storage and return a Promise to support async/await.
     */
    async delete(id, callback) {
        const deleteResult = await toCountedQuery(finish => {
            this.db.update(
                { _id: id },
                { $set: { state: "DELETED"} },
                {returnUpdatedDocs:true},
                finish);
        });
        return this.converter.fromEntity(deleteResult.doc);
    }

    /**
     * Returns the given note from the data storage and return a Promise to support async/await.
     */
    async get(id) {
        const selectResult = await toQuery(finish => {
            this.db.findOne(
                { _id: id, state: { $ne: "DELETED" } },
                finish);
        });
        return this.converter.fromEntity(selectResult);
    }

    /**
     * Returns all notes from the data storage and return a Promise to support async/await.
     */
    async getAll() {
        const selectResult = await toQuery(finish => {
            this.db.find({ state: { $ne: "DELETED" }})
                .sort({ title: -1 })
                .exec(finish);
        });
        return this.converter.fromEntities(selectResult);
    }
};

