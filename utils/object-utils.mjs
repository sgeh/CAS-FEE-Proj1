/**
 * Assigns all properites of the source object to the target object.
 * Ignores all functions and uses the given mappings to convert properties names from the source to the target.
 *
 * @param target Target object which should be filled.
 * @param source Source object which properties should be copied.
 * @param mappings Mappings for manual property assignment.
 * @returns {*}
 */
export function mapObject(target, source, mappings) {
    if (!source || !target) {
        return;
    }

    for (let prop in source) {
        if (typeof(source[prop]) === 'function') {
            continue;
        }

        if (mappings && typeof(mappings[prop]) !== 'undefined') {
            if (mappings[prop]) {
                target[mappings[prop]] = source[prop];
            }
        } else {
            target[prop] = source[prop];
        }
    }
    return target;
}
