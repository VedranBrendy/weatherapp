//Define 
const locationForm = document.getElementById('form').addEventListener('submit', sendLocation);
const locationInput = document.getElementById('location');
const wetherCard = document.querySelector('.weather-card');
const weatherCardDetails = document.querySelector('.details');
const weatherCardRight = document.querySelector('.card-right');
const dayNightImg = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

/* Get favorites from DB for left card  */
getFavoritesXHR();


const updateUI = (data) => {

  const weatherDetails = data.weather;

  let temp = weatherDetails.main.temp;
  let weatherDescription = (weatherDetails.weather[0].description)
    .replace(/\b\w/g, function (l) { return l.toUpperCase() });
  let locationName = weatherDetails.name;
  let timestamp = weatherDetails.dt;
  let longitude = weatherDetails.coord.lon;
  let latitude = weatherDetails.coord.lat;
  let timzone = weatherDetails.timezone;
  let sunrise = weatherDetails.sys.sunrise;
  let sunset = weatherDetails.sys.sunset;


  /* Show icon depending on weather conditions */
  const iconSrc = `img/icons/${weatherDetails.weather[0].icon}.png`;
  icon.setAttribute('src', iconSrc);


  /* Check if icon contains d or n */
  let dayNightTextFromIcon = weatherDetails.weather[0].icon;
  let day = dayNightTextFromIcon.includes("d");
  let night = dayNightTextFromIcon.includes("n");

  /* Display day or night img at the top of the card, depending on the time of day*/
  if (day) {
    timeSrc = 'img/day.svg';
  } else if (night) {
    timeSrc = 'img/night.svg';
  }
  dayNightImg.setAttribute('src', timeSrc);

  /* 
  ** Update UI  
  */

  /* Center Card */
  weatherCardDetails.innerHTML = `
    <h5 class="my-3">${locationName}</h5>
    <div class="my-3">${weatherDetails.weather[0].main}</div>
    <div class="disply-4 my-4">
      <span>${kelvinsToFahrenheit(temp)} </span>
      <span>&deg;F</span>
    </div>
    <input class="btn btn-success btn-sm mb-3" id="favorite" value="Add to Favorites">
    `;

  /* Right Card: Detail description(with Capitalized letters), temp in C, temp in K ...   */
  weatherCardRight.innerHTML = `
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-center">
        <h4><span class="badge badge-primary">${(weatherDescription)}</span></h4>
      </li>
      <li class="list-group-item text-center">
        <h6><i class="fas fa-map-marker-alt fa-lg"></i> ${longitude}, ${latitude} </h6>
      </li>
      <li class="list-group-item text-center">
        <h6><i class="fas fa-thermometer-quarter fa-lg"></i> ${kelvinsToCelsius(temp)}<strong>&deg; C</strong></h6>
      </li>
      <li class="list-group-item text-center">
        <h6><i class="fas fa-thermometer-quarter fa-lg"></i> ${temp}<strong>&deg; K</strong></h6>
      </li>
       <li class="list-group-item text-center">
        <h6><i class="far fa-clock fa-lg"></i> ${localTime(timestamp, timzone)}</h6>
      </li>
      <li class="list-group-item text-center">
        <h6><i class="fas fa-sun fa-lg"></i><i class="fas fa-arrow-up fa-xs"></i> ${localTime(sunrise, timzone)}</h6>
      </li>
      <li class="list-group-item text-center">
        <h6><i class="fas fa-sun fa-lg"></i><i class="fas fa-arrow-down fa-xs"></i> ${localTime(sunset, timzone)}</h6>
      </li>
    </ul>
  `;

  // Remove the d-none class if present
  if (wetherCard.classList.contains('d-none') && weatherCardRight.classList.contains('d-none')) {
    wetherCard.classList.remove('d-none');
    weatherCardRight.classList.remove('d-none');
  }

  /* Save location in local sorage */
  localStorage.setItem('location', locationName);

}

/* Send input location to server */
const getLocationWeather = async (locationInput) => {

  const weather = await getWeather(locationInput);

  return {
    weather
  };

}


/* Send location from favorite list to server */
function sendLocationFromFavorites() {

  // If input field  value is empty alert message
  if (locationInput.value == "") {

    console.log("Empty");

    /*    alertModal("Insert location"); */

  }

  getLocationWeather(locationInput.value)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  locationInput.value = '';
}

/* Click target: Add to Favorites btn */
document.body.addEventListener('click', function (e) {
  if (e.target.id == 'favorite') {
    addToFavorites();
  };

  /* Click target list item  */
  if (e.target.parentElement.className === 'list-group-item favoriteLocation') {
    const listFavorite = e.target.innerText;
    addFavToInput(listFavorite);
  };

  /* Click x for delete single location from list */
  if (e.target.parentElement.className === 'float-right delete-item') {
    const item = e.target.parentElement.parentElement.innerText;
    confirmModal("Delete location?", "Delete location from list?", "Cancel", "Delete", "item", item);
    /* deleteFavoriteItem(item); */

  };

});

/* Clear all favorites in list*/
document.body.addEventListener('click', function (e) {
  if (e.target.className === 'btn btn-danger btn-sm') {

    /* var list = confirm("Delete all location from list?"); */
    var list = confirmModal("Delete list", "Delete all locations from list?", "Cancel", "Delete", "list", "");

  };
});


