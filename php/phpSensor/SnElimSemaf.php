<?php 
 //-----------------DATOS DEL SERVIOR--------------------------------
$server='localhost';
$user='naraproj_semafbd';
$passw='tesis2020';
$bd='naraproj_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//-------------------------------------------------------------------
if ($con) {
  $id = $_POST['idsf'];
  if (ValidarExistencia($con,$id) == 1) {
    $sql = "DELETE FROM tb_semaforo WHERE ID = '$id'";
    echo mysqli_query($con,$sql);
    mysqli_close($con);
  }else{
    echo 2;
  }
}else{
  $errorb = "No se pudo conectar con el servidor".mysql_error();
  echo $errorb;
}

function ValidarExistencia($conect, $idv){
 $consulta = "SELECT * FROM tb_semaforo WHERE ID = '$idv'";
 $result = mysqli_query($conect,$consulta);
 if (mysqli_num_rows($result) > 0 ) {
  return 1;
 }else{
  return 0;
 }
}
?>