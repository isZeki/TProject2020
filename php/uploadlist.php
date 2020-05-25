<?php
 //-----------------DATOS DEL SERVIOR--------------------------------
$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//-------------------------------------------------------------------
if($con){
 $sql="SELECT * FROM tb_sensores";
     $result = mysqli_query($con,$sql);
     while ($consulta = mysqli_fetch_array($result)) {
	 			$salida.= '<li><button class="val_list"'.$consulta['Nombre'].'</button></li>';
	 		}
     echo $salida;
     mysqli_free_result($result);
     mysqli_close($con);
}else{
  $errorb = "No se pudo conectar con el servidor".mysql_error();
  echo $errorb;
}
?>