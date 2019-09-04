<?php
	include "function.php";
	/* create system table
	* create_tbl();
	* $cols = list_columns();
	* print_r($cols);
	*/
	$result="";

	$data = getvalues(1,'company_setting');
	if( !empty($data)){
		$company_name = $data['company_name'];
    	$company_address = $data['company_address'];
    	$company_phone = $data['company_phone'];
		$company_email = $data['company_email'];
	}

	if(isset($_POST['save']))
	{
		$company_name = $_POST['company_name'];
		$company_address = $_POST['company_address'];
    	$company_phone = $_POST['company_phone'];
    	$company_email = $_POST['company_email'];

	    $result = companysettings($company_name,$company_address,$company_phone,$company_email);
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
        <h2 class="main-title">Company Setting</h2>        
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
										<input id="company_name" name="company_name" type="text" class="input-sm square-form-field" value="<?php if(isset($company_name)){ echo $company_name;}?>" placeholder="Enter System Name">
										<?php if(!empty($company_name)){ ?>
											<small class="field-desc">Comapny Name</small>
										<?php } ?>
									</div>
									<div class="flex-small-item relative">
										<textarea class='input-sm square-form-field' id="company_address" name="company_address" placeholder="Enter Comapny Address"><?php if(!empty($company_address)){ echo $company_address; } ?></textarea>
										<?php if(!empty($company_address)){ ?>
											<small class="field-desc">Company Address</small>
										<?php } ?>
									</div>
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="company_phone" name="company_phone" type="text" class="input-sm square-form-field" value="<?php if(isset($company_phone)){ echo $company_phone;}?>" placeholder="Enter Company Phone Number">
										<?php if(!empty($company_phone)){ ?>
											<small class="field-desc">Company Phone Number</small>
										<?php } ?>
									</div>
									<div class="flex-small-item relative">
										<input id="company_email" name="company_email" type="text" class="input-sm square-form-field" value="<?php if(isset($company_email)){ echo $company_email;}?>" placeholder="Enter Company Email">
										<?php if(!empty($company_email)){ ?>
											<small class="field-desc">Company Email</small>
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