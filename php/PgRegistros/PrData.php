<?php
//------------------------------------------------------------------
//-----------------DATOS DEL SERVIOR--------------------------------
// --> Tonohost mysql server
$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//------------------------------------------------------------------
$op = $_POST['CHK'];
$id = $_POST['ID'];
$fi = $_POST['FI'];  
$ff = $_POST['FF'];
$return_op;
$sql = "";

if ($op == 0){ // chk opcion dia
	if($id != "" && $fi == ""){ //opcion solamente id 
			$sql = SQLSoloID($id);
			$return_op = 1;
		//-----------------------------------------------------------------
	}else if ($id != "" && $fi != "") { //opcion id y día
			$sql = "SELECT DATE(Fecha) AS F, CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = '$id' AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = '$id' AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = '$id' AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = '$id' AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC, COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE ID = '$id' AND DATE(Fecha) = '$fi' GROUP BY F HAVING COUNT(F) > 1";
			$return_op = 1;
		//----------------------------------------------------------------
	}else if($id == "" && $fi != ""){ // opcion solamente día
			$sql = "SELECT DATE(Fecha) AS F, CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC, COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE DATE(Fecha) = '$fi' GROUP BY F HAVING COUNT(F) > 1";
			$return_op = 1;
	}
	//-------------------------------------
	//-------------------------------------
}else if($op == 1){ // chk opcion mes / año
	if($id != "" && $fi == "" && $ff == ""){ //opcion solamente id 
		//-------------------------------------
			$sql = SQLSoloID($id);
			$return_op = 1;
		//-------------------------------------
	}else if ($id != "" && $fi != "" && $ff == ""){ // opcion id y mes
		$sql = "SELECT ID AS I, DATE(Fecha) AS F , CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC ,COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE ID = '$id' AND DATE_FORMAT(Fecha,'%m') = '$fi' GROUP BY DATE(Fecha),I HAVING COUNT(DATE(Fecha)) > 1 AND COUNT(I) > 1";
		$return_op = 3;
	}else if($id != "" && $fi == "" && $ff != ""){ // opcion id y año
		$sql = "SELECT ID AS I, DATE(Fecha) AS F , CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC ,COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE ID = '$id' AND DATE_FORMAT(Fecha,'%Y') = '$ff' GROUP BY DATE(Fecha),I HAVING COUNT(DATE(Fecha)) > 1 AND COUNT(I) > 1";
		$return_op = 3;
	}else if ($id != "" && $fi != "" && $ff != ""){ // opcion id-mes-año
		$fecha = $ff . "-" . $fi;
		$sql = "SELECT ID AS I, DATE(Fecha) AS F , CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC ,COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE ID = '$id' AND DATE_FORMAT(Fecha, '%Y-%m') = '$fecha' GROUP BY DATE(Fecha),I HAVING COUNT(DATE(Fecha)) > 1 AND COUNT(I) > 1";
		$return_op = 3;
	}else if($id == "" && $fi != "" && $ff != ""){ // opcion mes-año
		$fecha = $ff . "-" . $fi;
		$sql = "SELECT ID AS I, DATE(Fecha) AS F , CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC ,COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE DATE_FORMAT(Fecha, '%Y-%m') = '$fecha' GROUP BY DATE(Fecha),I HAVING COUNT(DATE(Fecha)) > 1 AND COUNT(I) > 1";
		$return_op = 3;
	}else if($id == "" && $fi == "" && $ff != ""){ // opcion año
		$sql = "SELECT ID AS I, DATE(Fecha) AS F , CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC ,COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE DATE_FORMAT(Fecha,'%Y') = '$ff' GROUP BY DATE(Fecha),I HAVING COUNT(DATE(Fecha)) > 1 AND COUNT(I) > 1";
		$return_op = 3;
	}else if($id == "" && $fi != "" && $ff == ""){ // opcion mes
		$sql = "SELECT ID AS I, DATE(Fecha) AS F , CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC ,COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE DATE_FORMAT(Fecha,'%m') = '$fi' GROUP BY DATE(Fecha),I HAVING COUNT(DATE(Fecha)) > 1 AND COUNT(I) > 1";
		$return_op = 3;
	}
	//-------------------------------------
	//-------------------------------------
}else if ($op == 2){ // chk opcion rango de fechas 
	if ($id != "" && $fi == "" && $ff == ""){
		$sql = SQLSoloID($id);
		$return_op = 1;
	}else if ($id == "" && $fi != "" && $ff != ""){
		$sql = "SELECT ID AS I, DATE(Fecha) AS F , CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC ,COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE DATE(Fecha) BETWEEN '$fi' AND '$ff' GROUP BY DATE(Fecha),I HAVING COUNT(DATE(Fecha)) > 1 AND COUNT(I) > 1";
		$return_op = 3;
	}else if($id != "" && $fi != "" && $ff != ""){
		$sql = "SELECT ID AS I, DATE(Fecha) AS F , CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = I AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE DATE(Fecha) = F AND ID = I ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC ,COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE ID = '$id' AND DATE(Fecha) BETWEEN '$fi' AND '$ff' GROUP BY DATE(Fecha),I HAVING COUNT(DATE(Fecha)) > 1 AND COUNT(I) > 1";
		$return_op = 3;
	}
}

