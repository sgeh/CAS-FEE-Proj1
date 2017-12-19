import {mapObject} from '../utils/object-utils';

/**
 * Represents the server-side Note implementation.
 */
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

    /**
     * Converts the given DTO (from JSON) into a new Note instance.
     *
     * @param dto JSON data to convert into an object.
     * @returns {*}
     */
    static fromDto(dto) {
        return mapObject(new Note(), dto);
    }

    /**
     * Converts multiple Note instances into an array of DTO's (JSON serializable data objects).
     *
     * @param dto JSON data to convert into an object.
     * @returns {*}
     */
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

    /**
     * Converts the Note into a new DTO (JSON serializable data object).
     * @returns {*}
     */
    toDto() {
        return mapObject({ }, this);
    }
}