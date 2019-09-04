<?php
	include "function.php";
	/* create system table
	* create_tbl();
	* $cols = list_columns();
	* print_r($cols);
	*/
	$result="";

	$data = getvalues(1,'system_setting');
	if( !empty($data)){
		$system_name = $data['system_name'];
    	$system_logo = $data['system_logo'];
    	$email_server = $data['email_server'];
    	$email_username = $data['email_username'];
    	$email_password = $data['email_password'];
	}

	if(isset($_POST['save']))
	{
		$system_name = $_POST['system_name'];
		
	    $imagename=$_FILES["system_logo"]["name"];
	    $file = $_FILES['system_logo']['tmp_name'];
	    $system_logo= addslashes(file_get_contents($_FILES['system_logo']['tmp_name']));
	    
	    $email_server = $_POST['email_server'];
    	$email_username = $_POST['email_username'];
    	$email_password = $_POST['email_password'];

	    $result = modifysystemsettings($system_name,$system_logo,$email_server,$email_username,$email_password);
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
        <h2 class="main-title">System Settings</h2>        
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
										<input id="system_name" name="system_name" type="text" class="input-sm square-form-field" value="<?php if(isset($system_name)){ echo $system_name;}?>" placeholder="Enter System Name">
										<?php if(!empty($system_name)){ ?>
											<small class="field-desc">System Name</small>
										<?php } ?>
									</div>
									<div class="flex-small-item relative">
										<?php if(isset($system_logo)){ ?>
										<div class="company_logo_prev">
											<img src="data:image/jpeg;base64,<?php echo base64_encode( $system_logo ); ?>" />
										</div>
										<?php } ?>
										<input id="system_logo" name="system_logo" type="file" class="input-sm square-form-field">
										<small class="field-desc">System Logo</small>
									</div>
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<label for="email_server" class="control-label mb-1"></label>
										<input id="email_server" name="email_server" type="text" class="input-sm square-form-field" value="<?php if(isset($email_server)){ echo $email_server;}?>" placeholder="Email Server">
										<?php if(!empty($email_server)){ ?>
											<small class="field-desc">Email Server</small>
										<?php } ?>
									</div>
									<div class="flex-small-item relative">
										<input id="email_username" name="email_username" type="text" class="input-sm square-form-field" value="<?php if(isset($email_username)){ echo $email_username;}?>" placeholder="Email Username">
										<?php if(!empty($email_username)){ ?>
											<small class="field-desc">Email Username</small>
										<?php } ?>
									</div>
									<div class="flex-small-item relative">
										<input id="email_password" name="email_password" type="text" class="input-sm square-form-field" value="<?php if(isset($email_password)){ echo $email_password;}?>" placeholder="Email Password">
										<?php if(!empty($email_password)){ ?>
											<small class="field-desc">Email Password</small>
										<?php } ?>
									</div>
								</div>
							</div>
							
							<div class="flex-container cms">
								<div class="flex-small-item relative">
                                    <button type="submit" name="save" class="btn btn-dark btn-block">
                                    Save Settings <i class="fa fa-long-arrow-right"></i>
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
</body>
</html>