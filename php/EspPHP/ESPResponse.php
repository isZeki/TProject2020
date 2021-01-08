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
	$id = $_POST['espid'];
	if ($id == "") {
		echo "variables vacias";
	}else{
		//verificar existencia del id 
		if (verificar_existencia($id,$con) == 1) { //-->Existe..Consultar campo estado
			$sql = "SELECT * FROM tb_semaforo WHERE ID = '$id'";
			$consulta = mysqli_query($con,$sql);
			while ($row = mysqli_fetch_array($consulta)) {
				$r = $row['Estado'];
			}
			mysqli_close($con);
            echo $r;	
		}else{//-->No Existe..registrar id con valor 0 en el campo estado
			//$sql = "INSERT INTO tb_semaforo (ID,Seccion,Estado) VALUES ('$id','N','N')";
			$sql = "CALL AgregarSemaf('$id')";
			mysqli_query($con,$sql);
			mysqli_close($con);
			$r = 'T';
            echo $r;
		}
        //$result = V --> foco verde
        //$result = A --> foco amarillo
        //$result = R --> foco rojo
        //$result = T --> enciende todos los focos indicando que el id se ha guardado
       
	}
}else {
	echo "No se pudo conectar con el sevidor". mysql_error();
}

//------------------------------------------------------------------
//------------------------------------------------------------------
function verificar_existencia($idv,$conexion){
  $verif = "SELECT * FROM tb_semaforo WHERE ID = '$idv'";
  $result = mysqli_query($conexion,$verif);
  if (mysqli_num_rows($result) > 0) {
    return 1;
  }else {
    return 0;
  }
}
?>