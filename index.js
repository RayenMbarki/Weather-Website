const  butt = document.querySelector('.search');
const place = document.querySelector('#City');
const weather = document.querySelector('.res');
const apiKey = "12d507c99dc84123038f6578db1a6234";

butt.addEventListener('click', async (event) => {
    event.preventDefault();
    const city = place.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city); 
            displayWeatherData(weatherData);
        }

        catch(error) {
            console.error(error);
            displayError(error);

        }
    }
    else {
        displayError("PLEASE ENTER A CITY !") ;
        
    }
    
    
});



async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("CITY NOT FOUND !");
    }
    return await response.json();
    
}

function displayWeatherData(data) {
    //console.log(weather);
    const {name : city , main :{temp,humidity}  , weather : [{description}]} = data;
    weather.textContent = "";
    weather.style.display = "flex";
    
    const cty = document.createElement("h1");
    const Getdegree = document.createElement("p");
    const Gethumidity = document.createElement("p");
    const Getskytype = document.createElement("p");
    const img = document.createElement("img");
    cty.textContent = city;
    cty.classList.add("cty");

    
    Getdegree.textContent = `${Math.round(temp - 273.15)}°C`;
    Getdegree.classList.add("temp");
    
    Gethumidity.textContent=`Humidity : ${humidity}%`;
    Gethumidity.classList.add("humidity");
    
    Getskytype.textContent = description;
    Getskytype.classList.add("skytype");
    
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    img.alt = description;
    img.classList.add("icon");

    weather.appendChild(cty);
    weather.appendChild(Getdegree);
    weather.appendChild(Gethumidity);
    weather.appendChild(Getskytype);
    weather.appendChild(img);



}

function displayError(msg) {
    const err = document.createElement("p");
    err.textContent = msg;
    err.classList.add("err");

    weather.textContent ="";
    weather.style.display="flex";
    weather.appendChild(err);




}








/*document.getElementById('clk').onclick = function(event) {
    event.preventDefault();
    const msg = document.getElementById('City').value;
    document.getElementById('city').textContent=msg;
}

document.getElementById('City').addEventListener('input', function() { 
    if (this.value === '') {
        document.getElementById('city').textContent = '';
    }


});*/