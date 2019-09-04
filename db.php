<?php
	//open and close the connection to database
	class DB{
		//protected $conn = null;
		protected $conn = null;

		public function Connect(){
			try{
				$dsn = 'mysql:dbname=php7_crm; host=localhost';
				$user = 'root';
				$password = '';

				$options = array(
							PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
							PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, 
							);

				$this->conn = new PDO($dsn,$user,$password,$options);
				return $this->conn;
			}catch(PDOException $e){
				echo 'Connection Error: '.$e->getMessage();
			}
		}
		
		public function close(){
			$this->conn = null;
		}	
	}
