//_------------TEMPORAL------------------
//----funcion para simular
setInterval(function(){
    var ob = "";
    $.ajax({
      url: "php/Simulador.php",
      type: "POST",
      data: ob,
      success:function(r){console.log("enviado1");}
    });
  },2000);

setInterval(function(){
    var ob = "";
    $.ajax({
      url: "php/Simulador2.php",
      type: "POST",
      data: ob,
      success:function(r){console.log("enviado2");}
    });
  },2000);

setInterval(function(){
    var ob = "";
    $.ajax({
      url: "php/Simulador3.php",
      type: "POST",
      data: ob,
      success:function(r){console.log("enviado3");}
    });
  },2000);

