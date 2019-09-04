<?php
    include "function.php";
    $result = "";
    if(isset($_POST['save']))
    {
    	$varID = $_POST['varID'];
        $var_name = $_POST['var_name'];
	
	    $result = updatevariety($varID,$var_name);
    }
    if(isset($_GET['id']))
    {
        $id = $_GET['id'];
        $data = getvalues($id,'varieties');
        
        $var_name = $data['name'];
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
		<h2 class="main-title">Edit Variety</h2>            
		<div id="main-content">
			<div id="content-body">
				<div class="section__content">
					<div class="flex-container1" style="margin: 0px;">
						<?php echo $result; ?>
						<form method="post" enctype="multipart/form-data">
							<div class="flex-container cms">
								<input type="hidden" name="varID" id="varID" value="<?php echo $id; ?>">
								<div class="flex-big-item">
									<div class="flex-small-item relative">
										<input id="var_name" name="var_name" type="text" class="input-sm square-form-field" value="<?php echo $var_name; ?>" >
										<small class="field-desc">Variety Name</small>
									</div>
								</div>
								<div class="flex-big-item"></div>
							</div>
							<div class="flex-container cms">	
								<div class="flex-small-item relative">
									<button type="submit" name="save" class="btn btn-dark btn-block">
										Update Variety <i class="fa fa-long-arrow-right"></i>
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