<?php
  //Init session
  session_start();
  //Save session in variable
  $user_id =  $_SESSION['id'];

  // Include DB
  include_once('db.php');
  
  //Get data 
  if (isset($_POST['result'])) {

  $favorites = $_POST['result'];

    /* Check if sended location already exist in DB */
    $sql = "SELECT * FROM favorites WHERE user_id = :user_id  AND favorites_location = :favorites";

    if($stmt = $pdo->prepare($sql)){
    // Bind params
      $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
      $stmt->bindParam(':favorites', $favorites, PDO::PARAM_STR);

        // Attempt to execute
        if($stmt->execute()){

          // Check if location exists in DB
          if($stmt->rowCount() === 1){
            echo "exist";
          } else {
          /* If location not exist insert in DB, insert it */
          $sql = 'INSERT INTO favorites VALUES("", :user_id, :favorites_location)';
          $stmt = $pdo->prepare($sql);
          // Bind params
          $stmt->bindParam(':user_id', $user_id, PDO::PARAM_STR);
          $stmt->bindParam(':favorites_location', $favorites , PDO::PARAM_STR);
          //Execute 
          $stmt->execute();
          //echo for response
          if ($stmt) {
              echo 1;
          } else {
              echo  0; 
          }
        }
      }
    }
  
  }

?>