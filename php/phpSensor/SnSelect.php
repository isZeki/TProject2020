<?php
$server='localhost';
$user='naraproj_semafbd';
$passw='tesis2020';
$bd='naraproj_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//------------------------------------------------------------------
if ($con) {
	$sql = "SELECT DISTINCT Nombre FROM tb_sensores";
	$consulta = mysqli_query($con, $sql);
	//$json_array = array();
	while ($row = mysqli_fetch_array($consulta)) {
		/*$json_array[] = $row;*/
		$htmlcode .= "<option value='".$row['Nombre']."'>".$row['Nombre']."</option>";
	}
	/*echo json_encode($json_array);*/
	echo ($htmlcode);
	mysqli_close($con);	
}else{
	$errorb = "No se pudo conectar con el servidor".mysql_error();
  	echo $errorb;
}
?>