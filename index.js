const province = require('./helper/province.js');
const city = require('./helper/city.js');

exports.getProvinces = function () {
	return province
		.map(({id, name}) => ({id, name}));
};

exports.getCities = function (provinceID) {
	return city
		.filter(c => c.province === provinceID)
		.map(({id, name, province}) => ({id, name, province}));
};
