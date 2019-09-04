<?php
    $data = getvalues(1,'system_setting');
    if( !empty($data)){
        $system_name = $data['system_name'];
        $system_logo = $data['system_logo'];
    }else{
        $system_name = 'Dev Site';
    }
?>
<!-- HEADER MOBILE-->
<div class="header-mobile">
    <div class="header-mobile__bar">
        <div class="container-fluid">
            <div class="header-mobile-inner">
                <a href="index.php" title="logo">
                    <?php if(isset($system_logo)){ ?>
                        <img id="login-logo-img" src="data:image/jpeg;base64,<?php echo base64_encode( $system_logo ); ?>" height="70" />
                        <!-- <img id="login-logo-img" src="./assets/images/logo-bw.png" height="70" /> -->
                    <?php }else{ ?>
                        <h1 class="system-name"><?php echo $system_name; ?></h1>
                    <?php } ?>
                </a>
                <button class="hamburger hamburger--slider" type="button">
                    <i class="fa fa-bars fa-1x" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
</div>
<!-- END HEADER MOBILE-->
<div class="navbar navbar-inverse navbar-fixed-top" id="main-navbar">
    <div class="my-navbar-logo-header">
        <a href="index.php" title="logo">
            <?php if(isset($system_logo)){ ?>
                <img id="login-logo-img" src="data:image/jpeg;base64,<?php echo base64_encode( $system_logo ); ?>" height="70" />
            <?php }else{ ?>
                <h1 class="system-name"><?php echo $system_name; ?></h1>
            <?php } ?>
        </a>
    </div>
    <div class="wg-navbar-right">            
        <ul class="wg-left wg-tempholder flex-big-item">
            <li class="wg-right">
                <h3><?php  echo $_SESSION['name']; ?> <i class="fa fa-user-circle"></i></h3> 
            </li>
        </ul>
    </div>
</div>