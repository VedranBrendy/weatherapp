
const key = 'ed6e54093fdd5e51ed9f9b9722d552a3';

const getWeather = async (location) => {
  const url = 'http://api.openweathermap.org/data/2.5/weather';
  const query = `?q=${location}&APPID=${key}`;

  const response = await fetch(url + query);
  const data = await response.json();
  return data;


}
