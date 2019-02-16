const provinces = require('../data/provinces');
const cities = require('../data/cities');
const pick = require('object.pick');
const haversine = require('haversine');

/**
 * @typedef Location
 * @property {Number} latitude - Latitude
 * @property {Number} longitude - Longitude
 */

/**
 * @typedef City
 * @prop {Number} [id] - ID
 * @prop {Number} [province] - Province ID
 * @prop {String} [name] - City Name (in Persian)
 * @prop {Number} [latitude] - Latitude
 * @prop {Number} [longitude] - Longitude
 */

/**
 * @typedef Province
 * @prop {Number} [id] - Province ID
 * @prop {String} [name] - Province name (in Persian)
 * @prop {Number} [latitude] - Latitude
 * @prop {Number} [longitude] - Longitude
 */

/** Class provices geographical information about Iran */
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

	/**
	 * Returns all provinces
	 * @param {Object} [options = {}] - Options object
	 * @param {String[]} [options.fields = defaults.provinceFields] - Province
	 *     fields that must exist in results
	 * @return {Province[]}
	 */
	getProvinces({ fields = this.defaults.provinceFields } = {}) {
		return provinces
			.map(p => pick(p, fields));
	}

	/**
	 * Finds and returns all cities of a province
	 * @param {Number} provinceId - Province ID
	 * @param {Object} [options = {}] - Options object
	 * @param {String[]} [options.fields = defaults.cityFields] - City fields that
	 *     must exist in results
	 * @return {City[]}
	 */
	getCities(provinceId, {
		fields = this.defaults.cityFields
	} = {}) {
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

	/**
	 * Finds and returns nearest city to the coordinates
	 * @param {Location} location - Target location
	 * @return {City}
	 */
	findNearestCity(location) {
		return this._findNearest(cities, location);
	}

	/**
	 * Finds and returns nearest province to the coordinates
	 * @param {Location} location - Target location
	 * @return {Province}
	 */
	findNearestProvince(location) {
		return this._findNearest(provinces, location);
	}

	/**
	 * Finds and returns all cities around the coordinates within a specific radius
	 * @param {Location} location - Target location
	 * @param {Object} [options = {}] - Options object
	 * @param {Number} [options.radius = defaults.radius] - Radius
	 * @param {String} [options.unit = defaults.unit] - Distance unit
	 *     (km, meter, mile or nmile)
	 * @param {String[]} [options.fields = defaults.cityFields] - City fields that
	 *     must exist in results
	 * @return {City[]}
	 */
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

	/**
	 * Finds and returns all provinces around the coordinates
	 *     within a specific radius
	 * @param {Location} location - Target location
	 * @param {Object} [options = {}] - Options object
	 * @param {Number} [options.radius = defauls.radius] - Radius
	 * @param {String} [options.unit = defaults.unit] - Distance unit
	 *     (km, meter, mile or nmile)
	 * @param {String[]} [options.fields = defaults.provinceFields] - Province
	 *     fields that must exist in results
	 * @return {Province[]}
	 */
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
