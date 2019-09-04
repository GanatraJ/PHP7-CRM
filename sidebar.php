<div id="side-menu-bar">    
    <ul id="menu-bar-list-items">
        <li class="active"><a href="index.php"><i class="fa fa-home"></i> Dashboard</a></li>
        <li><a href="companies.php"><i class="fa fa-building"></i> Companies</a></li>
        <li><a href="users.php"><i class="fa fa-user"></i> Users</a></li>
        <?php if($_SESSION['user_type'] == 1){ ?>
            <li><a href="inventory-management.php"><i class="fa fa-suitcase"></i> Inventory Management</a></li>
            <li><a href="categories.php"><i class="fa fa-tags"></i> Categories</a></li>
            <li><a href="varieties.php"><i class="fa fa-cube"></i> Varieties</a></li>
            <li><a href="varcodes.php"><i class="fa fa-cubes"></i> Variety Code</a></li>
            <li><a href="types.php"><i class="fa fa-i-cursor"></i> Types</a></li>
            <li><a href="inventory.php"><i class="fa fa-suitcase"></i> Inventory</a></li>
        <?php } ?>
        <li><a href="invoice.php"><i class="fa fa-file-text"></i> Invoice</a></li>
        <li><a href="company-setting.php"><i class="fa fa-cog"></i> Company Setting</a></li>
        <li><a href="tax-setting.php"><i class="fa fa-cog"></i> Tax Setting</a></li>
        <li><a href="system-setting.php"><i class="fa fa-cogs"></i> System Settings</a></li>
        <li><a href="logout.php"><i class="fa fa-sign-out"></i> Logout</a></li>        
    </ul>         
</div>