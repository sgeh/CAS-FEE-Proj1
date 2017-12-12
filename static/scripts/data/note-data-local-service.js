export class NoteDataLocalService {
	constructor(storage) {
	    this._storage = storage || window.localStorage;
		this._items = JSON.parse(this._storage.getItem('items') || '[ ]');
	}

	insert(toAdd) {
        return new Promise((resolve, reject) => {
            toAdd.id = String(Math.floor(Math.random() * 1000000));
            this._items.push(toAdd);
            this._storage.setItem('items', JSON.stringify(this._items));

            resolve(toAdd);
        });
	}

	update(toUpdate) {
        return new Promise((resolve, reject) => {
            this._storage.setItem('items', JSON.stringify(this._items));
            resolve(toUpdate);
        });
	}

	delete(toDelete) {
        return new Promise((resolve, reject) => {
            const foundIdx = this._items.findIndex(item => item.id === toDelete.id);
            if (foundIdx !== -1) {
                this._items.splice(foundIdx, 1);
                this._storage.setItem('items', JSON.stringify(this._items));
                resolve(toDelete);
            } else {
                resolve(null);
            }
        });
    }

	get items() {
        return new Promise((resolve, reject) => {
            resolve(this._items);
        });
	}
}