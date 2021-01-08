<?php
//------------------------------------------------------------------
//-----------------DATOS DEL SERVIOR--------------------------------
//require("../Conexion/ConexionData.php");
/*$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);*/

$server='localhost';
$user='naraproj_semafbd';
$passw='tesis2020';
$bd='naraproj_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//------------------------------------------------------------------
if ($con) {
	$sql = "SELECT DISTINCT Ubicacion FROM tb_sensores";
	$consulta = mysqli_query($con, $sql);
	while ($row = mysqli_fetch_array($consulta)) {
		$htmlcode .= "<option value='".$row['Ubicacion']."'>".$row['Ubicacion']."</option>";
	}
	echo ($htmlcode);
	mysqli_close($con);	
}else{
	$errorb = "No se pudo conectar con el servidor".mysql_error();
  	echo $errorb;
}
?>