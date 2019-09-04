<?php 
    include "function.php";
    $invoices = fetchinvoice();
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
        <h2 class="main-title">Invoice</h2>                
    		<div id="main-content">
    			<div id="content-toolbar"> </div>    
    			<div id="content-body"> 
    				<div class="flex-container-no-align" style="margin-bottom: -5px;position:absolute;width: 20%;z-index:99999;">
    					<div class="flex-xbig-item">
    						<div class="flex-container no-margin user">
    							<div class="flex-small-item">
    								<div class="relative padding-bottom" style="width: 100%;">
    									<a href="add-invoice.php"><i class="fa fa-plus fa-1x" aria-hidden="true" style="margin-right:5px;"></i></a>
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
                                        <table class="table table-hover data-table" data-label="Invoice" style="width: 100%;" role="grid">
                                            <thead>
                                                <tr role="row">
                                                    <th>Comapny</th>
                                                    <th>Date</th>
                                                    <th>PO</th>
                                                    <th>Invoice Number</th>
                                                    <!--<th>Variety Code</th>
                                                    <th>Variety</th> -->
                                                    <th>Amount</th>
                                                    <th>Payment Due</th>
                                                    <th>Total Due</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <?php
                                                foreach($invoices as $inv){
                                                    if(!empty($inv["comapnyID"])){
                                                        $com = getvalues($inv["comapnyID"],'company');
                                                        $company = $com['business_name'];
                                                    }else{
                                                        $company = '';
                                                    }
                                                    if(!empty($inv["variety_code"])){
                                                        $vcode = getvalues($inv["variety_code"],'variety_code');
                                                        $var_code = $vcode['name'];
                                                    }else{
                                                        $var_code = '';
                                                    }
                                                    if(!empty($inv["variety"])){
                                                        $var = getvalues($inv["variety"],'varieties');
                                                        $variety = $var['name'];
                                                    }else{
                                                        $variety = '';
                                                    }
                                                    echo"<tr class='odd' id='row-" . $inv["id"] . "''>";
    												echo"<td>". $company ."</td>";
                                                    echo"<td>". $inv["invoice_date"] ."</td>";
                                                    echo"<td>". $inv["invoice_po"] ."</td>";
                                                    echo"<td>". $inv["invoice_no"] ."</td>";
                                                    /*echo"<td>". $var_code ."</td>";
                                                    echo"<td>". $variety ."</td>";*/
                                                    echo"<td>". $inv["amount"] ."</td>";
                                                    echo"<td>". $inv["payment_due"] ."</td>";
                                                    echo"<td>". $inv["total_due"] ."</td>";
    												echo'<td class="action">
                                                            <div class="table-data-feature">
                                                                <a href="edit-invoice.php?id=' . $inv["id"] . '" class="item" data-toggle="tooltip" data-placement="top" title="Edit Invoice">
                                                                <i class="fa fa-pencil fa-2x" aria-hidden="true" style="margin-right:10px;"></i>
                                                                </a>
                                                                <a href="delete_action.php?id=' . $inv["id"] . '&type=invoice" class="item" data-toggle="tooltip" data-placement="top" title="Delete Invoice">
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