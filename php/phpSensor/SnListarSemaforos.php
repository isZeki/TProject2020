<?php 
 //-----------------DATOS DEL SERVIOR--------------------------------
$server='localhost';
$user='naraproj_semafbd';
$passw='tesis2020';
$bd='naraproj_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//-------------------------------------------------------------------
if($con){
 $sql="SELECT * FROM tb_semaforo";
     $result = mysqli_query($con,$sql);
     while ($consulta = mysqli_fetch_array($result)) {
	 			echo "<tr style=\"border: 1px solid; border-color: black;\">
	 						<td style=\"border: 1px solid; border-color: black;width: 150px; text-align: center;\">".$consulta['ID']."</td>
	 						<td style=\"border: 1px solid; border-color: black;width: 180px; text-align: center;\">No requerido</td>
	 						<td style=\"border: 1px solid; border-color: black;width: 240px; text-align: center;\">".$consulta['Seccion']."</td>
	 						<td style=\"border: 1px solid; border-color: black;width: 240px; text-align: center;\">No requerido</td>
	 						<td style=\"border: 1px solid; border-color: black;width: 120px; text-align: center;\">No requerido</td>
	 					  </tr>";
	 		}
     mysqli_free_result($result);
     mysqli_close($con);
}else{
  $errorb = "No se pudo conectar con el servidor".mysql_error();
  echo $errorb;
}
?>