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
