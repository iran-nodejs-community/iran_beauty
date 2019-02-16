## IRAN Beauty

##### a nodejs package to list Iran cities

###### Installation

```
npm install @nimahkh/iran_beauty
```

###### Run in Codes

```
const geoData=require('./lib/geo-data');
const tehran = Object.freeze({
  latitude: 35.715298,
  longitude: 51.404343
});

const find=geoData.findProvincesAround(tehran, {
  radius: 1000,
  unit: 'km'
});


const provinces=geoData.getProvinces();
const cities=geoData.getCities(1);
const citiesAround=geoData.findCitiesAround(tehran)
const nearestProvince=geoData.findNearestProvince(tehran,{radius:1000,unit:'km'})

```

### Methods
##### getCities
this method , export all cities with given id 
##### getProvince
this method , export all provinces
##### findCitiesAround
this method , export cities around of imported city
##### findProvincesAround
this method , export nearest province around of imported province
##### findNearestProvince
this method , export nearest province

### Contributors and my Friends

![Fadavi](https://avatars1.githubusercontent.com/u/12640517?s=60&v=4)
[nima habibkhoda](https://github.com/nimahkh)

![Fadavi](https://avatars3.githubusercontent.com/u/9992849?s=60&v=4)
[fadavi](https://github.com/fadavi)

With Love For Iran :heartpulse:
