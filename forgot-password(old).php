<?php
	include 'db.php';
    ob_start();
    session_start();

    //mail server details
    define ('server_name', $_SERVER["SERVER_NAME"]);
	define ('mail_server', 'srv01.repsmartcrm.com');
	define ('mail_username', 'vanapp@vanapp.amdev.ca');
	define ('mail_password', '#232bcHGz34!$');

    $output = '';
    $system_name = '';

    //phpmailer loading
	use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
            
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
	

    //fetch system logo
    $db = new DB();
    $conn = $db -> Connect();
    if($conn){
        $systemid = 1;
        $logo_query = "SELECT * FROM system_setting where id=".$systemid." ";
        $logo_result  = $conn->query($logo_query);
        $logo_rowCount = $logo_result -> rowCount();
        $logo_row = $logo_result->fetch(PDO::FETCH_ASSOC);
        if( $logo_rowCount > 0 ){
            $logo = $logo_row['system_logo'];
            $system_name = $logo_row['system_name'];
        }    
    }else{ echo $conn; }

    /*generate random code*/
	
	function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    if(isset($_POST['login']))
    {
        $useremail = $_POST['useremail'];
        
        $db = new DB();
        $conn = $db -> Connect();
        if($conn){
            //echo 'connected<br/>';
            if($useremail == "") {
                //return errors(1,$GLOBALS['error_template']);
            }else{
                $query = "SELECT * FROM users where email='".$useremail."' ";
                $result  = $conn->query($query);
                $rowCount = $result -> rowCount();
                
                $row = $result->fetch(PDO::FETCH_ASSOC);
                if( $rowCount > 0 ){
                    
                    //generate random string to verify
                    $code = generateRandomString();
                	$active_code = $code;

                	$updatequery = "UPDATE users SET activation_code = '".$code."' WHERE email = '".$useremail."' ";
					$conn->query($updatequery);

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
		                $mail->setFrom('vanapp@vanapp.amdev.ca', server_name);
		    			$mail->addAddress($useremail);               // Name is optional
		            
		                //Content
		                $mail->isHTML(true);                                  // Set email format to HTML
		                $mail->Subject = 'Password Change Request';
		                $resetPassLink = server_name.'/crm/reset-password.php?uemail='.$useremail.'&code='.$active_code;
                
                		$mail->Body    = 'Hello,<br/> 
				                <br/>Recently a request was submitted to reset a password for your account. If this was a mistake, just ignore this email and nothing will happen.<br/>
				                <br/>To reset your password, visit the following link: <a href="'.$resetPassLink.'">Reset My Password</a>
				                <br/><br/>Regards,
				                <br/>'.server_name;
		            
		                $mail->send();
		                //echo 'Message has been sent';
                        $output = '<div class="alert alert-success alert-dismissible" role="alert"><button type="button" data-dismiss="alert" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button><p class="text-success"><strong>Success!</strong> Email Sent Successfully </p></div>';
		            } catch (Exception $e) {
		                //echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
		            }

                }
            }
        }else{
            echo $conn;
        }
        //echo 'output: '.$output.' session id: '.$_SESSION['user_id'];
   	}
?>
<!doctype html>
<html lang="en">
    <?php include "head.php" ?>
    <body>
    	<div class="container">
    		<div class="row">
    			<div class="col-sm-3 center-block clearfix" id="login-container">
    				<div id="login-logo-bar">
    					<?php if(isset($logo)){ ?>
    					<img id="login-logo-img" src="data:image/jpeg;base64,<?php echo base64_encode( $logo ); ?>" height="70" />
    					<?php }else{ ?>
    					<img id="login-logo-img" src="./assets/images/logo-bw.png" height="80" />
    					<?php } ?>
    				</div>
    				<section id="loginForm">
                        <?php echo $output; ?>
    					<form action="" class="form-horizontal" id="fpwd-form" method="post" role="form">
    						<div class="form-group">
    							<div class="login-input-fields">
    								<input class="form-control center-block login-placeholder-text square-form-field" type="text" name="useremail" placeholder="useremail..." value="" />
    							</div>
    						</div>
    						<div class="form-group">
    							<button type="submit" name="login" class="btn btn-dark btn-block">
    								Reset Password<i class="fa fa-long-arrow-right"></i>
    							</button>   
    						</div>
    					</form>
    				</section>
    			</div>
    		</div>
    	</div>
    	<?php include "footer.php"; ?>
	</body>
</html>