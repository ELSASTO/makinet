<!-- admin -->
<?php if($_SESSION['tipo_usuario'] == 1){ ?>
    <script src="../components/headerH/tools/toolsBtn.js"></script>
    <script src="../components/headerH/notifications/notificationsBtn.js"></script>
    <script src="../components/nav/navadmin/configurations.js"></script>
    <script src="../components/nav/navadmin/information.js"></script>
    <script src="../components/nav/navadmin/pages.js"></script>
    <script src="../components/nav/navadmin/accessDirect.js"></script>
    <script src="../components/nav/navadmin/infoUser.js"></script>
    <script src="../components/nav/navadmin/nameBusiness.js"></script>
<?php } ?>

<?php if($_SESSION['tipo_usuario'] == 2){ ?>
    <script src="../components/headerH/tools/toolsBtn.js"></script>
    <script src="../components/headerH/notifications/notificationsBtn.js"></script>
    <script src="../components/nav/navuser/configurations.js"></script>
    <script src="../components/nav/navuser/information.js"></script>
    <script src="../components/nav/navuser/pages.js"></script>
    <script src="../components/nav/navuser/accessDirect.js"></script>
    <script src="../components/nav/navuser/infoUser.js"></script>
    <script src="../components/nav/navuser/nameBusiness.js"></script>
<?php } ?>

<?php if($_SESSION['tipo_usuario'] == 3){ ?>
    <script src="../components/headerH/tools/toolsBtn.js"></script>
    <script src="../components/headerH/notifications/notificationsBtn.js"></script>
    <script src="../components/nav/navcustomer/configurations.js"></script>
    <script src="../components/nav/navcustomer/information.js"></script>
    <script src="../components/nav/navcustomer/pages.js"></script>
    <script src="../components/nav/navcustomer/accessDirect.js"></script>
    <script src="../components/nav/navcustomer/infoUser.js"></script>
    <script src="../components/nav/navcustomer/nameBusiness.js"></script>
<?php } ?>

<?php if($_SESSION['tipo_usuario'] == 4){ ?>
    <script src="../components/headerH/tools/toolsBtn.js"></script>
    <script src="../components/headerH/notifications/notificationsBtn.js"></script>
    <script src="../components/nav/navadminarea/configurations.js"></script>
    <script src="../components/nav/navadminarea/information.js"></script>
    <script src="../components/nav/navadminarea/pages.js"></script>
    <script src="../components/nav/navadminarea/accessDirect.js"></script>
    <script src="../components/nav/navadminarea/infoUser.js"></script>
    <script src="../components/nav/navadminarea/nameBusiness.js"></script>
<?php } ?>


<script src="../components/init.js"></script>