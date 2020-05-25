$(document).ready(function(){
	/*var json = "";
	$(function(){
		var ob = "";
		$.ajax({
			url: "php/ObtenerRegistros.php",
			type: "POST",
			data: ob,
			success:function(r){
				json = JSON.parse(r);
				/*console.log(json);
				console.log(json[0][0]);
				$("#p").val(json[0][0]);
			}
		});
	});*/
//----------------------------------------------------------
//----------------------------------------------------------	

	/*var speedData = {
	 labels: ["0min", "5min", "10min", "15min", "20min", "25min", "30min",
  			  "35min","40min","45min","50min","55min","60min"],
  	 datasets: [{
    	label: "Decibeles",
    	data: [],
  	 }]
	};
	var chartOptions = {
	  legend: {
	    display: true,
	    position: 'top',
	  	labels: {
	      boxWidth: 80,
	      fontColor: 'black'
	    }
	  }
	};
	var lineChart = new Chart(myChart, {
    type: 'line',
    data: dBData,
    options: chartOptions
	});*/

	function chartData(ctx){
		/*var clock = new Date();
		var hour = clock.getHours();
		var minutes = clock.getMinutes();
		var seconds = clock.getSeconds();
		var hora = hour +":"+ minutes +":"+ seconds;*/
		const chart = new Chart(ctx,{
			type: "line",
			data:{
				labels: ["0min", "5min", "10min", "15min", "20min", "25min", "30min",
  			  	"35min","40min","45min","50min","55min","60min"],
	  			datasets:[{data:[0,15,34,21,43,12,56,32,21,21,43,23,20,40,60,80,100,120,115]},{
	  				label:"Tiempo",
	  				data:[],
  			  	}],
			}
		});
	};

	function renderChart(){
		const dbvst_chart = document.querySelector('#dBvTChart').getContext('2d');
		chartData(dbvst_chart);
	};

	renderChart();
}); //Fin documnete ready