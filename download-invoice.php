<?php 
	include "function.php";
	require_once('dompdf/dompdf_config.inc.php');

	$id = $_GET['id'];
	//echo 'hello report id: '. $id.'<br/>';

	$data = getvalues($id,'invoice');
        
	$inv_company = $data['comapnyID'];
	$invoice_date = $data['invoice_date'];
	$invoice_po = $data['invoice_po'];
	$inv_no = $data['invoice_no'];
	$inv_varcode = $data['variety_code'];
	$inv_variety = $data['variety'];
	$inv_amnount = $data['amount'];
	$payment_due = $data['payment_due'];
	$status = $data['status'];
	$total = $data['total'];
	$tax = $data['tax'];
	$total_due = $data['total_due'];

	$company_data = getvalues($inv_company,'company');
    $business_name = $company_data['business_name'];

    $vcode_data = getvalues($inv_varcode,'variety_code');
    $varcode_name = $vcode_data['name'];

    $var_data = getvalues($inv_variety,'varieties');
    $var_name = $var_data['name'];

    if($status == 0){ $status = 'Unpaid'; }else{ $status = 'Paid';}

	$html = '<style type="text/css">
			.tg  {border-collapse:collapse;border-spacing:0;margin: 0 auto;text-transform: capitalize;}
			.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
			.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
			.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
			.tg .tg-0lax{text-align:left;vertical-align:top}
			.tg th.title-row{text-align: center;font-size: 18px;}
			</style>';
	$html .= '<table class="tg">
				  <tr><th class="tg-0lax title-row" colspan="12"><strong>Invoice of '.$business_name.'</strong></th></tr>
				  <tr>
				    <th class="tg-cly1">Invoice Company</th>
				    <th class="tg-0lax">Invoice Date</th>
				    <th class="tg-0lax">PO</th>
				    <th class="tg-0lax">Invoice Number</th>
				    <th class="tg-0lax">Variety code</th>
				    <th class="tg-0lax">Variety</th>
				    <th class="tg-0lax">Amnount</th>
				    <th class="tg-0lax">Payment Due</th>
				    <th class="tg-0lax">Status</th>
				    <th class="tg-0lax">Total</th>
				    <th class="tg-0lax">Tax</th>
				    <th class="tg-0lax">Total Due</th>
				  </tr>
				  <tr>
				    <td class="tg-0lax">'.$business_name.'</td>
				    <td class="tg-0lax">'.$invoice_date.'</td>
				    <td class="tg-0lax">'.$invoice_po.'</td>
				    <td class="tg-0lax">'.$inv_no.'</td>
				    <td class="tg-0lax">'.$varcode_name.'</td>
				    <td class="tg-0lax">'.$var_name.'</td>
				    <td class="tg-0lax">'.$inv_amnount.'</td>
				    <td class="tg-0lax">'.$payment_due.'</td>
				    <td class="tg-0lax">'.$status.'</td>
				    <td class="tg-0lax">'.$total.'</td>
				    <td class="tg-0lax">'.$tax.'</td>
				    <td class="tg-0lax">'.$total_due.'</td>
				  </tr>
			</table>';

	//echo $html;
    
    $dompdf = new DOMPDF();

    $dompdf->load_html($html);
    
    $dompdf->set_paper('a4', 'landscape');
    $dompdf->render();
    
    $dompdf->stream( 'Invoice - '.$id.'.pdf' , array( 'Attachment'=>0 ) );