function SQLSoloID($idv){
	$cadena = "SELECT DATE(Fecha) AS F, CONCAT(TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = '$idv' AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1),'%T'),'-',TIME_FORMAT((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = '$idv' AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),'%T')) AS H ,TIME_FORMAT(TIMEDIFF((SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = '$idv' AND DATE(Fecha) = F ORDER BY Fecha DESC LIMIT 1),(SELECT TIME(Fecha) FROM tb_prueba_tres WHERE ID = '$idv' AND DATE(Fecha) = F ORDER BY Fecha ASC LIMIT 1)),'%T') AS TC, COUNT(dB) AS DC ,MAX(dB) AS MX, MIN(dB) AS MI, ROUND(AVG(dB)) AS P FROM tb_prueba_tres WHERE ID = '$idv' GROUP BY F HAVING COUNT(F) > 1";
	return $cadena;
}




//--------------mostrar datos en la tabla------------------------------------
$jcadena="";
if($return_op == 1){
	$cont = 0;
	$na = "No asignado";
	$result = mysqli_query($con,$sql);
	while ($row = mysqli_fetch_array($result)){
		 $cont += 1;
		 $jcadena .= "<tr>
		 			<td id='B1-thd-c1'>".$cont."</td>
		 			<td id='B1-thd-c2'>".$row['F']."</td>
		 			<td id='B1-thd-c3'>".$row['H']."</td>
		 			<td id='B1-thd-c4'>".$row['TC']."</td>
		 			<td id='B1-thd-c5'>".$row['DC']."</td>
		 			<td id='B1-thd-c6'>".$row['MX']."</td>
		 			<td id='B1-thd-c7'>".$row['MI']."</td>
		 			<td id='B1-thd-c8'>".$row['P']."</td>
		 			<td id='B1-thd-c9'>".$na."</td>
	 			 </tr>";
	}
}else if ($return_op == 3) {
	$cont = 0;
	$na = "No asignado";
	$result = mysqli_query($con,$sql);
	while ($row = mysqli_fetch_array($result)){
		 $cont += 1;
		 $jcadena .= "<tr>
		 			<td id='B3-thd-c1'>".$cont."</td>
		 			<td id='B3-thd-c2'>".$row['I']."</td>
		 			<td id='B3-thd-c3'>".$row['F']."</td>
		 			<td id='B3-thd-c4'>".$row['H']."</td>
		 			<td id='B3-thd-c5'>".$row['TC']."</td>
		 			<td id='B3-thd-c6'>".$row['DC']."</td>
		 			<td id='B3-thd-c7'>".$row['MX']."</td>
		 			<td id='B3-thd-c8'>".$row['MI']."</td>
		 			<td id='B3-thd-c9'>".$row['P']."</td>
		 			<td id='B3-thd-c10'>".$na."</td>
	 			 </tr>";
	}
}
if ($jcadena != "") {
	echo $jcadena;
}else{
	echo 2;
}	
 mysqli_free_result($result);
 mysqli_close($con);
?>

