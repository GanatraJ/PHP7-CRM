<?php 
    include 'db.php';
    ob_start();
    session_start();

    //mail server details
    define ('server_name', $_SERVER["SERVER_NAME"]);
    //get mail server details from system settings
    $db = new DB();
    $conn = $db -> Connect();
    if($conn){
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

    $output = '';

    //phpmailer loading
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
            
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';
    

    //fetch system logo
    /*$db = new DB();
    $conn = $db -> Connect();*/
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

    if(isset($_POST['reset']))
    {
        $useremail = $_GET['uemail'];
        $code = $_GET['code'];
        $pwd = $_POST['password']; 
        
        /*$db = new DB();
        $conn = $db -> Connect();*/
        if($conn){
            if($useremail =="" || $code =="" || $pwd =="") {
                
            }else{
                $query = "SELECT * FROM users where email='".$useremail."' and activation_code= '".$code."' ";
                $result  = $conn->query($query);
                $rowCount = $result -> rowCount();
                
                $row = $result->fetch(PDO::FETCH_ASSOC);
                if( $rowCount > 0 ){
                    $uname = $row['username'];

                    //$pwd=md5($pwd);
                    $updatequery = "UPDATE users SET password = '".$pwd."' WHERE email = '".$useremail."' ";
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
                        $mail->isHTML(true);                         // Set email format to HTML
                        $mail->Subject = 'Password Request Successfully';
                        $mail->Body    = '<h3>Hello,</h3><p>Your Password Reset Successfully</p><p>Here is the login details:</p><p><b>Username:</b> '.$uname.'</p><p><b>Password:</b> '.$pwd.'</p><p><br/><b>Regards,<br/>'.server_name;
                    
                        $mail->send();
                        //echo 'Message has been sent';
                        $output = '<div class="alert alert-success alert-dismissible" role="alert"><button type="button" data-dismiss="alert" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button><p class="text-success"><strong>Success!</strong> Password Reset Successfully </p></div>';
                    } catch (Exception $e) {
                        //echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
                    }
                    $url = 'index.php';
                    header("location:" .$url);
                }
            }
        }else{
            echo $conn;
        }
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
                        <form action="" class="form-horizontal" id="login-form" method="post" role="form">
                            <div class="form-group">
                                <div class="login-input-fields">
                                    <input class="form-control login-placeholder-text square-form-field" data-val="true" data-val-required="Password field is required." id="pass" name="password" onKeyPress="capsLock(event)" placeholder="Password..." type="password" />
                                    <div class="input-group-btn">
                                        <label class="btn btn-default" id="showPass" onClick="toggleShowPass()">
                                            <i class="glyphicon glyphicon-eye-open" style="border-radius: 0px, 7px, 7px, 0px;"></i>
                                        </label>
                                    </div>
                                </div>
                                <div class="center-block col-sm-11 login-input-fields">
                                    <span class="field-validation-valid text-danger" data-valmsg-for="Password" data-valmsg-replace="true"></span>
                                </div>
                                <div id="capsCheck" class="text-center" style="display:none">Caps Lock is on.</div>
                            </div>
                            <div class="form-group">
                                <button type="submit" name="reset" class="btn btn-dark btn-block">
                                    Reset Password <i class="fa fa-long-arrow-right"></i>
                                </button>   
                            </div>
                        </form>
                    </section>
            </div>
        </div>
    </div>
    <?php include "footer.php"; ?>
    <script>
        function capsLock(e) {
            var kc = e.keyCode ? e.keyCode : e.which;
            var sk = e.shiftKey ? e.shiftKey : ((kc == 16) ? true : false);
            if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk))
                $('#capsCheck').show();
            else
                $('#capsCheck').hide();
        }
        function updateLogin() {
            $('#ajax-field').val($('#login-email-input').val());
            $('#update-login-id').submit();
        }
        window.onload = function () {
            if ($('#login-email-input').val().length > 5) {
                updateLogin();
            }
        };
        function toggleShowPass() {
            if ($('#pass').attr("type") == "password") {
                $('#pass').attr("type", "text");
            } else {
                $('#pass').attr("type", "password");
            }
        }
    </script>
</body>
</html>