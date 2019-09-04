<?php

	include 'db.php';
	ob_start();
	session_start();
	define ('file_name', basename(strtok($_SERVER["REQUEST_URI"],'?')));
	define ('server_name', $_SERVER["SERVER_NAME"]);
	
	//global alert message template
	$GLOBALS['error_template']= '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" data-dismiss="alert" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button><p class="text-danger"><strong>Error!</strong> %msg% </p></div>';
	$GLOBALS['success_template'] = '<div class="alert alert-success alert-dismissible" role="alert"><button type="button" data-dismiss="alert" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button><p class="text-success"><strong>Success!</strong> %msg% </p></div>';
	//phpmailer loading
	use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
            
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
	
	//check config settings
    if( !isset($_SESSION['user_id']) ) {
    	header("Location: login.php");
    }else{}
	
	//get mail server details from system settings
	$db = new DB();
	$conn = $db -> Connect();
	if($conn){
		//system settings
        $result = $conn->query("SHOW TABLES LIKE 'system_setting'");
        $check_row = $result->fetch(PDO::FETCH_NUM);
        if($check_row > 0){ }else{
            $sqlQuery = "CREATE TABLE system_setting (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                system_name varchar(128) DEFAULT NULL,
                system_logo blob,
                email_server varchar(255),
                email_username varchar(64),
                email_password varchar(64),
				tax_amount varchar(35)
            )";
            $conn->exec($sqlQuery);
        }
        
		$id = 1;
		$query = "SELECT * FROM system_setting where id=".$id." ";
        $result  = $conn->query($query);
        $rowCount = $result -> rowCount();
        $row = $result->fetch(PDO::FETCH_ASSOC);
        if( $rowCount > 0 ){
        	$email_server = $row['email_server'];
        	$email_username = $row['email_username'];
        	$email_password = $row['email_password'];

        	if( (!empty($email_server)) && (!empty($email_username)) && (!empty($email_password)) ){
        		define ('mail_server', $email_server);
				define ('mail_username', $email_username);
				define ('mail_password', $email_password);
        	}
        }
	}else{
		echo $conn;
	}

	//create table
  	function create_tbl(){
  		try{
			$db = new DB();
			$conn = $db -> Connect();
			if($conn){
				//echo "connected";
				/*
				$result = $conn->query("SHOW TABLES LIKE 'users'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//'tbl not exists';
				}*/
				//user tbl
				$result = $conn->query("SHOW TABLES LIKE 'users'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//'tbl not exists';
					$sqlQuery = "CREATE TABLE users (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        name VARCHAR(35) NOT NULL,
				        email VARCHAR(55),
				        username VARCHAR(35) NOT NULL,
				        password VARCHAR(255) NOT NULL,
				        user_img blob,
			            user_type INT(10) NOT NULL,
			            activation_code varchar(255)
				    )";
				    $conn->exec($sqlQuery);
				}
				$result = $conn->query("SHOW TABLES LIKE 'company'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//company tbl
				    $sqlQuery = "CREATE TABLE company (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        business_name VARCHAR(35) NOT NULL,
				        address VARCHAR(255) NOT NULL,
				        state VARCHAR(255) NOT NULL,
						province VARCHAR(255) NOT NULL,
				        company VARCHAR(35) NOT NULL,
				        phone_number VARCHAR(35) NOT NULL,
				        company_email VARCHAR(35) NOT NULL,
				        pr_cntct_name VARCHAR(55),
				        pr_cntct_email VARCHAR(55),
				        pr_cntct_phone VARCHAR(35),
				        tax_number INT
				    )";
				    $conn->exec($sqlQuery);
				}
			    
			    $result = $conn->query("SHOW TABLES LIKE 'user_type'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//user type
				    $sqlQuery = "CREATE TABLE user_type (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        type VARCHAR(40) NOT NULL
				    )";
				    $conn->exec($sqlQuery);
				}
			    
			    $result = $conn->query("SHOW TABLES LIKE 'system_setting'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//system settings
				    $sqlQuery = "CREATE TABLE system_setting (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        system_name varchar(128) DEFAULT NULL,
				  		system_logo blob
				    )";
				    $conn->exec($sqlQuery);
				}
			    
			    $result = $conn->query("SHOW TABLES LIKE 'categories'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//inventory settings
				    $sqlQuery = "CREATE TABLE categories (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        name varchar(128) DEFAULT NULL,
				  		date_added date
				    )";
				    $conn->exec($sqlQuery);
				}
			    
			    $result = $conn->query("SHOW TABLES LIKE 'varieties'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					$sqlQuery = "CREATE TABLE varieties (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        name varchar(128) DEFAULT NULL,
				  		date_added date
				    )";
				    $conn->exec($sqlQuery);
				}
			    
			    $result = $conn->query("SHOW TABLES LIKE 'variety_code'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					$sqlQuery = "CREATE TABLE variety_code (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        name varchar(128) DEFAULT NULL,
				  		date_added date
				    )";
				    $conn->exec($sqlQuery);
				}
			    

			    $result = $conn->query("SHOW TABLES LIKE 'types'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
						$sqlQuery = "CREATE TABLE types (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        name varchar(128) DEFAULT NULL,
				  		date_added date
				    )";
				    $conn->exec($sqlQuery);
				}
			    
			    $result = $conn->query("SHOW TABLES LIKE 'inventory'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//inventory tbl
				    $sqlQuery = "CREATE TABLE inventory (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        categoryID INT(11) DEFAULT NULL,
				        comapnyID INT(11) DEFAULT NULL,
				        variety_code INT(11) DEFAULT NULL,
						variety INT(11) DEFAULT NULL,
				        typeID INT(11) DEFAULT NULL,
				        transaction_date date DEFAULT NULL,
				        invoice_no INT(35) DEFAULT NULL,
				        amount INT(55) DEFAULT NULL,
				        quantity VARCHAR(55) DEFAULT NULL
				    )";
				    $conn->exec($sqlQuery);
				}

			    $result = $conn->query("SHOW TABLES LIKE 'invoice'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//inventory tbl
				    $sqlQuery = "CREATE TABLE invoice (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        comapnyID INT(11) DEFAULT NULL,
				        invoice_date date DEFAULT NULL,
				        invoice_po VARCHAR(255) DEFAULT NULL,
				        invoice_no VARCHAR(255) DEFAULT NULL,
						variety_code INT(11) DEFAULT NULL,
						variety INT(11) DEFAULT NULL,
						amount INT(55) DEFAULT NULL,
						payment_due date DEFAULT NULL,
						status INT(11) DEFAULT NULL,
						total INT(55) DEFAULT NULL,
						tax INT(55) DEFAULT NULL,
						total_due INT(55) DEFAULT NULL
				    )";
				    $conn->exec($sqlQuery);
				}
			    
			    $result = $conn->query("SHOW TABLES LIKE 'company_setting'");
				$check_row = $result->fetch(PDO::FETCH_NUM);
				if($check_row > 0){ }else{
					//company settings tbl
				    $sqlQuery = "CREATE TABLE company_setting (
				        id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
				        company_name VARCHAR(35) NOT NULL,
				        company_address VARCHAR(255) DEFAULT NULL,
				        company_phone VARCHAR(35) DEFAULT NULL,
				        company_email VARCHAR(35) DEFAULT NULL
				    )";
				    $conn->exec($sqlQuery);
				    //echo "Table created successfully!";
				}
			    
			}else{
				echo $conn;
			}
		}catch(PDOException $ex){
			echo $ex->getMessage();
		}
  	}
  	//list tables
  	function list_tables(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$tableList = array();
	        $result = $conn->query("SHOW TABLES");
	        while ($row = $result->fetch(PDO::FETCH_NUM)) {
	            $tableList[] = $row[0];
	        }
	        print_r($tableList);
		}else{
			echo $conn;
		}
  	}
  	//drop tables
  	function drop_table(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$sqlQuery = $conn->query("DROP TABLE company_setting");
	        $conn->exec($sqlQuery);
		}else{
			echo $conn;
		}
  	}
  	//list table columns
  	function list_columns(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$columnList = array();
	        $result = $conn->query("DESCRIBE company_setting");
	        while ($row = $result->fetch(PDO::FETCH_COLUMN)) {
	            $columnList[] = $row;
	        }
	        return $columnList;
		}else{
			echo $conn;
		}
  	}
  	//alter user table
  	function alter_usertbl(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			//user table
			/*$query = "ALTER TABLE users ADD user_img blob";
        	$result  = $conn->query($query);
        	$query = "ALTER TABLE users ADD user_type INT(10)";
        	$result  = $conn->query($query);
        	$query = "ALTER TABLE users ADD activation_code varchar(255)";
        	$result  = $conn->query($query);
        	//system_setting table
        	$query = "ALTER TABLE system_setting ADD email_server varchar(255)";
        	$result  = $conn->query($query);
        	$query = "ALTER TABLE system_setting ADD email_username varchar(64)";
        	$result  = $conn->query($query);
        	$query = "ALTER TABLE system_setting ADD email_password varchar(64)";
        	$result  = $conn->query($query);
        	$query = "ALTER TABLE inventory change transcation_date transaction_date date";
        	$result  = $conn->query($query);
        	$query = "ALTER TABLE system_setting ADD tax_amount varchar(35)";
        	$result  = $conn->query($query);*/
		}else{
			echo $conn;
		}
  	}

  	//fetch records
  	function fetch_action($tbl){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$result = array();
  			if($tbl == 'users'){
  				$query = "SELECT * FROM ".$tbl;
        		$result  = $conn->query($query);
        		foreach ($result as $row) {
		            echo $row['name'] . "<br>";
		            echo $row['email'] . "<br>";
		            echo $row['username'] . "<br>";
		            echo $row['password'] . "<br>";
		        }
			}
  		}else{
			echo $conn;
		}
  	}
  	//insert record
  	function insert_action($tbl){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($tbl == 'users'){
				$query = "INSERT INTO ".$tbl."(`name`, `email`,`username`, `password`) VALUES ('admin','test@email.com','admin','admin123')";
				$conn->query($query);
			}
			if($tbl == 'user_type'){
				$query = "INSERT INTO ".$tbl."(`type`) VALUES ('Admin')";
				$conn->query($query);
				$query = "INSERT INTO ".$tbl."(`type`) VALUES ('General User')";
				$conn->query($query);
				$query = "INSERT INTO ".$tbl."(`type`) VALUES ('Account Administrator')";
				$conn->query($query);
				$query = "INSERT INTO ".$tbl."(`type`) VALUES ('Sales Manager')";
				$conn->query($query);
			}
		}else{
			echo $conn;
		}

  	}

  	//general functions
  	function getvalues($id,$type){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			if($type == 'company') {
				$query = "SELECT * FROM company where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'users') {
				$query = "SELECT * FROM users where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'user_type') {
				$query = "SELECT type FROM user_type where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row['type'];
        		}
			}
			if($type == 'system_setting') {
				$query = "SELECT * FROM system_setting where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'categories') {
				$query = "SELECT * FROM categories where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'varieties') {
				$query = "SELECT * FROM varieties where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'types') {
				$query = "SELECT * FROM types where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'variety_code') {
				$query = "SELECT * FROM variety_code where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'inventory') {
				$query = "SELECT * FROM inventory where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'invoice') {
				$query = "SELECT * FROM invoice where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
			if($type == 'company_setting') {
				$query = "SELECT * FROM company_setting where id=".$id." ";
        		$result  = $conn->query($query);
        		$rowCount = $result -> rowCount();
        		$row = $result->fetch(PDO::FETCH_ASSOC);
        		if( $rowCount > 0 ){
        			return $row;
        		}
			}
		}else{
			echo $conn;
		}
  	}
  	function deleteaction($id,$type){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			if($type=="companies") {
				$query = "DELETE from `company` WHERE `id` = ".$id."";
				$conn->query($query);
				return success(3,$GLOBALS['success_template'],"Company");	
			}
			if($type=="users") {
				$query = "DELETE from `users` WHERE `id` = ".$id."";
				$conn->query($query);
				return success(3,$GLOBALS['success_template'],"User");	
			}
			if($type=="categories") {
				$query = "DELETE from `categories` WHERE `id` = ".$id."";
				$conn->query($query);
				return success(3,$GLOBALS['success_template'],"Category");	
			}
			if($type=="varieties") {
				$query = "DELETE from `varieties` WHERE `id` = ".$id."";
				$conn->query($query);
				return success(3,$GLOBALS['success_template'],"Variety");	
			}
			if($type=="types") {
				$query = "DELETE from `types` WHERE `id` = ".$id."";
				$conn->query($query);
				return success(3,$GLOBALS['success_template'],"Type");	
			}
			if($type=="varcodes") {
				$query = "DELETE from `variety_code` WHERE `id` = ".$id."";
				$conn->query($query);
				return success(3,$GLOBALS['success_template'],"Variety Code");	
			}
			if($type=="inventory") {
				$query = "DELETE from `inventory` WHERE `id` = ".$id."";
				$conn->query($query);
				return success(3,$GLOBALS['success_template'],"Inventory");	
			}
			if($type=="invoice") {
				$query = "DELETE from `invoice` WHERE `id` = ".$id."";
				$conn->query($query);
				return success(3,$GLOBALS['success_template'],"Invoice");	
			}
		}else{
			echo $conn;
		}
  	}
  	function getDropDownList($tbl,$id){
  		$db = new DB();
		$conn = $db -> Connect();
		$list = "";
		if($conn){
			if($tbl == "user_type"){
				$list = "<option value=''>Select The User Type</option>";
				$query = "SELECT * FROM ".$tbl;
				$result  = $conn->query($query);
				while($row = $result->fetch()){
					if(isset($id)) {
						if($row['id'] == $id){
							$list = $list."<option value='".$row['id']."' selected>".$row['type']."</option>";
						}else{
							$list = $list."<option value='".$row['id']."'>".$row['type']."</option>";			
						}
					}else {
						$list = $list."<option value='".$row['id']."'>".$row['type']."</option>";
					}
		        }
		        return $list;
			}
			if($tbl == "categories"){
				$list = "<option value=''>Select Category</option>";
				$query = "SELECT * FROM ".$tbl;
				$result  = $conn->query($query);
				while($row = $result->fetch()){
					if(isset($id)) {
						if($row['id'] == $id){
							$list = $list."<option value='".$row['id']."' selected>".$row['name']."</option>";
						}else{
							$list = $list."<option value='".$row['id']."'>".$row['name']."</option>";			
						}
					}else {
						$list = $list."<option value='".$row['id']."'>".$row['name']."</option>";
					}
		        }
		        return $list;
			}
			if($tbl == "company"){
				$list = "<option value=''>Select Company</option>";
				$query = "SELECT * FROM ".$tbl;
				$result  = $conn->query($query);
				while($row = $result->fetch()){
					if(isset($id)) {
						if($row['id'] == $id){
							$list = $list."<option value='".$row['id']."' selected>".$row['business_name']."</option>";
						}else{
							$list = $list."<option value='".$row['id']."'>".$row['business_name']."</option>";			
						}
					}else {
						$list = $list."<option value='".$row['id']."'>".$row['business_name']."</option>";
					}
		        }
		        return $list;
			}
			if($tbl == "variety_code"){
				$list = "<option value=''>Select Variety Code</option>";
				$query = "SELECT * FROM ".$tbl;
				$result  = $conn->query($query);
				while($row = $result->fetch()){
					if(isset($id)) {
						if($row['id'] == $id){
							$list = $list."<option value='".$row['id']."' selected>".$row['name']."</option>";
						}else{
							$list = $list."<option value='".$row['id']."'>".$row['name']."</option>";			
						}
					}else {
						$list = $list."<option value='".$row['id']."'>".$row['name']."</option>";
					}
		        }
		        return $list;
			}
			if($tbl == "varieties"){
				$list = "<option value=''>Select Variety</option>";
				$query = "SELECT * FROM ".$tbl;
				$result  = $conn->query($query);
				while($row = $result->fetch()){
					if(isset($id)) {
						if($row['id'] == $id){
							$list = $list."<option value='".$row['id']."' selected>".$row['name']."</option>";
						}else{
							$list = $list."<option value='".$row['id']."'>".$row['name']."</option>";			
						}
					}else {
						$list = $list."<option value='".$row['id']."'>".$row['name']."</option>";
					}
		        }
		        return $list;
			}
			if($tbl == "types"){
				$list = "<option value=''>Select Type</option>";
				$query = "SELECT * FROM ".$tbl;
				$result  = $conn->query($query);
				while($row = $result->fetch()){
					if(isset($id)) {
						if($row['id'] == $id){
							$list = $list."<option value='".$row['id']."' selected>".$row['name']."</option>";
						}else{
							$list = $list."<option value='".$row['id']."'>".$row['name']."</option>";			
						}
					}else {
						$list = $list."<option value='".$row['id']."'>".$row['name']."</option>";
					}
		        }
		        return $list;
			}
		}else{
			echo $conn;
		}
  	}
  	//company CRUD
  	function fetchcompany(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$data = array();
  			$query = "SELECT * FROM company";
			$result  = $conn->query($query);
			while($abc = $result->fetch()){
	            $data[] = $abc;
	        }
	        return $data;
  		}else{
			echo $conn;
		}
  	}
  	function addcompany($business_name,$address,$state,$province,$company,$phone_number,$company_email,$pr_cntct_name,$pr_cntct_email,$pr_cntct_phone,$tax_number){
  		$db = new DB();
		$conn = $db -> Connect();
  		
		if($conn){
  			if($business_name == "" ||  $address == "" || $state == "" || $province == "" || $company == "" || $phone_number == "" ||  $company_email == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "INSERT INTO company (`business_name`, `address`,`state`, `province`,`company`, `phone_number`,`company_email`, `pr_cntct_name`,`pr_cntct_email`, `pr_cntct_phone`,`tax_number`) VALUES ('".$business_name."','".$address."','".$state."','".$province."','".$company."','".$phone_number."','".$company_email."','".$pr_cntct_name."','".$pr_cntct_email."','".$pr_cntct_phone."',".$tax_number.")";
			$conn->query($query);
			$LAST_ID = $conn->lastInsertId(); 
        	return success(1,$GLOBALS['success_template'],"Company");
		}else{
			echo $conn;
		}
  	}
  	function updatecompany($companyID,$business_name,$address,$state,$province,$company,$phone_number,$company_email,$pr_cntct_name,$pr_cntct_email,$pr_cntct_phone,$tax_number){
  		$db = new DB();
		$conn = $db -> Connect();
  		
		if($conn){
  			if($companyID == "" || $business_name == "" ||  $address == "" || $state == "" || $province == "" || $company == "" || $phone_number == "" ||  $company_email == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "UPDATE `company` SET `business_name`= '".$business_name."' , `address` = '".$address."' ,`state` = '".$state."' , `province` = '".$province."' ,`company` = '".$company."' , `phone_number` =  '".$phone_number."' ,`company_email` = '".$company_email."' , `pr_cntct_name` =  '".$pr_cntct_name."' ,`pr_cntct_email` =  '".$pr_cntct_email."' , `pr_cntct_phone` =  '".$pr_cntct_phone."' ,`tax_number` =  ".$tax_number."  WHERE `id` = ".$companyID." ";
			$conn->query($query);
        	return success(2,$GLOBALS['success_template'],"Company");
		}else{
			echo $conn;
		}
  	}

	//user CRUD
  	function fetchuser(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$data = array();
			$data1 = array();
  			$query = "SELECT * FROM users";
			$result  = $conn -> query($query);
			while($abc = $result -> fetch()){
	            $data[] = $abc;

	            $data1[]=array(
					'user_id'=>$abc["id"],
					'name'=>$abc["name"],
					'email'=>$abc["email"],
					'type'=>$abc["user_type"],
					'activation_code'=>$abc["activation_code"],
					'password'=>$abc["password"],
				);
	        }
	        //print_r($data1);
	        return $data;
  		}else{
			echo $conn;
		}
  	}
  	function adduser($user_name,$user_email,$user_img,$uname,$upwd,$user_type){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($user_name == "" ||  $uname == "" || $upwd == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "INSERT INTO users (`name`, `email`,`username`, `password`,`user_img`, `user_type`) VALUES ('".$user_name."','".$user_email."','".$uname."','".$upwd."','".$user_img."',".$user_type.")";
			$conn->query($query);
			$LAST_ID = $conn->lastInsertId(); 
			/*
			//send mail to user
		    
		    $udata = getvalues(1,'system_setting');
            $company_name = $udata['system_name'];
            $image_data = $udata['system_logo'];
            $path = 'data:image/jpeg;base64,'.base64_encode($image_data);
            $mail = new PHPMailer(true); 
            try {
                //Server settings
                $mail->SMTPDebug = 2;                                 // Enable verbose debug output
                $mail->isSMTP();                                      // Set mailer to use SMTP
                $mail->Host = mail_server;  // Specify main and backup SMTP servers
                $mail->SMTPAuth = true;                               // Enable SMTP authentication
                $mail->Username = mail_username;                 // SMTP username
                $mail->Password = mail_password;                           // SMTP password
                $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                $mail->Port = 587;                                    // TCP port to connect to
                
                $mail->SMTPKeepAlive = true;   
                $mail->Mailer = “smtp”;

                //Recipients
                $mail->setFrom('', server_name);
    			$mail->addAddress($user_email, $user_name);               // Name is optional
            
                //Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'Welcome to '.$company_name;
                $mail->Body    = '<h3>Welcome '.$user_name.',</h3><p>Here is the login details:</p><p><b>Username:</b> '.$uname.'</p><p><b>Password:</b> '.$upwd.'</p><p><b>Access Link:</b> '.server_name.'</p><br/><b>Regards,<br/></b>'.$company_name .' Team';
            
                $mail->send();
                //echo 'Message has been sent';
            } catch (Exception $e) {
                //echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
            }*/
            return success(1,$GLOBALS['success_template'],"User");
		}else{
			echo $conn;
		}
  	}
  	function updateuser($userID,$user_name,$user_email,$uname,$upwd,$user_type){
  		$db = new DB();
		$conn = $db -> Connect();
  		
		if($conn){
  			if($user_name == "" ||  $uname == "" || $upwd == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "UPDATE `users` SET `name`= '".$user_name."' , `email` = '".$user_email."' ,`username` = '".$uname."' , `password` = '".$upwd."' ,`user_type` =  ".$user_type."  WHERE `id` = ".$userID." ";
			$conn->query($query);
        	return success(2,$GLOBALS['success_template'],"User");
		}else{
			echo $conn;
		}
  	}

  	//system settings CRUD
  	function modifysystemsettings($system_name,$system_logo,$email_server,$email_username,$email_password){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$id = 1;
			$query = "SELECT * FROM system_setting where id=".$id." ";
        	$result  = $conn->query($query);
        	$rowCount = $result -> rowCount();
        	$row = $result->fetch(PDO::FETCH_ASSOC);
        	if( $rowCount > 0 ){
        		if($system_name == "" ||  $system_logo == "") {
					return errors(1,$GLOBALS['error_template']);
				}
				$update_query = "UPDATE `system_setting` SET `system_name`= '".$system_name."' , `system_logo` = '".$system_logo."',`email_server`= '".$email_server."' , `email_username` = '".$email_username."', `email_password` = '".$email_password."' WHERE `id` = ".$id." ";
				$conn->query($update_query);
	        	return success(2,$GLOBALS['success_template'],"System Setting");

        	}else{
        		if($system_name == "" ||  $system_logo == "") {
					return errors(1,$GLOBALS['error_template']);
				}
				$insert_query = "INSERT INTO system_setting (`system_name`, `system_logo`,`email_server`, `email_username`,`email_password`) VALUES ('".$system_name."','".$system_logo."','".$email_server."','".$email_username."','".$email_password."')";
				$conn->query($insert_query);
				$LAST_ID = $conn->lastInsertId(); 
	        	return success(1,$GLOBALS['success_template'],"System Setting");
        	}
		}else{
			echo $conn;
		}
  	}

  	//system settings -Tax Amount CRUD
  	function taxsettings($tax_amount){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$id = 1;
			$query = "SELECT * FROM system_setting where id=".$id." ";
        	$result  = $conn->query($query);
        	$rowCount = $result -> rowCount();
        	$row = $result->fetch(PDO::FETCH_ASSOC);
        	if( $rowCount > 0 ){
        		if($tax_amount == "") {
					return errors(1,$GLOBALS['error_template']);
				}
				$update_query = "UPDATE `system_setting` SET `tax_amount`= '".$tax_amount."' WHERE `id` = ".$id." ";
				$conn->query($update_query);
	        	return success(2,$GLOBALS['success_template'],"Tax Setting");

        	}else{
        		if($tax_amount == "") {
					return errors(1,$GLOBALS['error_template']);
				}
				$insert_query = "INSERT INTO system_setting (`tax_amount`) VALUES ('".$tax_amount."')";
				$conn->query($insert_query);
				$LAST_ID = $conn->lastInsertId(); 
	        	return success(1,$GLOBALS['success_template'],"Tax Setting");
        	}
		}else{
			echo $conn;
		}
  	}

  	//company settings CRUD
  	function companysettings($company_name,$company_address,$company_phone,$company_email){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$id = 1;
			$query = "SELECT * FROM company_setting where id=".$id." ";
        	$result  = $conn->query($query);
        	$rowCount = $result -> rowCount();
        	$row = $result->fetch(PDO::FETCH_ASSOC);
        	if( $rowCount > 0 ){
        		if($company_name == "") {
					return errors(1,$GLOBALS['error_template']);
				}
				$update_query = "UPDATE `company_setting` SET `company_name`= '".$company_name."', `company_address`= '".$company_address."', `company_phone`= '".$company_phone."', `company_email`= '".$company_email."' WHERE `id` = ".$id." ";
				$conn->query($update_query);
	        	return success(2,$GLOBALS['success_template'],"Company Setting");

        	}else{
        		if($company_name == "") {
					return errors(1,$GLOBALS['error_template']);
				}
				$insert_query = "INSERT INTO company_setting (`company_name`, `company_address`, `company_phone`, `company_email`) VALUES ('".$company_name."', '".$company_address."', '".$company_phone."', '".$company_email."')";
				$conn->query($insert_query);
				$LAST_ID = $conn->lastInsertId(); 
	        	return success(1,$GLOBALS['success_template'],"Company Setting");
        	}
		}else{
			echo $conn;
		}
  	}

  	//category CRUD
  	function fetchcategories(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$data = array();
  			$query = "SELECT * FROM categories";
			$result  = $conn -> query($query);
			while($abc = $result -> fetch()){
	            $data[] = $abc;
	        }
	        return $data;
  		}else{
			echo $conn;
		}
  	}
  	function addcategory($cat_name){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($cat_name == "") {
				return errors(1,$GLOBALS['error_template']);
			}
    		$now = date('Y-m-d H:i:s');
			$query = "INSERT INTO categories (`name`, `date_added`) VALUES ('".$cat_name."','".$now."')";
			$conn->query($query);
			$LAST_ID = $conn->lastInsertId(); 

            return success(1,$GLOBALS['success_template'],"Category");
		}else{
			echo $conn;
		}
  	}
  	function updatecategory($catID,$cat_name){
  		$db = new DB();
		$conn = $db -> Connect();
  		
		if($conn){
  			if($cat_name == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "UPDATE `categories` SET `name`= '".$cat_name."' WHERE `id` = ".$catID." ";
			$conn->query($query);
        	return success(2,$GLOBALS['success_template'],"Category");
		}else{
			echo $conn;
		}
  	}

  	//variety CRUD
  	function fetchvarieties(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$data = array();
  			$query = "SELECT * FROM varieties";
			$result  = $conn -> query($query);
			while($abc = $result -> fetch()){
	            $data[] = $abc;
	        }
	        return $data;
  		}else{
			echo $conn;
		}
  	}
  	function addvariety($var_name){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($var_name == "") {
				return errors(1,$GLOBALS['error_template']);
			}
    		$now = date('Y-m-d H:i:s');
			$query = "INSERT INTO varieties (`name`, `date_added`) VALUES ('".$var_name."','".$now."')";
			$conn->query($query);
			$LAST_ID = $conn->lastInsertId(); 

            return success(1,$GLOBALS['success_template'],"Variety");
		}else{
			echo $conn;
		}
  	}
  	function updatevariety($varID,$var_name){
  		$db = new DB();
		$conn = $db -> Connect();
  		
		if($conn){
  			if($var_name == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "UPDATE `varieties` SET `name`= '".$var_name."' WHERE `id` = ".$varID." ";
			$conn->query($query);
        	return success(2,$GLOBALS['success_template'],"Variety");
		}else{
			echo $conn;
		}
  	}

  	//type CRUD
  	function fetchtypes(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$data = array();
  			$query = "SELECT * FROM types";
			$result  = $conn -> query($query);
			while($abc = $result -> fetch()){
	            $data[] = $abc;
	        }
	        return $data;
  		}else{
			echo $conn;
		}
  	}
  	function addtype($type_name){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($type_name == "") {
				return errors(1,$GLOBALS['error_template']);
			}
    		$now = date('Y-m-d H:i:s');
			$query = "INSERT INTO types (`name`, `date_added`) VALUES ('".$type_name."','".$now."')";
			$conn->query($query);
			$LAST_ID = $conn->lastInsertId(); 

            return success(1,$GLOBALS['success_template'],"Type");
		}else{
			echo $conn;
		}
  	}
  	function updatetype($typeID,$type_name){
  		$db = new DB();
		$conn = $db -> Connect();
  		
		if($conn){
  			if($type_name == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "UPDATE `types` SET `name`= '".$type_name."' WHERE `id` = ".$typeID." ";
			$conn->query($query);
        	return success(2,$GLOBALS['success_template'],"Type");
		}else{
			echo $conn;
		}
  	}

  	//Variety Code(varcodes) CRUD
  	function fetchvarcodes(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$data = array();
  			$query = "SELECT * FROM variety_code";
			$result  = $conn -> query($query);
			while($abc = $result -> fetch()){
	            $data[] = $abc;
	        }
	        return $data;
  		}else{
			echo $conn;
		}
  	}
  	function addvarcode($varcode_name){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($varcode_name == "") {
				return errors(1,$GLOBALS['error_template']);
			}
    		$now = date('Y-m-d H:i:s');
			$query = "INSERT INTO variety_code (`name`, `date_added`) VALUES ('".$varcode_name."','".$now."')";
			$conn->query($query);
			$LAST_ID = $conn->lastInsertId(); 

            return success(1,$GLOBALS['success_template'],"Variety Code");
		}else{
			echo $conn;
		}
  	}
  	function updatevarcode($varcodeID,$varcode_name){
  		$db = new DB();
		$conn = $db -> Connect();
  		
		if($conn){
  			if($varcode_name == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "UPDATE `variety_code` SET `name`= '".$varcode_name."' WHERE `id` = ".$varcodeID." ";
			$conn->query($query);
        	return success(2,$GLOBALS['success_template'],"Variety Code");
		}else{
			echo $conn;
		}
  	}
  	//inventory CRUD
  	function fetchinventory(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$data = array();
  			$query = "SELECT * FROM inventory";
			$result  = $conn -> query($query);
			while($abc = $result -> fetch()){
	            $data[] = $abc;
	        }
	        return $data;
  		}else{
			echo $conn;
		}
  	}
  	function addinventory($inv_cat,$inv_company,$inv_varcode,$inv_variety,$inv_type,$trans_date,$inv_no,$inv_amnount,$inv_quantity){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($inv_cat == "" ||  $inv_company == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "INSERT INTO inventory (`categoryID`, `comapnyID`,`variety_code`, `variety`,`typeID`, `transaction_date`, `invoice_no`,`amount`, `quantity`) VALUES (".$inv_cat.",".$inv_company.",".$inv_varcode.",".$inv_variety.",".$inv_type.",'".$trans_date."',".$inv_no.",".$inv_amnount.",'".$inv_quantity."')";
			$conn->query($query);
			$LAST_ID = $conn->lastInsertId(); 

            return success(1,$GLOBALS['success_template'],"Inventory");
		}else{
			echo $conn;
		}
  	}
  	function updateinventory($invID,$inv_cat,$inv_company,$inv_varcode,$inv_variety,$inv_type,$trans_date,$inv_no,$inv_amnount,$inv_quantity){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($inv_cat == "" ||  $inv_company == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "UPDATE `inventory` SET `categoryID`= ".$inv_cat." , `comapnyID` = ".$inv_company." ,`variety_code` = ".$inv_varcode." , `variety` = ".$inv_variety." ,`typeID` =  ".$inv_type.", `transaction_date`= '".$trans_date."' , `invoice_no` = ".$inv_no.",`amount`= ".$inv_amnount." , `quantity` = '".$inv_quantity."'  WHERE `id` = ".$invID." ";
			$conn->query($query);
        	return success(2,$GLOBALS['success_template'],"Inventory");
		}else{
			echo $conn;
		}
  	}

  	//invoice CRUD
  	function fetchinvoice(){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
			$data = array();
  			$query = "SELECT * FROM invoice";
			$result  = $conn -> query($query);
			while($abc = $result -> fetch()){
	            $data[] = $abc;
	        }
	        return $data;
  		}else{
			echo $conn;
		}
  	}
  	function addinvoice($inv_company,$invoice_date,$invoice_po,$inv_no,$inv_varcode,$inv_variety,$inv_amnount,$payment_due,$status,$total,$tax,$total_due){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($inv_company == "" ||  $inv_amnount == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "INSERT INTO invoice (`comapnyID`,`invoice_date`, `invoice_po`,`invoice_no`, `variety_code`, `variety`,`amount`, `payment_due`,`status`,`total`, `tax`,`total_due`) VALUES (".$inv_company.",'".$invoice_date."','".$invoice_po."','".$inv_no."',".$inv_varcode.",".$inv_variety.",".$inv_amnount.",'".$payment_due."',".$status.",".$total.",".$tax.",".$total_due.")";
			$conn->query($query);
			$LAST_ID = $conn->lastInsertId(); 
			
            //return success(1,$GLOBALS['success_template'],"Invoice");
            
            $db_status = success(1,$GLOBALS['success_template'],"Invoice");
            $insert_id = $LAST_ID;
            if(!empty($insert_id)){
            	$download = 1;
            }
            if(!empty($download)){
            	return array($db_status, $insert_id, $download);
            }else{
            	return success(1,$GLOBALS['success_template'],"Invoice");
            }
			
            
		}else{
			echo $conn;
		}
  	}
  	function updateinvoice($invID,$inv_company,$invoice_date,$invoice_po,$inv_no,$inv_varcode,$inv_variety,$inv_amnount,$payment_due,$status,$total,$tax,$total_due){
  		$db = new DB();
		$conn = $db -> Connect();
		if($conn){
  			if($inv_company == "" ||  $inv_amnount == "") {
				return errors(1,$GLOBALS['error_template']);
			}
			$query = "UPDATE `invoice` SET `comapnyID` = ".$inv_company." ,`invoice_date` = '".$invoice_date."' , `invoice_po` = '".$invoice_po."' ,`invoice_no` =  '".$inv_no."', `variety_code`= ".$inv_varcode." , `variety` = ".$inv_variety.",`amount`= ".$inv_amnount." , `payment_due` = '".$payment_due."',`status` = ".$status." ,`total` = ".$total." , `tax` = ".$tax." ,`total_due` =  ".$total_due."  WHERE `id` = ".$invID." ";
			$conn->query($query);
        	return success(2,$GLOBALS['success_template'],"Invoice");
		}else{
			echo $conn;
		}
  	}

  	//alert message
  	function errors($error_code,$error_template) {
		switch($error_code) {
			case 1:
				return str_replace("%msg%","All fields are required.",$error_template);
				break;	
		}
	}
	function success($success_code,$success_template,$tite) {
		switch($success_code) {
			case 1:
				return str_replace("%msg%",str_replace("%title%",$tite,"%title% is Added successfully."),$success_template);
				break;
			case 2 :
				return str_replace("%msg%",str_replace("%title%",$tite,"%title% is updated successfully."),$success_template);
				break;
			case 3 :
				return str_replace("%msg%",str_replace("%title%",$tite,"%title% is deleted successfully."),$success_template);
				break;
		}
	}
