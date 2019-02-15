const provinces = require('../data/provinces');
const cities = require('../data/cities');
const pick = require('./pick');
const haversine = require('haversine');

class GeoData {

	static get defaults() {
		const def = {};
		def.provinceFields = ['id', 'name'];
		def.cityFields = ['id', 'name', 'province'];
		def.unit = 'km';
		def.radius = 100; // km
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

	findCitiesAround(location, {
		radius = this.defaults.radius,
		unit = this.defaults.unit,
		fields = this.defaults.cityFields
	} = {}) {
		const havConf = {
			unit: unit,
			threshold: radius
		};
		return cities
			.filter(c => haversine(location, c, havConf))
			.map(c => pick(c, fields));
	}

	findProvincesAround(location, {
		radius = this.defaults.radius,
		unit = this.defaults.unit,
		fields = this.defaults.provinceFields
	} = {}) {
		const havConf = {
			unit: unit,
			threshold: radius
		};
		return provinces
			.filter(p => haversine(location, p, havConf))
			.map(p => pick(p, fields));
	}
	
}

module.exports = new GeoData();
