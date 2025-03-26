// index.js
import "./styles.css";

// variables
const tempScale = document.getElementById("unit-btn");

const locationBtn = document.getElementById('location-btn');


console.log("Start of script!")

// event listener for location btn
locationBtn.addEventListener('click', () => {
    let location = prompt("Enter your location:");
    main(location);
});

// Function to fetch data from the visual crossings api
async function fetchData(location) {
    console.log("Fetching data...");
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=H8D4BTVA9F9WEDCQSV5C235VX`, {mode: 'cors'});
    const data = await response.json();
    let description = data.description;
    console.log(data);
    return data;
}

function getUsefulWeatherData(data) {
    console.log("Getting useful weather data...");
    const description = data.description;
    //Check if data.days exists
    if (data.days && data.days.length > 0) {
        const weatherData = data.days[0];
        const temperature = weatherData.temp;
        const humidity = weatherData.humidity;
        const windSpeed = weatherData.windspeed; 
        const date = weatherData.datetime;
        const location = data.resolvedAddress;
        const highTemp = weatherData.tempmax;
        const lowTemp = weatherData.tempmin;
        const conditions = weatherData.conditions;
        const icon = weatherData.icon;
        console.log(`Icon: ${icon}`);
        console.log(`Conditions: ${conditions}`);
        console.log(`High Temperature: ${highTemp}`);
        console.log(`Low Temperature: ${lowTemp}`);
        console.log(`Location: ${location}`);
        console.log(`Date: ${date}`);
        console.log(`Description: ${description}`);
        console.log(`Temperature: ${temperature}`);
        console.log(`Humidity: ${humidity}%`);
        console.log(`Wind Speed: ${windSpeed} km/h`);
        return { temperature, humidity, windSpeed, date, location, highTemp, lowTemp, conditions, icon };
    } else {
        console.error("No weather data available for today.");
    }
}

async function main(location) {
    try {
        const weatherData = await fetchData(location);
        getUsefulWeatherData(weatherData);
    } catch (error) {
        console.error("Error fetching or processing data:", error);
    }
}