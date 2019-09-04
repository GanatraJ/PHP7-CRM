<!--<script src="assets/js/jquery.js"></script>-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript"></script>
<script src="assets/js/bootstrap.js"></script>
<script src="assets/js/jqueryval.js"></script>
<script src="assets/js/jquery.tabletoCSV.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css">
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<style type="text/css">

</style>
<script type="text/javascript">
    $(document).ready(function() {
        console.log('window.location.href: '+window.location.href);
        /*select2*/
        //$('.company-sel').select2();
            
        /* mobile menu*/
        $('.hamburger').on('click', function () {
            $('#side-menu-bar').toggleClass('is-active');
            $('.hamburger i').toggleClass('fa-bars fa-times');
        });
        /*data table*/
        $('.data-table').DataTable({ language: { search: "" , searchPlaceholder: "Search","lengthMenu": " _MENU_ "},"pageLength":50,"order":[],
            initComplete: function () { 
                this.api().columns([0]).every( function () {
                    console.log("aa");
                    var column = this;
                    var select = $('<select id="ooo-location-selection" class="input-sm square-form-field" style="width: 80%;"><option value="">'+$('.data-table').data("label")+'</option></select>')
                    .prependTo( $('.search-dropdown'))
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                            );

                        column
                        .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                    } );

                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            }
        } );
        $('.dataTables_filter input').addClass("form-control input-sm square-form-field");
        $('#DataTables_Table_0_length select').addClass("form-control input-sm square-form-field");
        $('#DataTables_Table_0_length label').append('<div class="arrow-down-tb"></div>');
        //$('#DataTables_Table_0_filter label').append('<i class="glyphicon glyphicon-search"></i>');
    });
</script>
<!-- Include Date Range Picker -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>