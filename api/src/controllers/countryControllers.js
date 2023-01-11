const axios = require('axios');
const apiUrl = 'https://restcountries.com/v3/all';
const { Country } = require('../db.js');

async function getAllCountries(){
    try {
        let countries = (await axios(apiUrl)).data.map(country=>({
            id: country.cca3,
            nombre: country.name.common !== null ? country.name.common : 'No se encontró el nombre del pais',
            bandera: country.flags !== null ? country.flags[0]: 'No se encontró la bandera',            
            region: country.region !== null ? country.region: 'No se encontró la región del pais',
            capital: typeof country.capital !== 'undefined' ? country.capital[0]: 'No se encontró la capital del pais',
            subregion: country.subregion,             
            area: country.area,             
            poblacion: country.population
        }))
        await Country.bulkCreate(countries)
        console.log('Paises cargados en la db correctamente')
    } catch (error) {
        console.log(error)
    }
}


/*Para traer los episodios de mi db y mandarlos:*/
function getAllCountriesFromDb(req, res) {
    Country.findAll()
    .then(countries => res.send(countries))
    .catch(error => (error))
}

module.exports = { getAllCountries, getAllCountriesFromDb };

/*En este archivo tengo las funciones que van a permitir interactuar con la API o con la DB


 capital: typeof country.capital !== 'undefined' ? country.capital[0]: 'No se encontró la capital del pais',*/