export class NoteDataService {
	constructor() {
		this._items = JSON.parse(window.localStorage.getItem('items') || '[ ]');
	}
	insert(toAdd) {
        return new Promise((resolve, reject) => {
            toAdd.id = Math.floor(Math.random() * 1000000); // TODO: do this on server-side
            this._items.push(toAdd);
            window.localStorage.setItem('items', JSON.stringify(this._items));

            resolve(toAdd);
        });
	}
	update(toUpdate) {
        return new Promise((resolve, reject) => {
            window.localStorage.setItem('items', JSON.stringify(this._items));
            resolve(toUpdate);
        });
	}
	get items() {
        return new Promise((resolve, reject) => {
            resolve(this._items);
        });
	}
}