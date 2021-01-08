<?php
//-----------------DATOS DEL SERVIOR--------------------------------
$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//-------------------------------------------------------------------
if ($con) {
  $id = $_POST['ids'];
  if (ValidarExistencia($con,$id) == 1) {
  	
  	$sql = "SELECT * FROM tb_sensores WHERE ID = '$id'";
  	$consulta = mysqli_query($con,$sql); 
  	$json_array = array();
  	while ($row = mysqli_fetch_assoc($consulta)) {
  		$json_array[0] = $row['ID'];
  		$json_array[1] = $row['Nombre'];
  		$json_array[2] = $row['Ubicacion'];
  		$json_array[3] = $row['FechaRegistro'];
  		$json_array[4] = $row['Estado'];
  	}
  	echo json_encode($json_array);
  	mysqli_close($con);
  }else{
  	echo 2;
  }
}else{
  $errorb = "No se pudo conectar con el servidor".mysql_error();
  echo $errorb;
}

function ValidarExistencia($conect, $idv){
 $consulta = "SELECT * FROM tb_sensores WHERE ID = '$idv'";
 $result = mysqli_query($conect,$consulta);
 if (mysqli_num_rows($result) > 0 ) {
 	return 1;
 }else{
 	return 0;
 }
}
?>