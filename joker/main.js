const joke = document.getElementById('joke');
const heb = document.getElementById('heb');

// const URL = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';



async function getJoke() {
    const URL = "https://aphorismcookie.herokuapp.com";

    try {
        const response = await fetch(URL, {
            headers: { "Accept": "application/json" }
        });

        const item = await response.json();
        console.log(item);
        console.log(item.data);
        console.log(item.data.message);

   
        translate(item.data.message)
    } catch (error) {
        console.error("Error fetching joke:", error);
        joke.innerText = "Failed to load joke. Try again!";
    }
}



async function translate(fortune) {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${fortune}&langpair=en-US|he-IL`;
    try {
        const response = await fetch(apiUrl);

        const data = await response.json();
        console.log(data)
        console.log(data.responseData)
        console.log(data.responseData.translatedText);

        joke.innerText = fortune;
        heb.innerHTML= data.responseData.translatedText; 
    } catch (error) {
        console.error("Error translating:", error);
        heb.innerHTML = "Translation failed!";
    }
}


