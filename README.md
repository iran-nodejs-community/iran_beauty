##IRAN Beauty

#####a nodejs package to list Iran country cities

######Installation

```
npm install iran_beauty
```

######Run in Codes

```
let convertor=require('iran_beauty');

let provinces=convertor.getProvinces(); //List all of provinces

for(let i=0;i<provinces.length;i++){
    console.log(provinces[i].name,convertor.getCities(provinces[i].id))
}
```

#######Methods
#####getCities
this method , export all cities with given id 
#####example
```
convertor.getCities(1)// will return cities of province with id 1
```

#####getProvince
this method , export all provinces
#####example
```
convertor.getProvince()// will return provinces
```

With Love For Iran :heartpulse: