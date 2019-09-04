<?php
    include "function.php";
    $result = "";
    if(isset($_POST['save']))
    {
    	$invID = $_POST['invID'];
        $inv_cat = $_POST['categories'];
		$inv_company = $_POST['company'];
	    $inv_varcode = $_POST['variety_code'];
	    $inv_variety = $_POST['varieties'];
	    $inv_type = $_POST['types'];
	    $trans_date = $_POST['trans_date'];
		$inv_no = $_POST['inv_no'];
	    $inv_amnount = $_POST['inv_amnount'];
		$inv_quantity = $_POST['inv_quantity'];

	    $result = updateinventory($invID,$inv_cat,$inv_company,$inv_varcode,$inv_variety,$inv_type,$trans_date,$inv_no,$inv_amnount,$inv_quantity);
    }
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
        $data = getvalues($id,'inventory');
        
        $inv_cat = $data['categoryID'];
		$inv_company = $data['comapnyID'];
	    $inv_varcode = $data['variety_code'];
	    $inv_variety = $data['variety'];
	    $inv_type = $data['typeID'];
	    $trans_date = $data['transaction_date'];
	    $inv_no = $data['invoice_no'];
	    $inv_amnount = $data['amount'];
		$inv_quantity = $data['quantity'];
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
		<h2 class="main-title">Edit Inventory</h2>            
		<div id="main-content">
			<div id="content-body">
				<div class="section__content">
					<div class="flex-container1" style="margin: 0px;">
						<?php echo $result; ?>
						<form method="post" enctype="multipart/form-data">
							<div class="flex-container cms stretch-col">
								<input type="hidden" name="invID" id="invID" value="<?php echo $id; ?>">
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<select name="categories" class="input-sm square-form-field custom-sel" id="categories" >
											<?php echo getDropDownList('categories',$inv_cat); ?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
										<small class="field-desc">Inventory Category</small>
									</div>
									<div class="flex-small-item relative">
										<select name="company" class="input-sm square-form-field custom-sel" id="company" >
											<?php echo getDropDownList('company',$inv_company); ?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
										<small class="field-desc">Company</small>
									</div>
									<div class="flex-small-item relative">
										<select name="variety_code" class="input-sm square-form-field custom-sel" id="variety_code" >
											<?php echo getDropDownList('variety_code',$inv_varcode); ?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
										<small class="field-desc">Variety Code</small>
									</div>
									<div class="flex-small-item relative">
										<select name="varieties" class="input-sm square-form-field custom-sel" id="varieties" >
											<?php echo getDropDownList('varieties',$inv_variety); ?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
										<small class="field-desc">Variety</small>
									</div>
									<div class="flex-small-item relative">
										<select name="types" class="input-sm square-form-field custom-sel" id="types" >
											<?php echo getDropDownList('types',$inv_type); ?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
										<small class="field-desc">Type</small>
									</div>
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="trans_date" name="trans_date" type="text" class="input-sm square-form-field" value="<?php echo $trans_date; ?>" >
										<small class="field-desc">Transaction Date</small>
									</div>
									<div class="flex-small-item relative">
										<input id="inv_no" name="inv_no" type="text" class="input-sm square-form-field" value="<?php echo $inv_no; ?>">
										<small class="field-desc">Invoice Number</small>
									</div>
									<div class="flex-small-item relative">
										<input id="inv_amnount" name="inv_amnount" type="number" class="input-sm square-form-field" value="<?php echo $inv_amnount; ?>" >
										<small class="field-desc">Amount</small>
									</div>
									<div class="flex-small-item relative">
										<input id="inv_quantity" name="inv_quantity" type="number" class="input-sm square-form-field" value="<?php echo $inv_quantity; ?>">
										<small class="field-desc">Quantity</small>
									</div>
								</div>
							</div>
							<div class="flex-container cms">	
								<div class="flex-small-item relative">
									<button type="submit" name="save" class="btn btn-dark btn-block">
										Update Inventory <i class="fa fa-long-arrow-right"></i>
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
            var date_input=$('input[name="trans_date"]'); //our date input has the name "date"
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