let province = require('./helper/province.js');
let city = require('./helper/city.js');

module.exports.getProvinces = function () {
    let provinces = [];
    for (let i = 0; i < province.length; i++) {
        provinces.push({
            name: province[i].name,
            id: province[i].id
        });
    }
    return provinces;
};

module.exports.getCities = function (cityID) {
    let cities = [];
    for (let i = 0; i < city.length; i++) {
        if (city[i].province === cityID) {
            cities.push({
                id: city[i].id,
                name: city[i].name,
                province: city[i].province
            })
        }
    }
    return cities;
};