import {mapObject} from '../utils/object-utils';
import Note from './note';

export default class NoteEntityConverter
{
    constructor() {
    }

    /**
     * Converts the given entity into a note object.
     */
    fromEntity(entity) {
        return mapObject(new Note(), entity, { _id: "id" });
    }

    /**
     * Converts multiple entities into a new array of note objects.
     */
    fromEntities(entities) {
        return entities.map(e => this.fromEntity(e));
    }

    /**
     * Converts a note instance into a new entity.
     *
     * @param note Note to be converted.
     * @param isNew True if the note should be inserted.
     * @returns {*}
     */
    toEntity(note, isNew) {
        return mapObject({ }, note, { id: !isNew ? '_id' : null });
    }
}