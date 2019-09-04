<?php
	include "function.php";
	$result="";

	$data = getvalues(1,'system_setting');
	if( !empty($data)){
		$tax_amount = $data['tax_amount'];
    	
	}

	if(isset($_POST['save']))
	{
		$tax_amount = $_POST['tax_amount'];
		
	    $result = taxsettings($tax_amount);
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
        <h2 class="main-title">Tax Setting</h2>        
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
										<input id="tax_amount" name="tax_amount" type="text" class="input-sm square-form-field" value="<?php if(isset($tax_amount)){ echo $tax_amount;}?>" placeholder="Enter % Tax Amount">
										<?php if(!empty($tax_amount)){ ?>
											<small class="field-desc">% Tax Amount</small>
										<?php } ?>
									</div>
								</div><div class="flex-big-item"></div>
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