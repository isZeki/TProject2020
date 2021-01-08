$(document).ready(function(){
/*================================================*/
/*............PAGINA PRINCIPAL INDEX..............*/
  $(function (){
    $("#logo").hide().fadeIn(3000);
  });

  //------------------------------------
  //----Agregar Ubicaciones al Select---
  /*$(function AgregarUbi(){
    $.ajax({
      type:"POST",
      url:"php/PgPrincipal/ListarUbicaciones.php",
      success:function(r){
        //console.log(r);
        $('#SelectUb').html(r);
      }
    }); 
  });*/
  //------------------------------------------------------------
  //------------------------------------------------------------
  //-----Agregar Lista de Secciones que contienen sensores------
  var botones;
  $(function AgregarListaSensores(){
    var jsonarray= $.ajax({
      url: "php/PgPrincipal/ListarSensores.php",
      dataType: "json",
      async: false
    }).responseText;
    jsonlist = JSON.parse(jsonarray);
    var i;
    //cadena html para ser agregada a la pagina con las secciones de sensores
    var htmlcode = "";
     for (i = 0 ;i <= jsonlist.length - 1; i++) {
       htmlcode += '<button class="CL-botones" id="'+ jsonlist[i].Nombre + '">' + jsonlist[i].Nombre + '</button>';
       if (i==0) { //primer valor se envia al Select de sensores y a la grafica
         DListSensores(jsonlist[i].Nombre);
         //DrawChart(jsonlist[i].Nombre);
         //DrawBarr(jsonlist[i].Nombre);
       }
     }
     //console.log(htmlcode);
     $('#SLista').html(htmlcode);
     botones = document.querySelectorAll('.CL-botones');
  });
  //---------------------------------------------------------------------------------------
  /*Nota: para agregar evento a los botones añadidos dinamicamente apuntamos primeramente
  a 'document' y posteriormente en "on" el evento y el nombre de clase o id del elemento */

  //--->Funcion click para los botones agregados
  $(document).on('click', '#Contenedor-lista .CL-botones',function(){
    var idbtn = $(this).attr('id');
    $('#lblS1-Ubi').html(idbtn);
      //alert(idbtn);
    $('body #Contenedor-lista .CL-botones').css("background-color","rgb(28, 40, 51)").css("color","white");
    $(this).css("background-color","white").css("color","black");
    /*buscar los sensores de la ubicacion seleccionada para mostrarlos en la lista*/
    $('#S1-LBSensores').val("");
    DListSensores(idbtn);
    //DrawRTStockLineChar(idbtn);
    //DrawChart(idbtn);
    //DrawBarr(idbtn);
  });
  //----------------------------------------------------------------
  //----------Agregar lista de sensores al Select segun la seccion--
  function DListSensores(val){
    //alert(val);
    $.ajax({
      type:"POST",
      url:"php/PgPrincipal/LSensores.php",
      data: {sn:val},
      success:function(r){
        //console.log(r);
        $('#DLSensores').html(r);
      }
    }); 
  }

  $(document).on('change', '#DLSensores',function(){
    var sen = $("#DLSensores :selected").text();
    //DrawRTStockLineChar(sen);
    //DrawChart(sen);
    //DrawBarr(sen);
  });
//----------------------------------------------------------
//_______________________GRAFICAS___________________________
//----------------------------------------------------------

//__---->GRAFICA DE LINEA EN TIEMPO REAL____________________
function DrawChart(idsen){
    var t,d;
    Highcharts.chart('HCdbvt', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var jsonDT = "";
                        jsonDT = $.ajax({
                        url: "php/graficas/HGCLineSensor.php?idsen="+idsen,
                        dataType: "json",
                        async: false
                        }).responseText;
                        var json = JSON.parse(jsonDT);
                        console.log(json);
                        t = json[0].tiempo;
                        d = json[0].db;
                        
                        var x = new Date(json[0].tiempo).getTime(), // current time
                            y = parseInt(json[0].db);
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },

        time: {useUTC: false},

        title: {text: 'Decibeles vs Tiempo'},

        accessibility: {
            announceNewData: {
                enabled: true,
                minAnnounceInterval: 15000,
                announcementFormatter: function (allSeries, newSeries, newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
                    return false;
                }
            }
        },

        xAxis: {
            title: {text: 'Tiempo'},
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {text: 'Decibeles'},
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%H:%M:%S}<br/>{point.y:.2f}'
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Dato Ingresado',
            data: (function () {
                // generate an array of random data
                var data = [],i;
                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: new Date(t).getTime() + i * 1000,
                        y: d
                    });
                }
                return data;
            }())
        }]
    });    
}
//__---->GRAFICA DE BARRA____________________________
function DrawBarr(idsen){
  Highcharts.chart('HCBarra', {
    chart: {
        type: 'column',
        animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var jsonDT = "";
                        jsonDT = $.ajax({
                        url: "php/graficas/HGCBarra.php?idsen="+idsen,
                        dataType: "json",
                        async: false
                        }).responseText;
                        var json = JSON.parse(jsonDT);
                        //console.log(json);
                        var mx = parseInt(json[0].max),
                        mn = parseInt(json[0].min),
                        prm = parseInt(json[0].prom);
                        series.update({data: [mx,mn,prm],}, true);
                        //series.update([x, y, z], false, false);
                    }, 5000);
                }
            }
    },
    title: {
        text: 'Monthly Average Rainfall'
    },
    xAxis: {
        categories: [
            'MAX',
            'MIN',
            'PROM'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Decibeles'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'dB',
        data: [0,0,0]
    }]
  });
}

