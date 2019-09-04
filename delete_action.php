<?php
	include "function.php";
	$id = $_GET['id'];
	$type = $_GET['type'];	
	$result = deleteaction($id,$type);
	
	header("Location: ".$type.".php");	
?>