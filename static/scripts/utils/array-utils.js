/**
 * Searches for entries containing the property values given by the specified object.
 */
Array.prototype.findBy = function(objToSearchFor) {
	let keys = Object.keys(objToSearchFor);
	return this.filter(toFilter => keys.every(k => toFilter[k] === objToSearchFor[k])).firstOrDefault(null);
};

/**
 * Returns the first array entry or a default value (can be specified by the first argument).
 * @param defaultValue Default value to return if the array is empty.
 * @returns {*}
 */
Array.prototype.firstOrDefault = function(defaultValue) {
	if (this.length) {
		return this[0];
	}
	return defaultValue;
};