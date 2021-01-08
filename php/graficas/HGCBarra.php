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
$id = $_GET['idsen'];
	if ($con) {
		if ($op == "") {
			$sql = "SELECT MAX(dB) AS VMAX, MIN(dB) AS VMIN, ROUND(AVG(dB)) AS VPROM FROM tb_registros";
		}else{
			if (VerificarExistencia($op,$con) == 1) {
				$sql = "SELECT MAX(dB) AS VMAX, MIN(dB) AS VMIN, ROUND(AVG(dB)) AS VPROM FROM tb_registros WHERE ID = '$id'";
			}else{
				$sql = "SELECT MAX(dB) AS VMAX, MIN(dB) AS VMIN, ROUND(AVG(dB)) AS VPROM FROM tb_registros";
			}	
		}	
		$consulta = mysqli_query($con,$sql);
		$json_array = array();
		while ($row = mysqli_fetch_array($consulta)) {
		$sub_array = array();
		$sub_array['max'] = $row['VMAX'];
		$sub_array['min'] = $row['VMIN'];
		$sub_array['prom'] = $row['VPROM'];
		$json_array[] = $sub_array;
	}
	echo json_encode($json_array);
	mysql_close($con);
	}else{
		echo "No se pudo conectar con el sevidor". mysql_error();
	}

	function VerificarExistencia($idv,$conex){	
		$consulta = "SELECT * FROM tb_registros WHERE ID = '$idv'";
		$result = mysqli_query($conex,$consulta);
		if (mysqli_num_rows($result) > 0) {
	    	return 1;
	 	}else {
	   		return 0;
	  	}
	}
?>
