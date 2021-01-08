<?php
//------------------------------------------------------------------
//-----------------DATOS DEL SERVIOR--------------------------------
// --> Tonohost mysql server
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
	$op = $_GET['idsen'];
    //echo ($op);
    //echo (VerificarExistencia($op,$con));
	if (VerificarExistencia($op,$con) == 1) {
        //echo ("entro al segundo");
        $sql = "CALL GraficaTRID('$op')";
		//$sql = "SELECT  Fecha AS F, DATE_FORMAT(Fecha, '%H') AS H, DATE_FORMAT(Fecha, '%i') AS M, DATE_FORMAT(Fecha, '%S') AS S, dB AS Dato FROM `tb_registros` WHERE ID = '$op' ORDER BY Fecha DESC LIMIT 1";
		$consulta = mysqli_query($con,$sql);
		$json_array = array();
		while ($row = mysqli_fetch_array($consulta)) {
			$sub_array = array();
			$sub_array['tiempo'] = $row['F'];
			$sub_array['db'] = $row['Dato'];
			$json_array[] = $sub_array;
		}	
	}else{
            //echo ("entro al tercero");from_unixtime(fecha_creacion,'%Y-%m-%d) 2020-07-10 
			// falta acondicionarla para mostrar para mostrar alguno en especifico
		/*$sql = "SELECT DISTINCT R.ID AS RID, (SELECT dB FROM tb_registros WHERE ID = RID ORDER BY Fecha DESC LIMIT 1) AS DB, NOW() AS F FROM tb_registros AS R, tb_sensores AS S WHERE S.Nombre = '$op' AND R.ID = S.ID ORDER BY R.ID";*/
		$sql = "CALL GraficaTRLugar('$op')";
		$consulta = mysqli_query($con,$sql);
		$json_array = array();
		$cont = 0;
		$prom = 0;
		$date;
		$sub_array = array();
		while ($row = mysqli_fetch_array($consulta)) {
			$cont = $cont + 1;
			$date = $row['F'];
			//$sub_array['db'] = $row['DB'];
			//$json_array[] = $sub_array;
			$prom = $prom + intval($row['DB']);
		}
		$sub_array['tiempo'] = $date;
		$sub_array['db'] = round($prom / $cont); 
		$json_array[] = $sub_array;	
	}
	//$json_array[] = $filas;
	echo json_encode($json_array); 
	mysqli_close($con);
}else {
	echo "No se pudo conectar con el sevidor". mysql_error();
}

function VerificarExistencia($id,$conex){	
	$consulta = "SELECT * FROM tb_registros WHERE ID = '$id'";
	$result = mysqli_query($conex,$consulta);
	if (mysqli_num_rows($result) > 0) {
    	return 1;
 	}else {
   		return 0;
  	}
}
?>

