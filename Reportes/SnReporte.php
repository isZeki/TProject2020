<?php
require('PDF/fpdf.php');
//==================================================
//-----------------DATOS DEL SERVIOR--------------------------------
$server='sql113.tonohost.com';
$user='ottos_25321632';
$passw='tesis2020';
$bd='ottos_25321632_semafbd';
$con = new mysqli($server,$user,$passw,$bd);
//-------------------------------------------------------------------
if ($_GET['filtro'] != "") {
	$valf = $_GET['filtro'];
	$sql = "SELECT * FROM tb_sensores WHERE ID = '$valf' OR Nombre = '$valf' OR Ubicacion = '$valf'"; 
}else{
	$sql="SELECT * FROM tb_sensores";
}

class PDF extends FPDF{
	// Cabecera de página
	function Header(){
	    // Logo
	    $this->Image('../imagenes/logo.png',10,8,33);
	    $this->SetFont('Arial','B',15);
        $this->SetFillColor(200,220,255);
	    $this->Cell(15);// Movernos a la derecha
	    // Título
	    $this->Cell(0,10,utf8_decode('Sistema de Monitorización y Alerta del Ruido'),0,0,'C');
	    $this->Ln(20);//salto de línea
	}

	// Pie de página
	function Footer(){
	    // Posición: a 1,5 cm del final
	    $this->SetY(-15);
	    // Arial italic 8
	    $this->SetFont('Arial','I',8);
	    // Número de página
	    $this->Cell(0,10,'Page '.$this->PageNo(),0,0,'C');
	}

    function ChapterTitle(){
        $this->SetFont('Arial','',12);
        $this->SetFillColor(200,220,255);// Color de fondo
        $this->Cell(0,6,'Registro de Sensores',0,1,'L',true);
        $this->Ln();
    }

}

//==================================================
$pdf = new PDF();
$pdf->AddPage();
$pdf->ChapterTitle();
//$pdf->Cell(ancho, alto, Valor o texto,borde, salto de linea, alineación, relleno);

//-----mostrando datos-----
//--encabezado--
$pdf->SetFont('Arial','B',10);
$pdf->SetFillColor(200,220,255);
$pdf->Cell(30,10,'No. ID',1,0,C,1);
$pdf->Cell(30,10,'Nombre',1,0,C,1);
$pdf->Cell(60,10,utf8_decode('Ubicación'),1,0,C,1);
$pdf->Cell(50,10,'Fecha de Registro',1,0,C,1);
$pdf->Cell(20,10,'Estado',1,1,C,1);
//-------------
$pdf->SetFont('Arial','',10);
$consulta=mysqli_query($con,$sql);
while ($row = mysqli_fetch_array($consulta)) {
	$pdf->Cell(30,10,utf8_decode($row['ID']),1,0,C,0);
	$pdf->Cell(30,10,utf8_decode($row['Nombre']),1,0,C,0);
	$pdf->Cell(60,10,utf8_decode($row['Ubicacion']),1,0,C,0);
	$pdf->Cell(50,10,utf8_decode($row['FechaRegistro']),1,0,C,0);
	$pdf->Cell(20,10,utf8_decode($row['Estado']),1,1,C,0);
}
//-------------------------
$pdf->Output();
?>