module.exports = function (obj, keys) {
	return keys.reduce((res, key) => {
		const val = obj[key];
		val === undefined || (res[key] = val);
		return res;
	}, {});
};
