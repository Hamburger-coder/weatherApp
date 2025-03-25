// index.js
import "./styles.css";

console.log("Start of script!")
// Function to fetch data from the visual crossings api
async function fetchData() {
    console.log("Fetching data...");
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=H8D4BTVA9F9WEDCQSV5C235VX`, {mode: 'cors'});
    const data = await response.json();
    console.log(data);
    return data;
}
fetchData();