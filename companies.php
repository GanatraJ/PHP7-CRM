<?php 
    include "function.php";
    $companies = fetchcompany();
?>
<!doctype html>
<html lang="en">
<?php include "head.php" ?>
    <body>
    	<?php 
    		include "header.php"; 
    		include "sidebar.php";
    	?>
    	<div class="body-content company">
        <h2 class="main-title">Companies</h2>                
    		<div id="main-content">
    			<div id="content-toolbar"> </div>    
    			<div id="content-body"> 
    				<div class="flex-container-no-align" style="margin-bottom: -5px;position:absolute;width: 20%;z-index:99999;">
    					<div class="flex-xbig-item">
    						<div class="flex-container no-margin company">
    							<div class="flex-small-item">
    								<div class="relative padding-bottom" style="width: 100%;">
    									<a href="add-company.php"><i class="fa fa-plus fa-1x" aria-hidden="true" style="margin-right:5px;"></i></a>
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
                                        <table class="table table-hover data-table" data-label="Company Name" style="width: 100%;" role="grid">
                                            <thead>
                                                <tr role="row">
                                                    <th>Business Name</th> 
                                                    <th>Address</th>
                                                    <th>State/Provinace</th>
            										<th>Company</th>
            										<th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <?php
                                                foreach($companies as $company){
                                                    echo"<tr class='odd' id='row-" . $company["id"] . "''>";
    												echo"<td>". $company["business_name"] ."</td>";
    												echo"<td>". $company["address"] ."</td>";
    												echo"<td>". $company["state"] ." , ". $company["province"] ."</td>";
    												echo"<td>". $company["company"] ."</td>";
                                                    echo'<td class="action">
                                                        <div class="table-data-feature">
                                                        <a href="manage-company.php?id=' . $company["id"] . '" class="item hideme" data-toggle="tooltip" data-placement="top" title="Manage Company">
                                                        <i class="fa fa-cog fa-2x" aria-hidden="true" style="margin-right:10px;"></i>
                                                        </a>
                                                        <a href="edit-company.php?id=' . $company["id"] . '" class="item" data-toggle="tooltip" data-placement="top" title="Edit Company">
                                                        <i class="fa fa-pencil fa-2x" aria-hidden="true" style="margin-right:10px;"></i>
                                                        </a>
                                                        <a href="delete_action.php?id=' . $company["id"] . '&type=companies" class="item" data-toggle="tooltip" data-placement="top" title="Delete Company">
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