const inpt = document.getElementById('inpt');
const img = document.getElementById('img');
const symbolImg = document.getElementById('symbolImg');
const msgH2 = document.getElementById('msgH2');
const info = document.getElementById('info');
const scoreSpan = document.getElementById('scoreSpan');
const clue1P = document.getElementById('clue1P');
const clue2P = document.getElementById('clue2P');
const clue3P = document.getElementById('clue3P');
const clue3P1 = document.getElementById('clue3P1');
const clue3P2 = document.getElementById('clue3P2');

const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Israel", "Israel", "Israel", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen", "Zambia", "Zimbabwe"
];

let COUNTRY = '';
let score = 0;
let prize = 10;


// https://publicapi.dev/rest-countries-api
const URL = 'https://restcountries.com/v3.1/name/'


function getRandomCountry() {
    const randomNum = Math.floor(Math.random() * countries.length - 1);
    const randomCountry = countries[randomNum];
    console.log(randomCountry)
    getCountry(randomCountry)
    prize = 10;
    clue1P.innerHTML = '';
    clue2P.innerHTML = '';
    clue3P.innerHTML = '';
    clue3P1.innerHTML = '';
    clue3P2.innerHTML = '';
    info.style.display = 'none';
    inpt.value = '';
}
getRandomCountry()


async function getCountry(randomCountry) {

    try {
        const response = await fetch(URL + randomCountry, {
            headers: { "Accept": "application/json" }
        });

        console.log(response)
        const data = await response.json();
        console.log(data[0]);
        const country = data[0];
        if (country === 'undefined' || country === undefined) {
            getRandomCountry()
            return
        }
        COUNTRY = country;
        msgH2.style.display = 'none';
        img.setAttribute('src', country.flags.png);
        // showInfo(country)
    } catch (error) {
        console.error(error)
        msgH2.innerHTML = error;
    }

}

function guessCountry() {
    const playerGuess = inpt.value.toLowerCase()
    console.log(playerGuess)

    console.log(COUNTRY)
    if (playerGuess === COUNTRY.name.common.toLowerCase()) {
        showInfo(COUNTRY)
        score += prize;
        scoreSpan.innerHTML = score;
        msgH2.style.display = 'none';
    } else { 
        msgH2.innerHTML = 'Sorry... Try Again!';
        msgH2.style.color = 'red';
        msgH2.style.display = 'block';
    }

}


function showInfo(country) {
    document.getElementById('nameH1').innerHTML = country.name.common;
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
    info.style.display = 'block'
}

function clue1() { 
    clue1P.innerHTML = 'The country is in continent: ' + COUNTRY.continents[0];
    prize -= 1;
}
function clue2() { 
    clue2P.innerHTML = 'The capital of the country is: ' + COUNTRY.capital;
    prize -= 2;
}
function clue3() { 
    const words = COUNTRY.name.common.split(/\s+/).filter(Boolean).length;
    const letters = COUNTRY.name.common.match(/[a-zA-Z]/g).length;
    clue3P.innerHTML = 'The country name is: ' + words + ' word(s)';
    clue3P1.innerHTML = 'The number of letters is: '+ letters;
    clue3P2.innerHTML = 'The first letter is: ' + COUNTRY.name.common[0];
    prize -= 3;
}

document.addEventListener('keydown', function (event) {
    console.log(event)
    if (event.keyCode === 81) {
        inpt.value = COUNTRY.name.common;
        prize -= 4;
    }
});