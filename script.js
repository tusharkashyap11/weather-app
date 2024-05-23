let toggle = false;
async function getWeather(location) {
    const response = await fetch('http://api.weatherapi.com/v1/current.json?key=c79d288340ee4cc7a62114856242804&q=' + location, {mode: 'cors'});
    const weatherData = await response.json();
    weatherInfo(weatherData);
}
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = document.getElementById('location').value;
    getWeather(input);
})
function weatherInfo(obj) {
    const divToRemove = document.querySelector('.weatherinfo');
    if (divToRemove) {
        divToRemove.remove();
    }   
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const img = document.createElement('img');
    const button = document.createElement('button');
    button.innerHTML = "Change Temp";
    button.addEventListener('click', changeTemp);
    img.src = obj.current.condition.icon;
    const p = document.createElement('p');
    p.className = 'temp';
    div.append(img)
    div.append(createItem(obj.current.condition.text));
    if (toggle) {
        p.textContent = obj.current.temp_f + " °F";
        div.append(p);
    } else {
        p.textContent = obj.current.temp_c + " °C";
        div.append(p);
    }
    div.append(createItem(obj.location.name + ", " + obj.location.region + ", " + obj.location.country));
    div.append(createItem(obj.location.localtime));
    div.append(button);
    div.className = 'weatherinfo';
    body.append(div);
    function changeTemp() {
        toggle = !toggle;
        weatherInfo(obj);
    }
}
function createItem(x) {
    const item = document.createElement('p');
    item.textContent = x;
    return item;
}