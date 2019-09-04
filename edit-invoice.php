<?php
    include "function.php";
    $result = "";
    if(isset($_POST['save']))
    {
    	$invID = $_POST['invID'];
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

	    $result = updateinvoice($invID,$inv_company,$invoice_date,$invoice_po,$inv_no,$inv_varcode,$inv_variety,$inv_amnount,$payment_due,$status,$total,$tax,$total_due);
    }
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
        $data = getvalues($id,'invoice');
        
        $inv_company = $data['comapnyID'];
		$invoice_date = $data['invoice_date'];
		$invoice_po = $data['invoice_po'];
		$inv_no = $data['invoice_no'];
	    $inv_varcode = $data['variety_code'];
	    $inv_variety = $data['variety'];
	    $inv_amnount = $data['amount'];
	    $payment_due = $data['payment_due'];
	    $status = $data['status'];
		$total = $data['total'];
		$tax = $data['tax'];
		$total_due = $data['total_due'];
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
		<h2 class="main-title">Edit Invoice</h2>            
		<div id="main-content">
			<div id="content-body">
				<div class="section__content">
					<div class="flex-container1" style="margin: 0px;">
						<?php echo $result; ?>
						<form method="post" enctype="multipart/form-data">
							<div class="flex-container cms">
								<input type="hidden" name="invID" id="invID" value="<?php echo $id; ?>">
								<div class="flex-big-item">
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
										<input id="invoice_date" name="invoice_date" type="text" class="input-sm square-form-field" value="<?php echo $invoice_date; ?>" >
										<small class="field-desc">Invoice Date</small>
									</div>
									<div class="flex-small-item relative">
										<input id="invoice_po" name="invoice_po" type="text" class="input-sm square-form-field" value="<?php echo $invoice_po; ?>" >
										<small class="field-desc">PO</small>
									</div>
									<div class="flex-small-item relative">
										<input id="invoice_no" name="invoice_no" type="text" class="input-sm square-form-field" value="<?php echo $inv_no; ?>" >
										<small class="field-desc">Invoice Number</small>
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
								</div>
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="inv_amnount" name="inv_amnount" type="number" class="input-sm square-form-field" value="<?php echo $inv_amnount; ?>" >
										<small class="field-desc">Amount</small>
									</div>
									<div class="flex-small-item relative">
										<input id="payment_due" name="payment_due" type="text" class="input-sm square-form-field" value="<?php echo $payment_due; ?>" >
										<small class="field-desc">Payment Due</small>
									</div>
									<div class="flex-small-item relative">
										<select name="status" class="input-sm square-form-field custom-sel" id="status" >
											<option>Select Status</option>
											<option value="1" <?php if($status == '1'){ echo 'selected'; } ?> >Paid</option>
											<option value="0" <?php if($status == '0'){ echo 'selected'; } ?> >Unpaid</option>
										</select>
										<div class="relative">
											<div class="dropdown-arrow custom"></div>
										</div>
									</div>
									<div class="flex-small-item relative">
										<input id="total" name="total" type="number" class="input-sm square-form-field" value="<?php echo $total; ?>" >
										<small class="field-desc">Total ($)</small>
									</div>
									<div class="flex-small-item relative">
										<input id="tax" name="tax" type="number" class="input-sm square-form-field" value="<?php echo $tax; ?>" readonly>
										<small class="field-desc">Tax</small>
									</div>
									<div class="flex-small-item relative">
										<input id="total_due" name="total_due" type="number" class="input-sm square-form-field" value="<?php echo $total_due; ?>" readonly>
										<small class="field-desc">Total Due</small>
									</div>
								</div>
							</div>
							<div class="flex-container cms">	
								<div class="flex-small-item relative">
									<button type="submit" name="save" class="btn btn-dark btn-block">
										Update Invoice <i class="fa fa-long-arrow-right"></i>
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