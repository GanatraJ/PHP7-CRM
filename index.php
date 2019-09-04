<?php 
    include "function.php";

    /*CRUD in user tbl
    * $tbl_create = create_tbl();
    * insert_action('users');
    * print_r(fetch_action('users'));
    */
?>
<!doctype html>
<html lang="en">
    <?php include "head.php" ?>
    <body>
    	<?php 
            include "header.php"; 
            include "sidebar.php";
    	?>
    	<div class="body-content">
            <h2 class="main-title">Dashboard</h2>
        	<?php include "content.php"; ?>
    	</div><br/>
        <input type="hidden" name="sessionid" value="<?php echo $_SESSION['user_id']; ?>">
        <input type="hidden" name="usertype" value="<?php echo $_SESSION['user_type']; ?>">
    	<?php include "footer.php"; ?>
    </body>
</html>