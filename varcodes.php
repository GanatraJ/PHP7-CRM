<?php 
    include "function.php";
    $varcodes = fetchvarcodes();
    
?>
<!doctype html>
<html lang="en">
<?php include "head.php" ?>
    <body>
    	<?php 
    		include "header.php"; 
    		include "sidebar.php";
    	?>
    	<div class="body-content user">
        <h2 class="main-title">Variety Codes</h2>                
    		<div id="main-content">
    			<div id="content-toolbar"> </div>    
    			<div id="content-body"> 
    				<div class="flex-container-no-align" style="margin-bottom: -5px;position:absolute;width: 20%;z-index:99999;">
    					<div class="flex-xbig-item">
    						<div class="flex-container no-margin user">
    							<div class="flex-small-item">
    								<div class="relative padding-bottom" style="width: 100%;">
    									<a href="add-varcode.php"><i class="fa fa-plus fa-1x" aria-hidden="true" style="margin-right:5px;"></i></a>
    									<div class='search-dropdown' style='display:inline;'>
    									    <div class="arrow-down custom" style="top:10px;right: 45px;"></div>
    									</div>
    								</div>
    							</div>
    						
    						</div>  
    					</div>
    				</div>
    				<div id="oneOnOneTable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="dataTables_scroll"  id="table_wrapper">
                                    <div class="dataTables_scrollBody" style="position: relative; overflow: auto; height: 64vh; width: 100%;">
                                        <table class="table table-hover data-table" data-label="Variety Code Name" style="width: 100%;" role="grid">
                                            <thead>
                                                <tr role="row">
                                                    <th>Name</th>
                                                    <th>Date Added</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <?php
                                                foreach($varcodes as $varcode){
                                                    echo"<tr class='odd' id='row-" . $varcode["id"] . "'>";
    												echo"<td>". $varcode["name"] ."</td>";
    												echo"<td>". $varcode["date_added"] ."</td>";
    												echo'<td class="action">
                                                            <div class="table-data-feature">
                                                                <a href="edit-varcode.php?id=' . $varcode["id"] . '" class="item" data-toggle="tooltip" data-placement="top" title="Edit Variety Code">
                                                                <i class="fa fa-pencil fa-2x" aria-hidden="true" style="margin-right:10px;"></i>
                                                                </a>
                                                                <a href="delete_action.php?id=' . $varcode["id"] . '&type=varcodes" class="item" data-toggle="tooltip" data-placement="top" title="Delete Variety Code">
                                                                <i class="fa fa-trash fa-2x" aria-hidden="true" style="margin-right:10px;"></i>
                                                                </a>
                                                            </div>
                                                        </td>';
                                                    echo"</tr>";
                                                }
                                                ?>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    				<div class="loader-bg">
    					<div class="loader"></div>
    				</div>
    			</div>
    		</div>
    	</div>
    	<?php include "footer.php"; ?>
    </body>
</html>