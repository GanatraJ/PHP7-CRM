<?php 
	include "function.php";
	$result="";
	
	/* insert user_type & alter user table
	* insert user_type
	* insert_action('user_type');
	* alter_usertbl();
	* print_r(fetch_action('users'));
	*/
	if(isset($_POST['save']))
	{
		$user_name = $_POST['user_name'];
		$user_email = $_POST['user_email'];
	    
	    $imagename=$_FILES["user_img"]["name"];
        $file = $_FILES['user_img']['tmp_name'];
        $user_img= addslashes(file_get_contents($_FILES['user_img']['tmp_name']));

	    $uname = $_POST['uname'];
	    $upwd = $_POST['upwd'];
	    $user_type = $_POST['user_type'];
	    
	    $result = adduser($user_name,$user_email,$user_img,$uname,$upwd,$user_type);
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
                <h2 class="main-title">Add User</h2>        
		<!-- PAGE CONTAINER-->
		<div id="main-content">
			<div id="content-body">
				<div class="section__content">
					<div class="flex-container1" style="margin: 0px;">
						<?php echo $result; ?>
						<form method="post" enctype="multipart/form-data">
							<div class="flex-container cms stretch-col">
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="user_name" name="user_name" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['user_name'])){ echo $_POST['user_name'];}?>" placeholder="Enter User Name">
									</div>
									<div class="flex-small-item relative">
										<input id="user_email" name="user_email" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['user_email'])){ echo $_POST['user_email'];}?>" placeholder="Enter User Email">
									</div>
									<div class="flex-small-item relative">
										<?php if(isset($_POST['user_img'])){ ?>
										<div class="company_logo_prev">
											<img src="data:image/jpeg;base64,<?php echo base64_encode( $_POST['user_img'] ); ?>" />
										</div>
										<?php } ?>
										<input id="user_img" name="user_img" type="file" class="input-sm square-form-field">
									</div>
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<select name="user_type" class="input-sm square-form-field custom-sel" id="user_type" >
											<?php //echo getDropDownList('user_type'); 
												if(isset($_POST['user_type'])){ 
													echo getDropDownList('user_type',$_POST['user_type']); 
												}else{
													echo getDropDownList('user_type',''); 
												}
											?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
									</div>
									<div class="flex-small-item relative">
										<input id="uname" name="uname" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['uname'])){ echo $_POST['uname'];}?>" placeholder="Enter UserName">
									</div>
									<div class="flex-small-item relative">
										<input type="password" id="upwd" name="upwd" placeholder="Enter User Password" class="input-sm square-form-field"
										value="">
									</div>
								</div>
							</div>

							<div class="flex-container cms">
								<div class="flex-small-item relative">
                                    <button type="submit" name="save" class="btn btn-dark btn-block">
                                    Add User <i class="fa fa-long-arrow-right"></i>
                                 </button>    
								</div>
							</div>
						</form>
					</div>
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
            var container=$('.card-body form').length>0 ? $('.card-body form').parent() : "body";
            date_input.datepicker({
                format: 'yyyy-mm-dd',
                container: container,
                todayHighlight: true,
                autoclose: true,
            });
        });
    </script>
</body>
</html>