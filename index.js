const provinces = require('./data/provinces');
const cities = require('./data/cities');
const pick = require('./lib/pick');

const defaults = exports.defaults = {
	provinceFields: ['id', 'name'],
	cityFields: ['id', 'name', 'province']
};

exports.getProvinces = function ({
	fields = defaults.provinceFields
} = {}) {
	return provinces
		.map(p => pick(p, fields));
};

exports.getCities = function (provinceID, {
	fields = defaults.cityFields
} = {}) {
	return cities
		.filter(c => c.province === provinceID)
		.map(c => pick(c, fields));
};
