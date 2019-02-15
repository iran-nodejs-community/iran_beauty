const provinces = require('../data/provinces');
const cities = require('../data/cities');
const pick = require('./pick');

class GeoData {

	static get defaults() {
		const def = {};
		def.provinceFields = ['id', 'name'];
		def.cityFields = ['id', 'name', 'province'];

		return def;
	}
	
	constructor() {
		this.defaults = GeoData.defaults;
	}

	getProvinces({ fields = this.defaults.provinceFields }) {
		return provinces
			.map(p => pick(p, fields));
	}

	getCities(provinceId, {
		fields = this.defaults.cityFields
	}) {
		return cities
			.filter(c => c.province === provinceId)
			.map(c => pick(c, fields));	
	}
	
}

module.exports = new GeoData();
