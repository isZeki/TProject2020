$(document).ready(function(){
	$(function (){
    	$("#logo").hide().fadeIn(3000);
  	});


	var chk = 2;
	$(function(){
		$('#rdD').click(function(){ //opcion por dia
			chk = 0;
			limpiarCampos();
			$('#meses').css("display","none");
			$('#PR-lb1').html("Fecha:");
			$('#PR-Fi').css("display","");
			$('#PR-Fi').attr("type","date");
			$('#PR-Fi').attr("list","");
			$('#PR-lb2').css("display","none");
			$('#PR-Ff').css("display","none");
			$('#PR-Contenedor-Tabla').css("visibility", "hidden");
		});
		$('#rdMA').click(function(){ //opcion por mes y/o año 
			chk = 1;
			 limpiarCampos();
			 $('#PR-lb1').html("Mes:");
			 //$('#PR-Fi').attr("type","");
			 //$('#PR-Fi').attr("list","meses");
			 //$('#PR-Fi').css("text-align","center");
			 $('#PR-Fi').css("display","none");
			 $('#meses').css("display","inline");
			 //----------------------------------
			 $('#PR-lb2').html("Año:");
			 $('#PR-Ff').attr("type","text");
			 $('#PR-Ff').attr("onkeypress","return event.charCode >= 48 && event.charCode <= 57");
			 $('#PR-Ff').css("text-align","center");
			 $('#PR-lb2').css("display","");
			 $('#PR-Ff').css("display","");
			 $('#PR-Contenedor-Tabla').css("visibility", "hidden");
		});
		$('#rdR').click(function(){ //opcion por rango de fecha
			chk = 2;
			limpiarCampos();
			 $('#meses').css("display","none");
			 $('#PR-lb1').html("Fecha inicio:");
			 $('#PR-Fi').css("display","");
			 $('#PR-Fi').attr("type","date");
			 $('#PR-lb2').css("display","");
			 $('#PR-Ff').css("display","");
			 $('#PR-lb2').html("Fecha final:");
			 $('#PR-Ff').attr("type","date");
			 $('#PR-Contenedor-Tabla').css("visibility", "hidden");
		});
		/*$('#rdA').click(function(){
			chk = 2;
			 $('#PR-lb1').html("Fecha:");
			 $('#PR-Fi').attr("type","month");
			 $('#PR-lb2').css("display","none");
			 $('#PR-Ff').css("display","none");
		});*/
	});

function limpiarCampos(){
	$('#CBT-texto').val('');
	$('#PR-Fi').val('');
	$('#PR-Ff').val('');
	$('#meses').val('');
}
//-----------------------------------------------------
//-----------------VENTANA MODAL-----------------------
	$('#CB-icInfo').click(function(){
		$('.modal-contenedor').css("display","block"); 
	});
	$('.close-modal').click(function(){
		$('.modal-contenedor').css("display","none");
	});
	var modal = document.querySelector('.modal-contenedor');
	$(window).click(function(e){
		if (e.target == modal) {
			$('.modal-contenedor').css("display","none");
		}
	});
//-----------------------------------------------------
//-----------------------------------------------------
	var idS;
	var fiS;
	var ffS;
	$('#CB-btnBuscar').click(function(){
		//var opFecha = $('#PR-Fi').val();
		var fi = $('#PR-Fi').val();
		var ff = $('#PR-Ff').val();
		var m = $('#meses').val();
		var idname = $('#CBT-texto').val();
		var thc;
		if (idname == "" && fi == "" && ff == "" && m == "") {
			alert("Ninguno de los campos de busqueda contiene algun datos");
		}else{
			if (chk == 1 && m != "") {
				fi = asignarMes(m);
			}
			$.ajax({
				type: "POST",
				url: "php/PgRegistros/PrData.php",
				data: {ID:idname,FI:fi,FF:ff,CHK:chk},
				success: function(r){
					//console.log(r);
					if (r == 2) {
						alert("No se encuentran registros con esos datos.");
					}else{
						if (idname != "" && (fi == "" || fi == null) && ff == ""){
							thc = "<tr>"+
					  				"<td id='B1-thd-c1'>No.</td>"+
					  				"<td id='B1-thd-c2'>Fecha</td>"+
					  				"<td id='B1-thd-c3'>Horas</td>"+
					  				"<td id='B1-thd-c4'>Tiempo Capturado</td>"+
					  				"<td id='B1-thd-c5'>Datos Capturados</td>"+
					  				"<td id='B1-thd-c6'>dB Maximo</td>"+
					  				"<td id='B1-thd-c7'>dB Mínimo</td>"+
					  				"<td id='B1-thd-c8'>dB Promedio</td>"+
					  				"<td id='B1-thd-c9'>Riesgo</td>"+
  								 "</tr>"; 
						}else{
							if(chk == 0){
								thc = "<tr>"+
						  				"<td id='B1-thd-c1'>No.</td>"+
						  				"<td id='B1-thd-c2'>Fecha</td>"+
						  				"<td id='B1-thd-c3'>Horas</td>"+
						  				"<td id='B1-thd-c4'>Tiempo Capturado</td>"+
						  				"<td id='B1-thd-c5'>Datos Capturados</td>"+
						  				"<td id='B1-thd-c6'>dB Maximo</td>"+
						  				"<td id='B1-thd-c7'>dB Mínimo</td>"+
						  				"<td id='B1-thd-c8'>dB Promedio</td>"+
						  				"<td id='B1-thd-c9'>Riesgo</td>"+
	  								 "</tr>"; 
							}else if (chk == 1 || chk == 2) {
								thc = "<tr>"+
						  				"<td id='B3-thd-c1'>No.</td>"+
						  				"<td id='B3-thd-c2'>ID</td>"+
						  				"<td id='B3-thd-c3'>Fecha</td>"+
						  				"<td id='B3-thd-c4'>Horas</td>"+
						  				"<td id='B3-thd-c5'>Tiempo Capturado</td>"+
						  				"<td id='B3-thd-c6'>Datos Capturados</td>"+
						  				"<td id='B3-thd-c7'>dB Maximo</td>"+
						  				"<td id='B3-thd-c8'>dB Mínimo</td>"+
						  				"<td id='B3-thd-c9'>dB Promedio</td>"+
						  				"<td id='B3-thd-c10'>Riesgo</td>"+
	  								 "</tr>";
							}
						}
						idS = idname;
						fiS = fi;
						ffS = ff;
						$('#PR-Contenedor-Tabla').css("visibility", "visible");
						$('#PR-TR-THD').html(thc);
						$('#PR-TR-TBD').html(r);	
					}	
				}
			});
		}	
	}); // fin btn buscar


	$('#CB-icPdf').click(function(){
		window.open("Reportes/RgReporte.php?CHK="+chk+"&ID="+idS+"&FI="+fiS+"&FF="+ffS);
	});

	function asignarMes(fiv){
		var mes;
		switch(fiv){
			case "Enero":
				mes="01";
				break;
			case "Febrero":
				mes="02";
				break;
			case "Marzo":
				mes="03";
				break;
			case "Abril":
				mes="04";
				break;
			case "Mayo":
				mes="05";
				break;
			case "Junio":
				mes="06";
				break;
			case "Julio":
				mes="07";
				break;
			case "Agosto":
				mes="08";
				break;
			case "Septiembre":
				mes="09";
				break;
			case "Octubre":
				mes="10";
				break;
			case "Noviembre":
				mes="11";
				break;
			case "Diciembre":
				mes="12";
				break;
			default:
				break;
		}
			 return mes;
	}
	
});