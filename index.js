const province = require('./helper/province');
const city = require('./helper/city');

exports.getProvinces = function () {
	return province
		.map(({id, name}) => ({id, name}));
};

exports.getCities = function (provinceID) {
	return city
		.filter(c => c.province === provinceID)
		.map(({id, name, province}) => ({id, name, province}));
};
