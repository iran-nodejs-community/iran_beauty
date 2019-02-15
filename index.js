const provinces = require('./data/provinces');
const cities = require('./data/cities');

exports.getProvinces = function () {
	return provinces
		.map(({id, name}) => ({id, name}));
};

exports.getCities = function (provinceID) {
	return cities
		.filter(c => c.province === provinceID)
		.map(({id, name, province}) => ({id, name, province}));
};

