<?php
//-----------------DATOS DEL SERVIOR--------------------------------
$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//-------------------------------------------------------------------
if ($con) {
  $id = $_POST['idsen'];
  $nomb = $_POST['namesen'];
  $ubi = $_POST['ubicsen'];
  if (ValidarExistencia($con,$id) == 1) {
  	$sql = "UPDATE tb_sensores SET Nombre = '$nomb', Ubicacion = '$ubi' WHERE ID = '$id'";
  	echo mysqli_query($con,$sql);
  	mysqli_close($con);
  }else{
  	echo 2;
  }
}else{
  $errorb = "No se pudo conectar con el servidor".mysql_error();
  echo $errorb;
}
//-------------------------------------------------------------------
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