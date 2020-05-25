<?php
//------------------------------------------------------------------
//-----------------DATOS DEL SERVIOR--------------------------------
$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//------------------------------------------------------------------
if ($con) {
	date_default_timezone_get('America/Panama');
	$fecha = date("Y-m-d H:i:s a");
	$db = rand(0,85);
	$sql = "INSERT INTO tb_prueba_uno (ID,Fecha,dB) VALUES ('12345','$fecha','$db')";
	mysqli_query($con,$sql);
	mysqli_close($con);
}else {
	echo "No se pudo conectar con el sevidor". mysql_error();
}
//------------------------------------------------------------------
//------------------------------------------------------------------
?>