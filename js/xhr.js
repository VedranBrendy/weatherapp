/* Get favorites from DB */
function getFavoritesXHR() {
  //Ajax to get data from DB
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'getFavorites.php', true);
  xhr.onload = function () {

    if (this.status == 200) {

      document.getElementById('favorites').innerHTML = this.responseText;

    }
  }
  xhr.send();
}

/* Add favorites to DB */
function addToFavoritesXHR(locationFromLS) {

  let xhr = new XMLHttpRequest();
  var params = "result=" + locationFromLS;
  xhr.open('POST', 'saveFavorites.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    //If response successful -alert success
    if (xhr.readyState == 4 && xhr.status == 200) {


      if (this.responseText === "exist") {

        alertModal(locationFromLS + " already saved in favorites list");

      } else if (this.responseText === '1') {

        //on success get new data from database
        getFavoritesXHR();

      }
      //If cancelled show alert message - testig purpose
      else if (this.responseText === '0') {
        console.log(this.responseText + 'eror');

      }

    }
  }
  xhr.send(params);
}

/* Delete favorites list from DB */
function deleteFavoritesXHR(list) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'deleteFavorites.php?list=' + list, true);
  xhr.onload = function () {

    if (xhr.readyState == 4 && xhr.status == 200) {

      if (this.responseText === '1') {
        //If response successful, get new data from database

        getFavoritesXHR();

      } else {
        console.log(this.responseText + 'eror');
      }
    }
  }
  xhr.send();
}
/*  Delete single location from favorites list */
function deleteFavoriteItem(item) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'deleteFavorites.php?item=' + item, true);
  xhr.onload = function () {

    if (xhr.readyState == 4 && xhr.status == 200) {

      if (this.responseText === '1') {

        //If response successful, get new data from database
        getFavoritesXHR();

      } else {
        alert(this.responseText + 'eror');
      }
    }
  }
  xhr.send();
}