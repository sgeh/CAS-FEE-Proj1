/**
 * Client-side model (note representation).
 */
export class Note {
	constructor(title, description, importance, dateFinished) {
		this.id = '';
		this.title = title || '';
		this.description = description || '';
		this.hasFinished = false;
		this.importance = importance || 5;
		this.dateCreated = new Date();
		this.dateFinished = dateFinished || null;
	}
}
