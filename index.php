<?php
  // Init session
  session_start();

  // Include db config
  require_once 'db.php';

  // Validate login
  if(!isset($_SESSION['email']) || empty($_SESSION['email'])){
    header('location: login.php');
    exit;
  }
?>
<?php 

  //Require navbar
  require_once 'layout/navbar.php';

  //Require header
  require_once 'layout/header.php';
  //Save sesion in variables
  $user_id = $_SESSION['id']; 
  $username = $_SESSION['name']; 

?>
<div class="col-md-12">
  <div class="card card-body bg-light mt-5">
    <h2>WeatherApp <small class="text-muted"><?php echo $username;?></small></h2>
    <!--  <p>Welcome to the dashboard <?php echo $username; ?></p> -->
    <div class="row my-3">
        <div class="col-md-4 offset-md-4">
        <form id="form" class="form-inline" accept-charset="UTF-8" method="REQUEST">
          <div class="input-group flex-fill">
            <input type="text" name="location" id="location" placeholder="Enter location" class="form-control">
            <div class="input-group-append">
              <input type="submit" value="Search" class="btn btn-primary mx-1">
            </div> 
          </div>
        </form>
        </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div id="favorites"></div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-lg rounded weather-card d-none">
          <img src="https://via.placeholder.com/400x200" class="time card-img-top">
          <div class="icon bg-light mx-auto text-center">
            <!-- icon -->
            <img src="" alt="">
          </div>
          <div class="text-muted text-uppercase text-center details">
            <h5 class="my-3" id="city">City name</h5>
            <div class="my-3" id="weather">Weather condition</div>
            <div class="disply-4 my-4">
              <span>temp </span>
              <span>&deg;c</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
      <div class="card border-dark bg-light card-right d-none">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item"><h6>Lorem, ipsum dolor.</h6></li>
        </ul>
      </div>
      </div>
    </div>
  </div>
</div>

<?php 
//Require footer
  require_once 'layout/footer.php';

?>