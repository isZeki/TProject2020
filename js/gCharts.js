$(document).ready(function(){

	setInterval(function(){
		var ob = "";
		$.ajax({
			url: "php/generardatos2.php",
			type: "POST",
			data: ob,
			success:function(r){}
		});
	},2000);

	/*var json = "";
	setTimeout(function(){
		var ob = "";
		$.ajax({
			url: "php/ObtenerRegistros.php",
			type: "POST",
			data: ob,
			success:function(r){
				json = JSON.parse(r);
				console.log(json);
			}
		},6000);
	});*/
	var json = "";
	$(function(){
		var ob = "";
		$.ajax({
			url: "php/ObtenerRegistros.php",
			type: "POST",
			data: ob,
			success:function(r){
				json = JSON.parse(r);
				console.log(json);
			}
	    });
	});
//---------------------------------------------------------------------
//---------------------------------------------------------------------
	google.charts.load('current', {packages: ['corechart']});
  	google.charts.setOnLoadCallback(drawChartdBvT);

  	function drawChartdBvT(){
  	  var data = new google.visualization.DataTable();
      data.addColumn('string', 'Tiempo');
      data.addColumn('number', 'Decibeles');
      //---Recorrer json y agregar punto a la grafica--
      for (var i = 0; i <= json.length - 1; i++) {
      	var hora = json[i].Hora;
      	var h = json[i].hor;
      	var m = json[i].min;
      	var s = json[i].sec;
      	var decibel = parseInt(json[i].Dato);
      	/*console.log(hora);
        console.log(decibel);
        console.log("-----");*/
      	data.addRows([
      		[new Date(0,0,0,h,m,s),decibel],
      	]);
      }
      //-----------------------------------------------
      var options = {
      	title: 'Decibeles vs Tiempo',
      	with: 400,
      	heigh: 300,
      	//-----------------------------
        hAxis: {
          title: 'Tiempo',
        },
        vAxis: {
          title: 'Decibeles',
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('CGdbvt'));

      chart.draw(data, options);
  	};



});