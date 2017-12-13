import Datastore from 'nedb';
import NoteEntityConverter from './note-entity-converter';

//export default instance = new NotesController(new Datastore({ filename: './data/notes.db', autoload: true }));

export default class NotesController {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/notes.db', autoload: true });
        this.converter = new NoteEntityConverter();
    }

    insert(note, callback) {
        this.db.insert(
            this.converter.toEntity(note, true),
            (err, newDoc) => {
                if(callback){
                    callback(err, this.converter.fromEntity(newDoc));
                }
            });
    }

    update(note, callback) {
        this.db.update(
            { _id: note.id },
            { $set: this.converter.toEntity(note) },
            {returnUpdatedDocs:true},
            (err, count, doc) => {
                callback(err, this.converter.fromEntity(doc));
            });
    }

    delete(id, callback) {
        this.db.update(
            { _id: id },
            { $set: { state: "DELETED"} },
            {returnUpdatedDocs:true},
            (err, count, doc) => {
                callback(err, this.converter.fromEntity(doc));
            });
    }

    get(id, callback) {
        this.db.findOne(
            { _id: id, state: { $ne: "DELETED" } },
            (err, doc) => {
                callback( err, this.converter.fromEntity(doc));
            });
    }

    getAll(callback) {
        this.db.find({ state: { $ne: "DELETED" }})
            .sort({ title: -1 })
            .exec((err, docs) => {
                callback( err, this.converter.fromEntities(docs));
            });
    }

};