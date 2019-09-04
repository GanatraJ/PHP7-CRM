<?php 
	include "function.php";
	$result="";
	
	if(isset($_POST['save']))
	{
		$inv_company = $_POST['company'];
		$invoice_date = $_POST['invoice_date'];
		$invoice_po = $_POST['invoice_po'];
		$inv_no = $_POST['invoice_no'];
	    $inv_varcode = $_POST['variety_code'];
	    $inv_variety = $_POST['varieties'];
	    $inv_amnount = $_POST['inv_amnount'];
	    $payment_due = $_POST['payment_due'];
	    $status = $_POST['status'];
		$total = $_POST['total'];
		$tax = $_POST['tax'];
		$total_due = $_POST['total_due'];
		
	    
	    $result = addinvoice($inv_company,$invoice_date,$invoice_po,$inv_no,$inv_varcode,$inv_variety,$inv_amnount,$payment_due,$status,$total,$tax,$total_due);
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
                <h2 class="main-title">Add Invoice</h2>        
		<!-- PAGE CONTAINER-->
		<div id="main-content">
			<div id="content-body">
				<div class="section__content">
					<div class="flex-container1" style="margin: 0px;">
						<?php 
							//echo $result;
							//echo $result[0]; 
							//check download report status
							if(!empty($result[2])){
								//echo 'last insert Id: '.$result[1];
								?>
								<div class="flex-container cms">
									<div class="flex-small-item relative">
		                                <button type="" name="" class="btn btn-dark btn-block">
		                                	<a class="download_btn" href="download-invoice.php?id=<?php echo $result[1]; ?>" >Download PDF</a> <i class="fa fa-long-arrow-right"></i>
		                                </button>    
									</div>
								</div>
								<?php	
								}
							
							
						?>
						<form method="post" enctype="multipart/form-data">
							<div class="flex-container cms stretch-col">
								<div class="flex-big-item">
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
										<input id="invoice_date" name="invoice_date" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['invoice_date'])){ echo $_POST['invoice_date'];}?>" placeholder="Enter Invoice Date">
									</div>
									<div class="flex-small-item relative">
										<input id="invoice_po" name="invoice_po" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['invoice_po'])){ echo $_POST['invoice_po'];}?>" placeholder="Enter Invoice PO">
									</div>
									<div class="flex-small-item relative">
										<input id="invoice_no" name="invoice_no" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['invoice_no'])){ echo $_POST['invoice_no'];}?>" placeholder="Enter Invoice Number">
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
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="inv_amnount" name="inv_amnount" type="number" class="input-sm square-form-field" value="<?php if(isset($_POST['inv_amnount'])){ echo $_POST['inv_amnount'];}?>" placeholder="Enter Amount">
									</div>
									<div class="flex-small-item relative">
										<input id="payment_due" name="payment_due" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['payment_due'])){ echo $_POST['payment_due'];}?>" placeholder="Enter Payment Due">
									</div>
									<div class="flex-small-item relative">
										<select name="status" class="input-sm square-form-field custom-sel" id="status" >
											<option>Select Status</option>
											<option value="1" <?php if(isset($_POST['status'])){if($_POST['status'] == '1'){ echo 'selected'; }} ?> >Paid</option>
											<option value="0" <?php if(isset($_POST['status'])){if($_POST['status'] == '0'){ echo 'selected'; }} ?> >Unpaid</option>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
									</div>
									<div class="flex-small-item relative">
										<input id="total" name="total" type="number" class="input-sm square-form-field" value="<?php if(isset($_POST['total'])){ echo $_POST['total'];}?>" placeholder="Enter Total ($)">
									</div>
									<div class="flex-small-item relative">
										<input id="tax" name="tax" type="number" class="input-sm square-form-field" value="<?php if(isset($_POST['tax'])){ echo $_POST['tax'];}?>" placeholder="Tax" readonly>
									</div>
									<div class="flex-small-item relative">
										<input id="total_due" name="total_due" type="number" class="input-sm square-form-field" value="<?php if(isset($_POST['total_due'])){ echo $_POST['total_due'];}?>" placeholder="Total Due" readonly> 
									</div>
								</div>
							</div>
							<div class="flex-container cms">
								<div class="flex-small-item relative">
                                    <button type="submit" name="save" class="btn btn-dark btn-block">
                                    Add Invoice <i class="fa fa-long-arrow-right"></i>
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
            var date_input=$('input[name="invoice_date"]'); //our date input has the name "date"
            var container=$('.card-body form').length>0 ? $('.card-body form').parent() : "body";
            date_input.datepicker({
                format: 'yyyy-mm-dd',
                container: container,
                todayHighlight: true,
                autoclose: true,
            });

            var date_input = $('input[name="payment_due"]'); //our date input has the name "date"
            var container = $('.card-body form').length>0 ? $('.card-body form').parent() : "body";
            date_input.datepicker({
                format: 'yyyy-mm-dd',
                container: container,
                todayHighlight: true,
                autoclose: true,
            });

            $('#total').change(function () {
			  	var total = $(this).val();
			  	var tax = (total/100)*10;
			  	$('#tax').val(tax);

			  	var total1 = parseInt($("#total").val());
				var tax1 = parseInt($("#tax").val());
				var due = total1 + tax1;
				//console.log('total: '+total1+' tax: '+tax1 + ' total_due: '+due);
				$('#total_due').val(due);
			});
        });
    </script>
</body>
</html>