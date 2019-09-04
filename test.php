<?php
	/*include 'db.php';

	try{
		$db = new DB();
		$conn = $db -> Connect();

		if($conn){
			echo "connected";
		}else{
			echo $conn;
		}
	}catch(PDOException $ex){
		echo $ex->getMessage();
	}*/
	include "function.php";
	if( !isset($_SESSION['user_id']) ) {
    	echo 'not';
    }else{
		echo 'yes '.$_SESSION['user_id'];
    }
    if( !isset($_SESSION['id']) ) {
    	echo 'not id';
    }else{
		echo 'yes id: '.$_SESSION['id'];
    }