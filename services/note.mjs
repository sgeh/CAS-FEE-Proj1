import {mapObject} from '../utils/object-utils';

export default class Note
{
    constructor(title, description, importance, dateFinished) {
        this.id = '';
        this.title = title || '';
        this.description = description || '';
        this.hasFinished = false;
        this.importance = importance || 5;
        this.dateCreated = new Date();
        this.dateFinished = dateFinished || null;
    }

    static fromDto(dto) {
        return mapObject(new Note(), dto);
    }

    static toDtos(notes) {
        if (!notes) {
            return [ ];
        }

        if (notes instanceof Array) {
            return notes.map(n => n.toDto());
        } else {
            return [ notes.toDto() ];
        }
    }

    toDto() {
        return mapObject({ }, this);
    }
}