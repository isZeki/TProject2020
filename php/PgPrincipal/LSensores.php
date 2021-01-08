<?php
//------------------------------------------------------------------
//-----------------DATOS DEL SERVIOR--------------------------------
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
	$nomb=$_POST['sn'];
	$sql = "SELECT ID FROM tb_sensores WHERE Nombre = '$nomb'";
	$consulta = mysqli_query($con, $sql);
	$htmlcode ="<option value='".$nomb."'>".$nomb."</option>";
	//$json_array = array();
	while ($row = mysqli_fetch_array($consulta)) {
		/*$json_array[] = $row;*/
		$htmlcode .= "<option value='".$row['ID']."'>".$row['ID']."</option>";
	}
	/*echo json_encode($json_array);*/
	echo ($htmlcode);
	mysqli_close($con);	
}else{
	$errorb = "No se pudo conectar con el servidor".mysql_error();
  	echo $errorb;
}
?>