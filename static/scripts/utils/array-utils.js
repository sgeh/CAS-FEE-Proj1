Array.prototype.findBy = function(objToSearchFor) {
	let keys = Object.keys(objToSearchFor);
	return this.filter(toFilter => keys.every(k => toFilter[k] === objToSearchFor[k])).firstOrDefault(null);
};

Array.prototype.firstOrDefault = function(defaultValue) {
	if (this.length) {
		return this[0];
	}
	return defaultValue;
};