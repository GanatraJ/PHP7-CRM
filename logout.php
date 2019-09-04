<?php
	// clear and unset all session data and redirect to login page
	session_start();
	session_destroy();
	session_unset();
	unset ($_SESSION['session']);
	unset($_SESSION['user_id']);
	header("Location:login.php");