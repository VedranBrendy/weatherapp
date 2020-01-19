<?php 
//Init session
session_start();
// Include DB
include_once("db.php");

$user_id =  $_SESSION['id'];

/* If isset list, delete entire list from DB */
if(isset($_GET['list'])){ 

    $list = $_GET['list'];
    // Delete query
    $sql = "DELETE FROM favorites WHERE user_id = :user_id";

	 	$stmt = $pdo->prepare($sql);
	  $stmt->bindParam(":user_id", $user_id); 
	  $result = $stmt->execute(); 
      //Echo for response
      if ($result) {
          echo '1';
      } else {
          echo '0';
      } 
// If isset item, delete single item from DB
}elseif (isset($_GET['item'])) {

   $item = $_GET['item'];
    // Delete query
    $sql = "DELETE FROM favorites WHERE user_id = :user_id AND favorites_location = :item";
	 	$stmt = $pdo->prepare($sql);
	  $stmt->bindParam(":user_id", $user_id); 
	  $stmt->bindParam(":item", $item); 
	  $result = $stmt->execute(); 
      //Echo for response
      if ($result) {
          echo '1';
      } else {
          echo '0';
      } 
}


?>