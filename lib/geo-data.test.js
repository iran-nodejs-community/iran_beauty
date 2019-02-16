const { describe, it } = require('mocha');
const { expect } = require('chai');
const geoData = require('./geo-data');
const tehran = Object.freeze({
	latitude: 35.715298,
	longitude: 51.404343
});

describe('geoData', () => {
	it('should be an object', () => {
		expect(geoData).to.be.an('object');
	});

	describe('#defaults', () => {
		it('should be an object', () => {
			expect(geoData.defaults).to.be.an('object');
		});

		it('should have #provinceFields array', () => {
			expect(geoData.defaults.provinceFields).to.be.an('array');
		});
		
		it('should have #cityFields array', () => {
			expect(geoData.defaults.cityFields).to.be.an('array');
		});
		
		it('should have #unit string', () => {
			expect(geoData.defaults.unit).to.be.an('string');
		});
		describe('#unit', () => {
			it('should be acceptable', () => {
				expect(geoData.defaults.unit).to.be.oneOf([
					'meter',
					'km',
					'mile',
					'nmile'
				]);
			});
		});
		
		it('should have #radius positive finite number', () => {
			expect(geoData.defaults.radius).to.be.a('number')
				.that.is.finite.and.above(0);
		});
	});

	describe('#getProvinces()', () => {
		it('should be a method', () => {
			expect(geoData).to.respondTo('getProvinces');
		});

		it('should return an array', () => {
			expect(geoData.getProvinces()).to.be.an('array');
		});

		it('should return an array of objects with `id` when fields is ["id"]',
			 () => {
				 geoData.getProvinces({ fields: ['id'] })
					 .forEach(p => expect(p).to.have.own.property('id'));
			 });
	});

	describe('#getCities()', () => {
		it('should be a method', () => {
			expect(geoData).to.respondTo('getCities');
		});

		it('should return an array', () => {
			const lastProvinceId = geoData.getProvinces().pop().id;
			const cities = geoData.getCities(lastProvinceId);
			expect(cities).to.be.an('array');
		});

		it('should return an array of objects with "id" when fields is ["id"]',
			 () => {
				 const firstProvinceId = geoData.getProvinces().shift().id;
				 const cities = geoData.getCities(firstProvinceId);
				 cities.forEach(c => expect(c).to.have.own.property('id'));
			 });
	});

	describe('#findNearestCity()', () => {
		it('should be a method', () => {
			expect(geoData).to.respondTo('findNearestCity');
		});

		it('should return an object near Tehran coordinates', () => {
			expect(geoData.findNearestCity(tehran)).to.be.an('object');
		});
	});

	describe('#findNearestProvince()', () => {
		it('should be a method', () => {
			expect(geoData).to.respondTo('findNearestProvince');
		});

		it('should return an object near Tehran coordinates', () => {
			expect(geoData.findNearestProvince(tehran)).to.be.an('object');
		});
	});

	describe('#findCitiesAround()', () => {
		it('should be a method', () => {
			expect(geoData).to.respondTo('findCitiesAround');
		});

		it('should return an non-empty array near Tehran (radius: 100Km)', () => {
			const aroundTehran = geoData.findCitiesAround(tehran, {
				radius: 100,
				unit: 'km'
			});
			expect(aroundTehran).to.be.an('array').that.is.not.empty;
		});
	});

	describe('#findProvincesAround()', () => {
		it('should be a method', () => {
			expect(geoData).to.respondTo('findProvincesAround');
		});

		it('should return an non-empty array near Tehran (radius: 100Km)', () => {
			const aroundTehran = geoData.findProvincesAround(tehran, {
				radius: 100,
				unit: 'km'
			});
		  expect(aroundTehran).to.be.an('array').that.is.not.empty;
		});
	});
	
});
