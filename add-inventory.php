<?php 
	include "function.php";
	$result="";
	
	if(isset($_POST['save']))
	{
		$inv_cat = $_POST['categories'];
		$inv_company = $_POST['company'];
	    $inv_varcode = $_POST['variety_code'];
	    $inv_variety = $_POST['varieties'];
	    $inv_type = $_POST['types'];
	    $trans_date = $_POST['trans_date'];
		$inv_no = $_POST['inv_no'];
		$inv_amnount = $_POST['inv_amnount'];
		$inv_quantity = $_POST['inv_quantity'];
	    
	    $result = addinventory($inv_cat,$inv_company,$inv_varcode,$inv_variety,$inv_type,$trans_date,$inv_no,$inv_amnount,$inv_quantity);
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
                <h2 class="main-title">Add Inventory</h2>        
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
										<select name="categories" class="input-sm square-form-field custom-sel" id="categories" >
											<?php 
												if(isset($_POST['categories'])){ 
													echo getDropDownList('categories',$_POST['categories']); 
												}else{
													echo getDropDownList('categories',''); 
												}
											?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
									</div>
									<div class="flex-small-item relative">
										<select name="company" class="input-sm square-form-field custom-sel" id="company" >
											<?php 
												if(isset($_POST['company'])){ 
													echo getDropDownList('company',$_POST['company']); 
												}else{
													echo getDropDownList('company',''); 
												}
											?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
									</div>
									<div class="flex-small-item relative">
										<select name="variety_code" class="input-sm square-form-field custom-sel" id="variety_code" >
											<?php 
												if(isset($_POST['variety_code'])){ 
													echo getDropDownList('variety_code',$_POST['variety_code']); 
												}else{
													echo getDropDownList('variety_code',''); 
												}
											?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
									</div>
									<div class="flex-small-item relative">
										<select name="varieties" class="input-sm square-form-field custom-sel" id="varieties" >
											<?php 
												if(isset($_POST['varieties'])){ 
													echo getDropDownList('varieties',$_POST['varieties']); 
												}else{
													echo getDropDownList('varieties',''); 
												}
											?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
									</div>
									<div class="flex-small-item relative">
										<select name="types" class="input-sm square-form-field custom-sel" id="types" >
											<?php 
												if(isset($_POST['types'])){ 
													echo getDropDownList('types',$_POST['types']); 
												}else{
													echo getDropDownList('types',''); 
												}
											?>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
									</div>
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="trans_date" name="trans_date" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['trans_date'])){ echo $_POST['trans_date'];}?>" placeholder="Enter Transaction Date">
									</div>
									<div class="flex-small-item relative">
										<input id="inv_no" name="inv_no" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['inv_no'])){ echo $_POST['inv_no'];}?>" placeholder="Enter Invoice Number">
									</div>
									<div class="flex-small-item relative">
										<input id="inv_amnount" name="inv_amnount" type="number" class="input-sm square-form-field" value="<?php if(isset($_POST['inv_amnount'])){ echo $_POST['inv_amnount'];}?>" placeholder="Enter Amount">
									</div>
									<div class="flex-small-item relative">
										<input id="inv_quantity" name="inv_quantity" type="number" class="input-sm square-form-field" value="<?php if(isset($_POST['inv_quantity'])){ echo $_POST['inv_quantity'];}?>" placeholder="Enter Quantity">
									</div>
								</div>
							</div>

							<div class="flex-container cms">
								<div class="flex-small-item relative">
                                    <button type="submit" name="save" class="btn btn-dark btn-block">
                                    Add Inventory <i class="fa fa-long-arrow-right"></i>
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
            var date_input=$('input[name="trans_date"]'); //our date input has the name "date"
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