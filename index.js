const provinces = require('./data/provinces');
const cities = require('./data/cities');
const pick = require('./lib/pick');

exports.getProvinces = function () {
	return provinces
		.map(p => pick(p, ['id', 'name']));
};

exports.getCities = function (provinceID) {
	return cities
		.filter(c => c.province === provinceID)
		.map(c => pick(c, ['id', 'name', 'province']));
};
