class ComparsionUtils {
	static compareAscDesc(asc = false, prop) {
		return function(left, right) {
				return sortOrderAsc ? ComparsionUtils.compare(left[prop], right[prop]) : ComparsionUtils.compare(right[prop], left[prop]);
			};
	}
	static compare(left, right) {
		return (left === right) ? 0 : ((left > right) ? 1 : -1);
	}
}