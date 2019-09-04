<?php 
	include "function.php";
	$result="";

	if(isset($_POST['save']))
	{
		$var_name = $_POST['var_name'];
	    $result = addvariety($var_name);
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
        <h2 class="main-title">Add Variety</h2>        
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
										<input id="var_name" name="var_name" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['var_name'])){ echo $_POST['var_name'];}?>" placeholder="Enter Variety Name">
									</div>
								</div>
								<div class="flex-big-item"></div>
							</div>

							<div class="flex-container cms">
								<div class="flex-small-item relative">
                                    <button type="submit" name="save" class="btn btn-dark btn-block">
                                    Add Variety <i class="fa fa-long-arrow-right"></i>
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