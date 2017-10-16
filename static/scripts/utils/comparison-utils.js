class ComparsionUtils {
	static compareAscDesc(prop, asc = false, ) {
		return function(left, right) {
				return asc ? ComparsionUtils.compare(left[prop], right[prop]) : ComparsionUtils.compare(right[prop], left[prop]);
			};
	}
	static compare(left, right) {
		return (left === right) ? 0 : ((left > right) ? 1 : -1);
	}
}