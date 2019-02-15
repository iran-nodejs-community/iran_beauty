const provinces = require('./helper/provinces');
const cities = require('./helper/city');

exports.getProvinces = function () {
	return provinces
		.map(({id, name}) => ({id, name}));
};

exports.getCities = function (provinceID) {
	return cities
		.filter(c => c.province === provinceID)
		.map(({id, name, province}) => ({id, name, province}));
};
