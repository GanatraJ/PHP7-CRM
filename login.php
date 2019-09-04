<?php 
    //include 'function.php';
    include 'db.php';
    ob_start();
    session_start();
    $output = '';

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
        }    
    }else{ echo $conn; }
    
    //user tbl
    $result1 = $conn->query("SHOW TABLES LIKE 'users'");
    $check_row = $result1->fetch(PDO::FETCH_NUM);
    if($check_row > 0){ }else{
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
    //user type
    $result2 = $conn->query("SHOW TABLES LIKE 'user_type'");
    $check_row = $result2->fetch(PDO::FETCH_NUM);
    if($check_row > 0){ }else{
        $sqlQuery = "CREATE TABLE user_type (
            id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            type VARCHAR(40) NOT NULL
        )";
        $conn->exec($sqlQuery);
    }
    $query = "SELECT * FROM user_type";
    $result3  = $conn->query($query);
    $rowCount = $result3 -> rowCount();
    $row = $result3->fetch(PDO::FETCH_ASSOC);
    if( $rowCount > 0 ){}else{
        $query = "INSERT INTO user_type (`type`) VALUES ('Admin')";
        $conn->query($query);
        $query = "INSERT INTO user_type (`type`) VALUES ('General User')";
        $conn->query($query);
        $query = "INSERT INTO user_type (`type`) VALUES ('Account Administrator')";
        $conn->query($query);
        $query = "INSERT INTO user_type (`type`) VALUES ('Sales Manager')";
        $conn->query($query);
    }
    $query = "SELECT * FROM users";
    $result4  = $conn->query($query);
    $rowCount = $result4 -> rowCount();
    $row = $result4->fetch(PDO::FETCH_ASSOC);
    if( $rowCount > 0 ){}else{
        $query = "INSERT INTO users (`name`, `email`,`username`, `password`,`user_type`) VALUES ('admin','test@email.com','admin','admin123',1)";
        $conn->query($query);
    }

    if(isset($_POST['login']))
    {
        $username = $_POST['username'];
        $pwd = $_POST['password'];

        $db = new DB();
        $conn = $db -> Connect();
        if($conn){
            //echo 'connected<br/>';
            if($username=="" || $pwd=="") {
                return errors(1,$GLOBALS['error_template']);
            }else{
                $query = "SELECT * FROM users where username='".$username."' and password='".$pwd."' ";
                $result  = $conn->query($query);
                $rowCount = $result -> rowCount();
                
                $row = $result->fetch(PDO::FETCH_ASSOC);
                if( $rowCount > 0 ){
                    //$_SESSION['session'] = true ;
                    $_SESSION['user_id'] = $row['id'];
					$_SESSION['name'] = $row['name'];
                    
                    $_SESSION['user_type'] = $row['user_type'];

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
                                    <input class="form-control center-block login-placeholder-text square-form-field" type="text" name="username" placeholder="username..." onBlur="updateLogin()" value="" />
                                    <span class="field-validation-valid text-danger" data-valmsg-for="Email" data-valmsg-replace="true"></span>
                                </div>
                            </div>
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
                                <div class="half-col">
                                   <div class="checkbox text-center vertical-align">
                                    <label style = "padding-left: 0px;">
                                        <input data-val="true" data-val-required="The Remember me field is required." id="login-remember-checkbox" name="RememberMe" type="checkbox" value="true" /><input name="RememberMe" type="hidden" value="false" />
                                        <span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
                                    </label>
                                    <label for="login-remember-checkbox" style="padding-left: 0px;">Remember me</label>
                                </div>                                
                                
                            </div>
                            <div class="half-col">
                                <div class="">
                                    <h6></h6>
                                    <h6><span class="text-center login-links" id="login-forgot-password"><a href="forgot-password.php">Forgot password</a></span></h6>
                                </div>                                
                            </div>                                
                        </div>
                        <div class="form-group">
                            <button type="submit" name="login" class="btn btn-dark btn-block">
                                Log in <i class="fa fa-long-arrow-right"></i>
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