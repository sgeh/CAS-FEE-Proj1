class Note {
	constructor(title, description, importance, dateFinished) {
		this.title = title || '';
		this.description = description || '';
		this.hasFinished = false;
		this.importance = importance || 5;
		this.dateCreated = new Date();
		this.dateFinished = dateFinished || null;
	}
}

class NoteStorage {
	constructor() {
		this._dataService = new NoteDataService();
	}
	
	createNote(title, description, importance, dateFinished) {
		return this.addNote(new Note(title, description, importance, dateFinished));
	}
	
	addNote(toAdd) {
		return new Promise((resolve, reject) => {
			this._dataService.insert(toAdd);
			resolve(toAdd);
		});
	}
	
	getItems(sortBy = "title", sortOrderAsc = false) {
		return new Promise((resolve, reject) => {
			resolve(this._dataService.items.sort(ComparsionUtils.compareAscDesc));
		}); 
	}
}

class NoteDataService {
	constructor() {
		this._items = JSON.parse(window.localStorage.getItem('items') || '[]');
	}
	insert(toAdd) {
		this._items.push(toAdd);
		window.localStorage.setItem('items', JSON.stringify(this._items));
	}
	get items() {
		return this._items;
	}
}