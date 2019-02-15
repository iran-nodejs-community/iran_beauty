const provinces = require('./data/provinces');
const cities = require('./data/cities');
const pick = require('./lib/pick');

exports.getProvinces = function ({
	fields
}) {
	return provinces
		.map(p => pick(p, fields));
};

exports.getCities = function (provinceID, {
	fields
}) {
	return cities
		.filter(c => c.province === provinceID)
		.map(c => pick(c, fields));
};
