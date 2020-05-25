<?php 
 //-----------------DATOS DEL SERVIOR--------------------------------
$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//-------------------------------------------------------------------
if($con){
 $filt = $_POST['filtro'];
 $sql="SELECT * FROM tb_sensores WHERE ID = '$filt' OR Nombre = '$filt' OR Ubicacion = '$filt'";
 echo "
 	<thead style=\"display: block;\">
 		<tr>
 			<th id=\"col1\" style=\"width: 150px;\">ID</th>
			<th id=\"col2\" style=\"width: 180px;\">Nombre</th>
			<th id=\"col3\" style=\"width: 180px;\">Ubicación</th>
			<th id=\"col4\" style=\"width: 220px;\">Fecha Registrado</th>
			<th id=\"col5\" style=\"width: 120px;\">Estado</th>
 		</tr>
 	</thead>
	";

     $result = mysqli_query($con,$sql);
     while ($consulta = mysqli_fetch_array($result)) {
	 			echo "<tr style=\"border: 1px solid; border-color: black;\">
	 						<td style=\"border: 1px solid; border-color: black;width: auto; text-align: center;\">".$consulta['ID']."</td>
	 						<td style=\"border: 1px solid; border-color: black;width: 150px; text-align: center;\">".$consulta['Nombre']."</td>
	 						<td style=\"border: 1px solid; border-color: black;width: 150px; text-align: center;\">".$consulta['Ubicacion']."</td>
	 						<td style=\"border: 1px solid; border-color: black;width: 180px; text-align: center;\">".$consulta['FechaRegistro']."</td>
	 						<td style=\"border: 1px solid; border-color: black;width: 100px; text-align: center;\">".$consulta['Estado']."</td>
	 					  </tr>";
	 		}
     mysqli_free_result($result);
     mysqli_close($con);
}else{
  $errorb = "No se pudo conectar con el servidor".mysql_error();
  echo $errorb;
}
?>