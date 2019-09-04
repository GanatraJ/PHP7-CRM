<?php
    include "function.php";
    $result = "";
    if(isset($_POST['save']))
    {
    	$companyID = $_POST['companyID'];
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
	    
	    $result = updatecompany($companyID,$business_name,$address,$state,$province,$company,$phone_number,$company_email,$pr_cntct_name,$pr_cntct_email,$pr_cntct_phone,$tax_number);
    }
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
        $data = getvalues($id,'company');
        
        $business_name = $data['business_name'];
		$address = $data['address'];
	    $state = $data['state'];
	    $province = $data['province'];
	    $company = $data['company'];
	    $phone_number = $data['phone_number'];
	    $company_email = $data['company_email'];
	    $pr_cntct_name = $data['pr_cntct_name'];
	    $pr_cntct_email = $data['pr_cntct_email'];
	    $pr_cntct_phone = $data['pr_cntct_phone'];
	    $tax_number = $data['tax_number'];
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
		<h2 class="main-title">Edit Company</h2>            
		<div id="main-content">
			<div id="content-body">
				<div class="section__content">
					<div class="flex-container1" style="margin: 0px;">
						<?php echo $result; ?>
						<form method="post" enctype="multipart/form-data">
							<div class="flex-container cms">
								<input type="hidden" name="companyID" id="companyID" value="<?php echo $id; ?>">
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="business_name" name="business_name" type="text" class="input-sm square-form-field" value="<?php echo $business_name; ?>" >
										<small class="field-desc">Business Name</small>
									</div>
									<div class="flex-small-item relative">
										<textarea class='input-sm square-form-field' id="address" name="address"><?php echo $address; ?></textarea>
										<small class="field-desc">Address</small>
									</div>
									<div class="flex-small-item relative">
										<input id="state" name="state" type="text" class="input-sm square-form-field" value="<?php echo $state; ?>">
										<small class="field-desc">State</small>
									</div>
									<div class="flex-small-item relative">
										<input id="province" name="province" type="text" class="input-sm square-form-field" value="<?php echo $province ; ?>" >
										<small class="field-desc">Province</small>
									</div>
									<div class="flex-small-item relative">
										<input id="company" name="company" type="text" class="input-sm square-form-field" value="<?php echo $company; ?>" >
										<small class="field-desc">Country</small>
									</div>
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="phone_number" name="phone_number" type="text" class="input-sm square-form-field" value="<?php echo $phone_number; ?>">
										<small class="field-desc">Phone Number</small>
									</div>
									<div class="flex-small-item relative">
										<input id="company_email" name="company_email" type="text" class="input-sm square-form-field" value="<?php echo $company_email ; ?>" >
										<small class="field-desc">Company Email</small>
									</div>
									<div class="flex-small-item relative">
										<input id="pr_cntct_name" name="pr_cntct_name" type="text" class="input-sm square-form-field" value="<?php echo $pr_cntct_name; ?>" >
										<small class="field-desc">Primary Contact Name</small>
									</div>
									<div class="flex-small-item relative">
										<input id="pr_cntct_email" name="pr_cntct_email" type="text" class="input-sm square-form-field" value="<?php echo $pr_cntct_email; ?>" >
										<small class="field-desc">Primary Contact Email</small>
									</div>
									<div class="flex-small-item relative">
										<input id="pr_cntct_phone" name="pr_cntct_phone" type="text" class="input-sm square-form-field" value="<?php echo $pr_cntct_phone; ?>" >
										<small class="field-desc">Primary Contact Phone</small>
									</div>
									<div class="flex-small-item relative">
										<input id="tax_number" name="tax_number" type="text" class="input-sm square-form-field" value="<?php echo $tax_number; ?>" >
										<small class="field-desc">Tax Number</small>
									</div>
								</div>
							</div>
							<div class="flex-container cms">	
								<div class="flex-small-item relative">
									<button type="submit" name="save" class="btn btn-dark btn-block">
										Update Company <i class="fa fa-long-arrow-right"></i>
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