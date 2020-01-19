
<?php 
  //Init session
  session_start();
  //Save session in variable
  $user_id =  $_SESSION['id'];

  // Include DB
  include_once('db.php');

  // Prepare query
  $sql = 'SELECT * FROM favorites WHERE user_id = :user_id'; 

  // Prepare statement
  if($stmt = $pdo->prepare($sql)){
    // Bind params
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);

    // Attempt execute
    if($stmt->execute()){
      //If the data is more than 0, display them
      if ($stmt->rowCount() > 0) {

        ?>
          <div class="card">
            <div class="card-header">Favorites 
              <span class="float-right">
                <button class="btn btn-danger btn-sm">Clear list</button>
              </span>
            </div> 
          </div>
          <ul class="list-group list-group-flush">

          <?php

          while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $favorites = $row['favorites_location'];
            echo '<li class="list-group-item favoriteLocation">
                    <a href="#" value="'.$favorites.'">'.$favorites.'<span class="float-right delete-item">
                      <i class="fas fa-trash-alt fa-lg"></i></span>
                    </a> 
                  </li>';
    
          }

          ?>
                
          </ul>

        <?php
       
      }
      
    } else {

      die('Something went wrong');

    }
  }
  // Close statement
  unset($stmt);


// Close connection
unset($pdo);

?>