import {mapObject} from '../utils/object-utils';
import Note from './note';

export default class NoteEntityConverter
{
    constructor() {
    }

    fromEntity(entity) {
        return mapObject(new Note(), entity, { _id: "id" });
    }

    fromEntities(entities) {
        return entities.map(e => this.fromEntity(e));
    }

    toEntity(entity, isNew) {
        return mapObject({ }, entity, { id: !isNew ? '_id' : null });;
    }
}