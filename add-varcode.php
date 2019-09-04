<?php 
	include "function.php";
	$result="";

	if(isset($_POST['save']))
	{
		$varcode_name = $_POST['varcode_name'];
	    $result = addvarcode($varcode_name);
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
        <h2 class="main-title">Add Variety Code</h2>        
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
										<input id="varcode_name" name="varcode_name" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['varcode_name'])){ echo $_POST['varcode_name'];}?>" placeholder="Enter Variety Code">
									</div>
								</div>
								<div class="flex-big-item"></div>
							</div>

							<div class="flex-container cms">
								<div class="flex-small-item relative">
                                    <button type="submit" name="save" class="btn btn-dark btn-block">
                                    Add Variety Code <i class="fa fa-long-arrow-right"></i>
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