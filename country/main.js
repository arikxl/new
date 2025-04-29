const inpt = document.getElementById('inpt');
const img = document.getElementById('img');
const symbolImg = document.getElementById('symbolImg');


// https://publicapi.dev/rest-countries-api
const URL = 'https://restcountries.com/v3.1/name/'



async function getCountry() {
    const countryToSearch = inpt.value;

    try {
        const response = await fetch(URL + countryToSearch, {
            headers: { "Accept": "application/json" }
        });
        
        console.log(response)
        const data = await response.json();
        console.log(data[0]);
        const country = data[0];
        document.getElementById('nameH1').innerHTML = country.name.common;
        img.setAttribute('src', country.flags.png);
        symbolImg.setAttribute('src', country.coatOfArms.png);
        document.getElementById('capitalP').innerHTML = country.capital[0];
        document.getElementById('continentP').innerHTML = country.continents[0];
        document.getElementById('populationP').innerHTML = country.population.toLocaleString();



        const currencyKey = Object.keys(country.currencies)[0]; // e.g., "ILS"
        const currency = country.currencies[currencyKey];
        console.log(currency.name);   // "Israeli new shekel"
        console.log(currency.symbol);
        document.getElementById('moneySymbol').innerHTML = currency.symbol;
        document.getElementById('moneyP').innerHTML = currency.name;
        
        console.log(country.languages);
        
        const languageArray = Object.values(country.languages);
        console.log(languageArray); // ["Arabic", "Hebrew"]
        document.getElementById('languages').innerHTML = languageArray;

        
    } catch (error) {
        console.error(error)
    }
    
}