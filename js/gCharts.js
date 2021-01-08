$(document).ready(function(){

	/*setInterval(function(){
		var ob = "";
		$.ajax({
			url: "php/generardatos.php",
			type: "POST",
			data: ob,
			success:function(r){}
		});
	},2000);*/

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
	
//---------------------------------------------------------------------
//---------------------------------------------------------------------
  var idbtn="";
  //----GRAFICA DECIBELES VS TIEMPO------------------------>
  google.charts.load('current', {packages: ['corechart']});
  google.charts.setOnLoadCallback(drawChartdBvT);
  //----GRAFICA DE BARRA----------------------------------->
  google.charts.load('current', {packages: ['bar']});
  google.charts.setOnLoadCallback(drawChartBarr);
  /*para agregar evento a los botones añadidos dinamicamente apuntamos primeramente
  a 'document' y posteriormente en "on" el evento y el nombre de clase o id del elemento */
  $(document).on('click', '#Contenedor-lista .CL-botones',function(){
    idbtn = $(this).attr('id');
    //alert(idbtn);
    $('body #Contenedor-lista .CL-botones').css("background-color","rgb(28, 40, 51)").css("color","white");
    $(this).css("background-color","white").css("color","black");
    //----GRAFICA DECIBELES VS TIEMPO------------------------>
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChartdBvT);
    //----GRAFICA DE BARRA----------------------------------->
    google.charts.load('current', {packages: ['bar']});
    google.charts.setOnLoadCallback(drawChartBarr);
  });

  	function drawChartdBvT(){
      var jsonDT = "";
      jsonDT = $.ajax({
                  url: "php/graficas/PPdBvT.php?idsen="+idbtn,
                  dataType: "json",
                  async: false
                }).responseText;
      
      var json = JSON.parse(jsonDT);

  	  var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Tiempo');
      data.addColumn('number', 'Decibeles');
      //---Recorrer json y agregar punto a la grafica--
      for (var i = 0; i <= json.length - 1; i++) {
      	var h = parseInt(json[i].hora);
      	var m = parseInt(json[i].min);
      	var s = parseInt(json[i].sec);
      	var decibel = parseInt(json[i].db);
      	data.addRows([
      		[[h,m,s],decibel],
      	]);
      }
      //-----------------------------------------------
      var options = {
      	title: 'Decibeles vs Tiempo',
      	/*width: 400,
      	heigh: 300,*/
      	//-----------------------------
        hAxis: {
          title: 'Tiempo',
          format: 'HH:mm',
          
        },
        vAxis: {
          title: 'Decibeles',
        }
      };

      var chart = new google.visualization.LineChart(document.getElementById('CGdbvt'));
      chart.draw(data, google.charts.Bar.convertOptions(options));
  	};
//---------------------------------------------------------------------
//---------------------------------------------------------------------
function drawChartBarr(){
  var jsonB = "";
  jsonB = $.ajax({
                  url:"php/graficas/PPbarra.php?idsen="+idbtn,
                  dataType: "json",
                  async: false
                }).responseText;

  var jsonBarra = JSON.parse(jsonB);
  
  	  var data = new google.visualization.DataTable();
      data.addColumn('string', 'Nivel');
      data.addColumn('number', 'Decibeles');
      //---Recorrer json y agregar punto a la grafica--
      console.log(jsonBarra);
      data.addRows([
      		["dB Maximo",parseInt(jsonBarra[0].max)],
      		["dB Mínimo",parseInt(jsonBarra[0].min)],
      		["dB Promedio",parseInt(jsonBarra[0].prom)]
      	]);
 //-----------------------------------------------
      var options = {
      	title: '',
      	/*width: 400,
      	heigh: 300,*/
      	//-----------------------------
        hAxis: {
          title: 'Nivel',
        },
        vAxis: {
          title: 'Decibeles',
        },
        legend: {position:'none'},
      };

      var chart =  new google.charts.Bar(document.getElementById('CGbarra'));
      chart.draw(data, options);
 }

});