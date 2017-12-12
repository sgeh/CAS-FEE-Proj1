export class NoteDataService {
	constructor(storage) {
		this._items = [ ];
	}

	insert(toAdd) {
	    return new Promise((resolve, reject) => {
            this.call(`/`, 'POST', toAdd)
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        this._items.push(toAdd);
                    }
                    resolve(result);
                });
        });
	}

	update(toUpdate) {
        return new Promise((resolve, reject) => {
            this.call(`/${toUpdate.id}`, 'POST', toUpdate)
                .then(response => response.json())
                .then(result => {
                    this._items[this.getIndexById(toUpdate)] = toUpdate;
                    resolve(result);
                });
        });
	}

	delete(toDelete) {
        return new Promise((resolve, reject) => {
            this.call(`/${toUpdate.id}`, 'DELETE', toDelete)
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        this._items.splice(this.getIndexById(toUpdate), 1);
                    }
                    resolve(result);
                });
        });
    }

	get items() {
        return new Promise((resolve, reject) => {
            if (!this._items.length) {
                this.call(`/`, 'GET')
                    .then(response => response.json())
                    .then(result => {
                        if (result) {
                            this._items = result;
                        }
                        resolve(result);
                    });
            } else {
                resolve(this._items);
            }
        });
	}

	getIndexById(toSearch) {
	    return this._items.findIndex(item => item.id === toSearch.id);
    }

	call(address, method, data) {
        return fetch(new Request(
            `${self.location.origin}/notes${address}`,
            {
                method,
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                mode: 'cors',
                body: data ? JSON.stringify(data) : void 0
            }));
    }
}