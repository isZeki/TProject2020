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
	/*$sql="SELECT DATE_FORMAT(Hora, \"%H:%i:%S\"),db0,db1,db2,db3,db4,db5,db6,db7,db8,db9 FROM tb_prueba ORDER BY Hora";*/
	//$sql = "SELECT * FROM tb_prueba_dos";
	//$sql = "SELECT DATE_FORMAT(Fecha, '%r') as Hora, dB FROM tb_prueba_uno";
	$sql = "SELECT DATE_FORMAT(Fecha, '%r') AS Hora, DATE_FORMAT(Fecha, '%h') AS H, DATE_FORMAT(Fecha, '%i') AS M, DATE_FORMAT(Fecha, '%S') AS S, dB FROM tb_prueba_uno";
	$consulta = mysqli_query($con,$sql);
	$json_array = array();
	$filas = array();
	while ($row = mysqli_fetch_array($consulta)) {
		$sub_array = array();
		$sub_array['Hora'] = $row['Hora'];
		$sub_array['hor'] = $row['H'];
		$sub_array['min'] = $row['M'];
		$sub_array['sec'] = $row['S']; 
		$sub_array['Dato'] = $row['dB'];
		$json_array[] = $sub_array;
	}
	echo json_encode($json_array); 
	mysqli_close($con);
}else {
	echo "No se pudo conectar con el sevidor". mysql_error();
}
//------------------------------------------------------------------
//------------------------------------------------------------------
?>