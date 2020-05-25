<?php
 //-----------------DATOS DEL SERVIOR--------------------------------
$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//-------------------------------------------------------------------
if($con){
$id=$_POST['idsen'];
$nombre=$_POST['namesen'];
$ubicacion=$_POST['ubicsen'];
$estado='Activo';
date_default_timezone_get('America/Panama');
$fecha = date("Y-m-d H:i:s");
//Verficiar Existencia del ID
   if (verificar_existenica($id,$con) == 1) {
    //sentencia sql
    echo 2;
   }else{
     $sql="INSERT INTO tb_sensores (ID,Nombre,Ubicacion,FechaRegistro,Estado) VALUES ('$id','$nombre','$ubicacion','$fecha','$estado')";
     echo mysqli_query($con,$sql);
     mysqli_close($con);
   }
}else{
  $errorb = "No se pudo conectar con el servidor".mysql_errno();
  echo $errorb;
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
//-----------ACCION DE BOTONES DEL FORMULARIO DE SENSOR--------------
 /*
//--BOTON ENVIAR PARA REGISTRAR SENSOR-------------------------------
 if(isset($_POST["btn_enviar"])){
 	// verificar conexion
 	if($con){
 	$id=$_POST['idsen'];
 	$nombre=$_POST['namesen'];
 	$ubicacion=$_POST['ubicsen'];
 	$estado='Activo';
 	//Verficiar Existencia del ID
 	$verif = "SELECT COUNT(ID) FROM tb_sensores WHERE ID = '$idsen'";
 	$result = mysqli_query($con,$verfi);
   	 if ($result = "0") {
    	//sentencia sql
 		$sql="INSERT INTO tb_sensores (ID,Nombre,Ubicacion,Estado) VALUES ('$id','$nombre','$ubicacion','$estado')";
 		mysqli_query($con,$sql);
 		mysqli_close($con);
 		echo "Datos guardados correctamente";
   	 }else{echo "El ID de sensor ya existe";}
 	}else{echo "No se pudo conectar con el servidor";}
 }
//--BOTON MODIFICAR REGISTRO DE SENSOR-------------------------------
 if (isset($_POST["btn_modificar"])) {
 	if ($con) {
 		$idm = $_POST['idsen'];
 		$verif = "SELECT COUNT(ID) FROM tb_sensores WHERE ID = '$idm'";
 		$Vresult = mysqli_query($con,$verfi);
 		if ($Vresult = '1') {
 			$nombrem=$_POST['namesen'];
 			$ubicacionm=$_POST['ubicsen'];
 			$sql="UPDATE tb_sensores SET Nombre = '$nombrem', Ubicacion = '$ubicacionm' WHERE ID ='$idm'";
 			mysqli_query($con,$sql);
 			mysqli_close($con);
 			echo "Datos modificados correctamente";
 		}else{echo "El ID del sensor no se encuentra registrado";}
 	}else{echo "No se pudo conectar con el servidor";}
}*/
 ?>
