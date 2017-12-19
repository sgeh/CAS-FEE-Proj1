/**
 * Utilities functions which can be used as Comparators.
 */
class ComparsionUtils {
	static compareAscDesc(prop, asc = false, ) {
		return function(left, right) {
				return asc ? ComparsionUtils.compare(left[prop], right[prop]) : ComparsionUtils.compare(right[prop], left[prop]);
			};
	}
	static compare(left, right) {
		if (left === right) { return 0; }

        if (left == null && right == null) { return 0; }
        if (right == null) { return 1; }
        if (left == null) { return -1; }

        return (left > right) ? 1 : -1;
	}
}