//DrawLineChar();
function DrawLineChar(){
  var JsonData = "";
  Highcharts.chart('HClinea', {
    chart: {
        type: 'line',
        animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        /*var jsonDT = "";
                        jsonDT = $.ajax({
                        url: "php/graficas/HGCLineSensor.php?idsen="+idsen,
                        dataType: "json",
                        async: false
                        }).responseText;
                        var json = JSON.parse(jsonDT);
                        JsonData = json;
                        console.log(json);
                        t = json[0].tiempo;
                        d = json[0].db;*/
                        
                        /*var x = Math.random(), // current time
                            y = Math.random(),
                            z = Math.random();*/
                        /*var datos = "";
                        for(var i  = 0; i < 12; i++){
                          if(i == 12-1){
                            datos += i;  
                          }else{
                            datos += i + ",";  
                          }
                        }
                        datos += "";
                        alert(datos);*/
                         // current time
                          //var x = new Date().getTime(),
                          //y = parseInt(Math.random());
                        var dato = "["+1+","+3+"]";
                        series.setData([dato,[4,8],[5,6]], true, true);
                            //series.update({data: [x,y,z],}, true);
                        //series.update([x, y, z], false, false);
                    }, 3000);
                }
            }
    },
    xAxis: {
      title: {text: 'Tiempo'},
      type: 'number',
      tickPixelInterval: 1
    },

    plotOptions: {
        series: {
            animation: {
                duration: 2000
            }
        }
    },

    series: [{
        name: 'Dato Ingresado',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
  });
}
//_-----FIN DOCUMENT READY---------------------------

/*Highcharts.theme = {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#2a2a2b'],
                [1, '#3e3e40']
            ]
        },
        style: {fontFamily: '\'Unica One\', sans-serif'},
        plotBorderColor: '#606063'
    },
    title: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    yAxis: {
        gridLineColor: '#707073',
        labels: {style: {color: '#E0E0E3'}},
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },
    legend: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        itemStyle: {
            color: '#E0E0E3'
        },
        itemHoverStyle: {
            color: '#FFF'
        },
        itemHiddenStyle: {
            color: '#606063'
        },
        title: {
            style: {
                color: '#C0C0C0'
            }
        }
    },
    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },
    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },
    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },
    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    navigator: {
        handles: {
            backgroundColor: '#666',
            borderColor: '#AAA'
        },
        outlineColor: '#CCC',
        maskFill: 'rgba(255,255,255,0.1)',
        series: {
            color: '#7798BF',
            lineColor: '#A6C7ED'
        },
        xAxis: {
            gridLineColor: '#505053'
        }
    },
    scrollbar: {
        barBackgroundColor: '#808083',
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#FFF',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    }
}
// Create the chart
function DrawRTStockLineChar(idsen){
  var t,d;
  Highcharts.setOptions(Highcharts.theme);
  Highcharts.stockChart('HCdbvt', {
    chart: {
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    var jsonDT = "";
                        jsonDT = $.ajax({
                        url: "php/graficas/HGCLineSensor.php?idsen="+idsen,
                        dataType: "json",
                        async: false
                        }).responseText;
                        var json = JSON.parse(jsonDT);
                        console.log(json);
                        t = json[0].tiempo;
                        d = json[0].db;
                        
                        var x = new Date(json[0].tiempo).getTime(), // current time
                            y = parseInt(json[0].db);
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }
    },

    time: {
        useUTC: false
    },

    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1M'
        }, {
            count: 5,
            type: 'minute',
            text: '5M'
        }, {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: false,
        selected: 0
    },

    title: {
        text: 'Live random data'
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -999; i <= 0; i += 1) {
                data.push([
                    time + i * 1000,
                    Math.round(Math.random() * 100)
                ]);
            }
            return data;
        }())
    }]
  });
}*/
  
});