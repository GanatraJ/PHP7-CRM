<?php 
	include "function.php";
	$result="";
	
	if(isset($_POST['save']))
	{
		$business_name = $_POST['business_name'];
		$address = $_POST['address'];
	    $state = $_POST['state'];
	    $province = $_POST['province'];
	    $company = $_POST['company'];
	    $phone_number = $_POST['phone_number'];
	    $company_email = $_POST['company_email'];
	    $pr_cntct_name = $_POST['pr_cntct_name'];
	    $pr_cntct_email = $_POST['pr_cntct_email'];
	    $pr_cntct_phone = $_POST['pr_cntct_phone'];
	    $tax_number = $_POST['tax_number'];
	    
	    $result = addcompany($business_name,$address,$state,$province,$company,$phone_number,$company_email,$pr_cntct_name,$pr_cntct_email,$pr_cntct_phone,$tax_number);
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
                <h2 class="main-title">Add Company</h2>        
		<!-- PAGE CONTAINER-->
		<div id="main-content">
			<div id="content-body">
				<div class="section__content">
					<div class="flex-container1" style="margin: 0px;">
						<?php echo $result; ?>
						<form method="post" enctype="multipart/form-data">
							<div class="flex-container cms">
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="business_name" name="business_name" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['business_name'])){ echo $_POST['business_name'];}?>" placeholder="Enter Business Name">
									</div>
									<div class="flex-small-item relative">
										<textarea class='input-sm square-form-field' id="address" name="address" placeholder="Enter Address"><?php if(isset($_POST['address'])){ echo $_POST['address']; }?></textarea>
									</div>
									<div class="flex-small-item relative">
										<input id="state" name="state" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['state'])){ echo $_POST['state'];}?>" placeholder="Enter State">
									</div>
									<div class="flex-small-item relative">
										<input id="province" name="province" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['province'])){ echo $_POST['province'];}?>" placeholder="Enter Province">
									</div>
									<div class="flex-small-item relative">
										<input id="company" name="company" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['company'])){ echo $_POST['company'];}?>" placeholder="Enter Country">
									</div>
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="phone_number" name="phone_number" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['phone_number'])){ echo $_POST['phone_number'];}?>" placeholder="Enter Phone Number">
									</div>
									<div class="flex-small-item relative">
										<input id="company_email" name="company_email" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['company_email'])){ echo $_POST['company_email'];}?>" placeholder="Enter Company Email">
									</div>
									<div class="flex-small-item relative">
										<input id="pr_cntct_name" name="pr_cntct_name" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['pr_cntct_name'])){ echo $_POST['pr_cntct_name'];}?>" placeholder="Enter Primary Contact Name">
									</div>
									<div class="flex-small-item relative">
										<input id="pr_cntct_email" name="pr_cntct_email" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['pr_cntct_email'])){ echo $_POST['pr_cntct_email'];}?>" placeholder="Enter Primary Contact Email">
									</div>
									<div class="flex-small-item relative">
										<input id="pr_cntct_phone" name="pr_cntct_phone" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['pr_cntct_phone'])){ echo $_POST['pr_cntct_phone'];}?>" placeholder="Enter Primary Contact Phone">
									</div>
									<div class="flex-small-item relative">
										<input id="tax_number" name="tax_number" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['tax_number'])){ echo $_POST['tax_number'];}?>" placeholder="Enter Tax Number">
									</div>
								</div>
							</div>

							<div class="flex-container cms">
								<div class="flex-small-item relative">
                                    <button type="submit" name="save" class="btn btn-dark btn-block">
                                    Add Company <i class="fa fa-long-arrow-right"></i>
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