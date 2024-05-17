const city = 'agra';
const img = document.querySelector('img');
async function getWeather(location) {
    const response = await fetch('http://api.weatherapi.com/v1/current.json?key=c79d288340ee4cc7a62114856242804&q=' + location, {mode: 'cors'});
    const weatherData = await response.json();
    console.log(weatherData);

    weatherInfo(weatherData);
}
function weatherInfo(obj) {
    const div = document.querySelector('.weatherinfo');
    div.append(createItem("Weather", obj.current.condition.text));
    div.append(createItem("Temperature", obj.current.temp_c + " °C"));
    div.append(createItem("Location", obj.location.name + ", " + obj.location.region + ", " + obj.location.country));
    div.append(createItem("Date & Time", getDateAndTime()));
}
function getDateAndTime() {
    const now = new Date();
    const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
    };
    const formattedDateTime = now.toLocaleString('en-US', options);
    return formattedDateTime;
}
function createItem(x, y) {
    const item = document.createElement('p');
    item.textContent = x + ": " + y;
    return item;
}
getWeather(city);