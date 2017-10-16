export class Note {
	constructor(title, description, importance, dateFinished) {
		this.id = -1;
		this.title = title || '';
		this.description = description || '';
		this.hasFinished = false;
		this.importance = importance || 5;
		this.dateCreated = new Date();
		this.dateFinished = dateFinished || null;
	}
}
