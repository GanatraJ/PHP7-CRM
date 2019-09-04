<?php
    include "function.php";
    $result = "";
    if(isset($_POST['save']))
    {
    	$userID = $_POST['userID'];
        $user_name = $_POST['user_name'];
		$user_email = $_POST['user_email'];
	    $uname = $_POST['uname'];
	    $upwd = $_POST['upwd'];
	    $user_type = $_POST['user_type'];
	    
	    $result = updateuser($userID,$user_name,$user_email,$uname,$upwd,$user_type);
    }
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
        $data = getvalues($id,'users');
        
        $user_name = $data['name'];
		$user_email = $data['email'];
	    $uname = $data['username'];
	    $upwd = $data['password'];
	    $user_type = $data['user_type'];
	    $user_img = $data['user_img'];
    }
    
?>
<!doctype html>
<html lang="en">
<?php include "head.php" ?>
<body>
	<?php 
		include "header.php";
		include "sidebar.php"; ?>
	<div class="body-content">
		<!-- PAGE CONTAINER-->
		<h2 class="main-title">Edit User</h2>            
		<div id="main-content">
			<div id="content-body">
				<div class="section__content">
					<div class="flex-container1" style="margin: 0px;">
						<?php echo $result; ?>
						<form method="post" enctype="multipart/form-data">
							<div class="flex-container cms">
								<input type="hidden" name="userID" id="userID" value="<?php echo $id; ?>">
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="user_name" name="user_name" type="text" class="input-sm square-form-field" value="<?php echo $user_name; ?>" >
										<small class="field-desc">User Name</small>
									</div>
									<div class="flex-small-item relative">
										<input id="user_email" name="user_email" type="text" class="input-sm square-form-field" value="<?php echo $user_email; ?>">
										<small class="field-desc">User Email</small>
									</div>
									<div class="flex-small-item relative">
										<input id="uname" name="uname" type="text" class="input-sm square-form-field" value="<?php echo $uname ; ?>" >
										<small class="field-desc">Username</small>
									</div>
									<div class="flex-small-item relative">
										<input id="upwd" name="upwd" type="password" class="input-sm square-form-field" value="<?php echo $upwd; ?>" >
										<small class="field-desc">Password</small>
									</div>
									<div class="flex-small-item relative">
										<select name="user_type" class="input-sm square-form-field custom-sel" id="user_type" >
											<?php echo getDropDownList('user_type',$user_type); ?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
										<small class="field-desc">User Type</small>
									</div>
								</div>
								<div class="flex-big-item"></div>
							</div>
							<div class="flex-container cms">	
								<div class="flex-small-item relative">
									<button type="submit" name="save" class="btn btn-dark btn-block">
										Update User <i class="fa fa-long-arrow-right"></i>
									</button>                                
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<!-- END PAGE CONTAINER--> 
    </div>
    <?php include "footer.php"; ?>
    <script type="text/javascript">
        $(document).ready(function(){
            var date_input=$('input[name="c_date"]'); //our date input has the name "date"
            var container=$('#content-body form').length>0 ? $('#content-body form').parent() : "body";
            date_input.datepicker({

                format: 'yyyy-mm-dd',
                /*container: container,*/
                todayHighlight: true,
                autoclose: true,
            });
        });
    </script>
</body>
</html>