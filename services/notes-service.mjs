import Datastore from 'nedb';
import NoteEntityConverter from './note-entity-converter';

export default class NotesController {
    constructor() {
        this.db = new Datastore({ filename: './data/notes.db', autoload: true });
        this.converter = new NoteEntityConverter();
    }

    insert(note, callback) {
        console.log(note);
        console.log(this.converter.toEntity(note, true));
        this.db.insert(
            this.converter.toEntity(note, true),
            (err, newDoc) => {
                console.log(newDoc);
                console.log(this.converter.fromEntity(newDoc));
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