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
if ($con) {
	//date_default_timezone_get('America/Panama');
	//$fecha = date("Y-m-d H:i:s");
	$id = $_POST['espid'];
	$db = $_POST['espdb'];
	//verifica si ya el ID se encuentra en la tabla sensores
	if(ValidarExistencia($id,$con) == 1){
	// si ya existe entonces guardar datos recogidos en la tabla registros 
		if ($id == "" || $db == "") {
			echo "variables vacias";
		}else{
			//echo $id + "|" + $db;
			//echo "enviando datos";
			$sql = "INSERT INTO tb_prueba_tres (ID,Fecha,dB) VALUES ('$id',Now(),'$db')";
			mysqli_query($con,$sql);
			mysqli_close($con);
			echo "Guardado";	
		}
	}else{
	// si no existe entonces guardar el ID primeramente en la tabla sensores
		$estado='Inactivo';
		date_default_timezone_get('America/Panama');
		$fecha = date("Y-m-d H:i:s");
		$vacio = "NA";
		$sql="INSERT INTO tb_sensores (ID,Nombre,Ubicacion,FechaRegistro,Estado) VALUES ('$id','$vacio','$vacio','$fecha','$estado')";
		mysqli_query($con,$sql);
		mysqli_close($con);		
	}
}else {
	echo "No se pudo conectar con el sevidor". mysql_error();
}


function verificar_existenica($idv,$conexion){
  $verif = "SELECT * FROM tb_sensores WHERE ID = '$idv'";
  $result = mysqli_query($conexion,$verif);
  if (mysqli_num_rows($result) > 0) {
    return 1;
  }else {
    return 0;
  }
}
//------------------------------------------------------------------
//------------------------------------------------------------------
?>