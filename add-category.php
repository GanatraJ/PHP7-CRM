<?php 
	include "function.php";
	$result="";

	if(isset($_POST['save']))
	{
		$cat_name = $_POST['cat_name'];
	    $result = addcategory($cat_name);
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
        <h2 class="main-title">Add Category</h2>        
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
										<input id="cat_name" name="cat_name" type="text" class="input-sm square-form-field" value="<?php if(isset($_POST['cat_name'])){ echo $_POST['cat_name'];}?>" placeholder="Enter Category Name">
									</div>
								</div>
								<div class="flex-big-item"></div>
							</div>

							<div class="flex-container cms">
								<div class="flex-small-item relative">
                                    <button type="submit" name="save" class="btn btn-dark btn-block">
                                    Add Category <i class="fa fa-long-arrow-right"></i>
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