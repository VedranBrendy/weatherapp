/* Convert Kelvins to Fahrenheit */
function kelvinsToFahrenheit(valNum) {

  valNum = parseFloat(valNum);

  let valTemp = ((valNum - 273.15) * 1.8) + 32;

  return valTemp.toFixed(2);

}

/* Convert Kelvins to Celsius */
function kelvinsToCelsius(valNum) {

  valNum = parseFloat(valNum);

  let valTemp = (valNum - 273.15);

  return valTemp.toFixed(2);

}

/* Add favorite from list to input field */
function addFavToInput(favInput) {

  locationInput.value = favInput;

  if (favInput != '') {

    sendLocationFromFavorites();

  }

}

/* Add to Favorite list */
function addToFavorites() {

  /* Get location from local storage   */
  var locationFromLS = localStorage.getItem('location');

  addToFavoritesXHR(locationFromLS);

}

/* Send input location to server  */
function sendLocation(e) {

  e.preventDefault();

  // If input field  value is empty alert message
  if (locationInput.value == "") {

    alertModal("Insert location!");

  }

  /* Get weather details from weatherappServer */
  getLocationWeather(locationInput.value)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  locationInput.value = '';

}

/* Calculate local time, sunrise & sunset for location*/
function localTime(timestamp, timzone) {
  let unix_timestamp = timestamp + (timzone) - 3600;

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().slice(-2);
  var day = (date.getDate() + 100).toString().slice(-2);

  // Create display formatt
  var formattedTime = day + "." + month + "." + year + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;

}

/* Generic Confirm before deletion */
function confirmModal(heading, question, cancelButtonTxt, okButtonTxt, deletion, content) {

  var confirmModal =
    $('<div class="modal fade" tabindex="-1" role="dialog">' +
      '<div class="modal-dialog" role="document">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title"><strong>' + heading + '</strong></h5>' +
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
      '<span aria-hidden="true">&times;</span>' +
      '</button>' +
      '</div>' +

      '<div class="modal-body">' +
      '<h5>' + question + '</h5>' +
      '</div>' +

      '<div class="modal-footer">' +
      '<a href="#!" class="btn btn-secondary" data-dismiss="modal">' +
      cancelButtonTxt +
      '</a>' +
      '<a href="#!" id="okButton" class="btn btn-danger">' +
      okButtonTxt +
      '</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>');

  confirmModal.find('#okButton').click(function (event) {

    if (deletion === "list") {
      /* Call deleteFavoritesXHR function for delete entire list*/
      deleteFavoritesXHR("list");
    } else if (deletion = "item") {
      var item = content;
      /* Call deleteFavorites function  for delete single item*/
      deleteFavoriteItem(item);

    }

    confirmModal.modal('hide');

  });

  confirmModal.modal('show');
};


/* Alert modal */
function alertModal(text) {

  var alertModal =
    $('<div class="modal fade" tabindex="-1" role="dialog">' +
      '<div class="modal-dialog" role="document">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title"> Alert </h5>' +
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
      '<span aria-hidden="true">&times;</span>' +
      '</button>' +
      '</div>' +

      '<div class="modal-body">' +
      '<h5><strong>' + text + '</strong></h5>' +
      '</div>' +

      '<div class="modal-footer">' +
      '<a href="#!" id="closeBtn" class="btn btn-secondary" data-dismiss="modal">Close </a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>');

  alertModal.find('#closeBtn').click(function (event) {

    alertModal.modal('hide');

  });

  alertModal.modal('show');
}