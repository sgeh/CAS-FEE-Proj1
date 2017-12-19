/**
 * Represents a server-side data sink for notes.
 */
export class NoteDataService {
	constructor(storage) {
		this._items = [ ];
	}

	insert(toAdd) {
        return this.call(`/`, 'POST', toAdd)
            .then(result => {
                if (result) {
                    this._items.push(toAdd);
                }
                return result;
            });
	}

	update(toUpdate) {
        return this.call(`/${toUpdate.id}`, 'POST', toUpdate)
            .then(result => {
                this._items[this.getIndexById(toUpdate)] = toUpdate;
                return result;
        });
	}

	delete(toDelete) {
        this.call(`/${toUpdate.id}`, 'DELETE', toDelete)
            .then(result => {
                if (result) {
                    this._items.splice(this.getIndexById(toDelete), 1);
                }
                return result;
            });
    }

	get items() {
        if (!this._items.length) {
            return this.call(`/`, 'GET')
                .then(result => {
                    if (result) {
                        this._items = result;
                    }
                    return result;
                });
        } else {
            // return items directly from cache
            return Promise.resolve(this._items);
        }
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
            })).then(response => response.json());
    }
}