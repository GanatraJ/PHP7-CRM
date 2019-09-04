<?php
    
?>
<!-- MAIN CONTENT-->
<div id="main-content">
    <div id="content-toolbar"></div>    
    <div id="content-body"> 
        <?php create_tbl();
            //list_tables();
        ?>               
       <div class="panel with-nav-tabs panel-default" style="margin-top: 5px; margin-bottom: 3px;">
        <div class="panel-heading">
            <ul class="nav nav-tabs" id="myTab">
                <li class="active"><a data-toggle="tab" id="company-tab" href="#company">Companies</a></li>
                <li><a data-toggle="tab" id="Contact-tab" href="#users">Users</a></li>
                <li><a data-toggle="tab" id="activity-tab" href="#inventory">Inventory</a></li>
                <li><a data-toggle="tab" id="meeting-tab" href="#invoice">Invoice</a></li>
            </ul>
        </div>    
        <div class="tab-content">
            <div id="company" class="tab-pane fade in active">
                <div id="oneOnOneTable_wrapper" class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="dataTables_scroll"  id="table_wrapper">
                                <div class="dataTables_scrollBody" style="position: relative; overflow: auto; height: 64vh; width: 100%;">
                                    <table class="table table-hover " style="width: 100%;" role="grid">
                                        <thead>
                                            <tr>
                                                <th>Business Name</th><th>Address</th><th>State/Provinace</th><th>Company</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                                $companies = fetchcompany();
                                                foreach($companies as $company){
                                                    echo"<tr class='odd' id='row-" . $company["id"] . "''>";
                                                        echo"<td>". $company["business_name"] ."</td>";
                                                        echo"<td>". $company["address"] ."</td>";
                                                        echo"<td>". $company["state"] ." , ". $company["province"] ."</td>";
                                                        echo"<td>". $company["company"] ."</td>";
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
                <table class="table table-hover hideme" id="oneOnOneTable" style="width: 100%">
                    <thead>
                        <tr>
                            <th>Company Name</th><th>Phone Number</th><th>Main Contact</th>
                            <th>City</th><th>Industry</th><th>Status</th>
                            <th>Sales Rep.</th><th>Last Updated</th><th>Updated By</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div class="loader-bg">
                    <div class="loader"></div>
                </div>
            </div>
            <div id="users" class="tab-pane fade in">
                <table class="table table-hover" id="oneOnOneTable" style="width: 100%">
                    <thead>
                        <tr>
                            <th>Name</th><th>Email</th><th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $users = fetchuser();
                            foreach($users as $user){
                                if(!empty($user["user_type"])){
                                    $type = getvalues($user["user_type"],'user_type');
                                }else{
                                    $type = '';
                                }
                                echo"<tr class='odd' id='row-" . $user["id"] . "''>";
                                    echo"<td>". $user["name"] ."</td>";
                                    echo"<td>". $user["email"] ."</td>";
                                    echo"<td>". $type ."</td>";
                                echo"</tr>";
                            }
                        ?>
                    </tbody>
                </table>
                <div class="loader-bg">
                    <div class="loader"></div>
                </div>
            </div>
            <div id="inventory" class="tab-pane fade in">
                <table class="table table-hover" id="oneOnOneTable" style="width: 100%">
                    <thead>
                        <tr>
                            <th>Category</th><th>Comapny</th><th>Variety Code</th><th>Variety</th><th>Type</th><th>Transcation Date</th><th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $inventory = fetchinventory();
                            foreach($inventory as $inv){
                                if(!empty($inv["categoryID"])){
                                    $cat = getvalues($inv["categoryID"],'categories');
                                    $category = $cat['name'];
                                }else{
                                    $cat = '';
                                }
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
                                if(!empty($inv["typeID"])){
                                    $type = getvalues($inv["typeID"],'types');
                                    $typeID = $type['name'];
                                }else{
                                    $typeID = '';
                                }
                                echo"<tr class='odd' id='row-" . $inv["id"] . "''>";
                                    echo"<td>". $category ."</td>";
                                    echo"<td>". $company ."</td>";
                                    echo"<td>". $var_code ."</td>";
                                    echo"<td>". $variety ."</td>";
                                    echo"<td>". $typeID ."</td>";
                                    echo"<td>". $inv["transaction_date"] ."</td>";
                                    echo"<td>". $inv["invoice_no"] ."</td>";
                                echo"</tr>";
                            }
                        ?>
                    </tbody>
                </table>
                <div class="loader-bg">
                    <div class="loader"></div>
                </div>
            </div>
            <div id="invoice" class="tab-pane fade in">
                <table class="table table-hover" id="oneOnOneTable" style="width: 100%">
                    <thead>
                        <tr>
                            <th>Comapny</th><th>Date</th><th>Invoice Number</th>
                            <th>Amount</th><th>Payment Due</th><th>Total Due</th>
                            <th class='desk-invoice'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            $invoices = fetchinvoice();
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
                                    echo"<td>". $inv["invoice_no"] ."</td>";
                                    echo"<td>". $inv["amount"] ."</td>";
                                    echo"<td>". $inv["payment_due"] ."</td>";
                                    echo"<td>". $inv["total_due"] ."</td>";
                                    echo"<td class='desk-invoice'><a href='download-invoice.php?id=".$inv["id"]."' ><i class='fa fa-download'></i></a></td>";
                                echo"</tr>";
                            }
                        ?>
                    </tbody>
                </table>
                <div class="loader-bg">
                    <div class="loader"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<br/>
<!-- END MAIN CONTENT-->