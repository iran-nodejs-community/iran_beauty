const provinces = require('../data/provinces');
const cities = require('../data/cities');
const pick = require('./pick');
const haversine = require('haversine');

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

	_findNearest(data, location) {
		let nearest = null;
		let prevDistance = Infinity;
		let currDistance;
		for(const node of data) {
			currDistance = haversine(location, node);
			if (currDistance < prevDistance) {
				nearest = node;
				prevDistance = currDistance;
			}
		}
		return nearest;
	}

	findNearestCity(location) {
		return this._findNearest(cities, location);
	}

	findNearestProvince(location) {
		return this._findNearest(provinces, location);
	}
	
}

module.exports = new GeoData();
