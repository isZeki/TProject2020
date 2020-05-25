/*=======================================================*/
/*=======================================================*/
/* Se producen cuando el documento carga por completo*/
$(document).ready(function(){
  /*================================================*/
  /*.............ANIMACIONES Y DISEÑO...............*/
  $(function (){
    $("#logo").hide().fadeIn(3000);
  });

  /*setInterval(function(){
    $("#logo").hide().fadeIn(3000);
  },5000);*/

  /* .......Animacion boton Añadir..................*/
  /*$("#icFrm1").mouseover(function(){
    $("#desplegar-añadir").slideDown();
  });
  $("#icFrm1").mouseout(function(){
    $("#desplegar-añadir").slideUp();
  });*/
  /* ...............................................*/
  /* .......Animacion boton Modificar...............*/
  /*$("#icFrm2").mouseover(function(){
    $("#desplegar-modificar").slideDown();
  });
  $("#icFrm2").mouseout(function(){
    $("#desplegar-modificar").slideUp();
  });*/
  /* ...............................................*/
  /* .......Animacion boton Eliminar................*/
  /*$("#icFrm3").mouseover(function(){
    $("#desplegar-eliminar").slideDown();
  });
  $("#icFrm3").mouseout(function(){
    $("#desplegar-eliminar").slideUp();
  });*/
  /*================================================*/
  /*..........FIN ANIMACIONES Y DISEÑO..............*/
  /*================================================*/
  /* ...........FORMULARIO SENSOR...................*/
  var opForm = 1;
  var opEliminar = 0;

  $("#icFrm1").click(function(){ /*opcion de añadir*/ 
    opForm = 1;
    $("#icFrm1").attr("src","iconos/addfocus.png");
    $("#icFrm2").attr("src","iconos/modify.png");
    $("#icFrm3").attr("src","iconos/delete.png");
    $("#icFrmBuscar").css("visibility","hidden");
    hideWarningFormSensor(); 
    mostrar("visible");
    limpiarCasillas();
  }); 

  $("#icFrm2").click(function(){ /*opcion de modificar*/ 
    opForm = 2;
    $("#icFrm2").attr("src","iconos/modifyfocus.png");
    $("#icFrm1").attr("src","iconos/add.png");
    $("#icFrm3").attr("src","iconos/delete.png");
    $("#icFrmBuscar").css("visibility","visible");
    hideWarningFormSensor(); 
    mostrar("hidden");
    limpiarCasillas();
  }); 

  $("#icFrm3").click(function(){ /*opcion de eliminar*/ 
    opForm = 3;
    $("#icFrm3").attr("src","iconos/deletefocus.png");
    $("#icFrm1").attr("src","iconos/add.png");
    $("#icFrm2").attr("src","iconos/modify.png");
    $("#icFrmBuscar").css("visibility","hidden");
    hideWarningFormSensor(); 
    mostrar("hidden");
    limpiarCasillas();
  }); 

  function mostrar($visb){
    $("#lbl2").css("visibility",$visb);
    $("#inpt2").css("visibility",$visb);
    $("#lbl3").css("visibility",$visb);
    $("#inpt3").css("visibility",$visb);
  }

  $("#btnAceptar").click(function(e){
    e.preventDefault();
    var ids = $("#inpt1").val();
    var name = $("#inpt2").val();
    var ubi = $("#inpt3").val();
    if (opForm == 1){ /* opcion de añadir registro*/
        if (ids == "" || name == "" || ubi == "") {
          CasillasVaciasFormSensor(ids,name,ubi);
        }else{
          hideWarningFormSensor();
          var datos=$('#formRegist').serialize();
          $.ajax({
              type:"POST",
              url:"php/SnRegistrar.php",
              data:datos,
              success:function(r){
                if (r==1) {
                  alert('Sensor registrado correctamente');
                }else if (r==2){
                  alert('El ID ya se encuentra registrado');
                }else{
                  alert(r)
                }
              }
          });
          limpiarCasillas();
        }
    }else if(opForm == 2){ /* opcion de modificar registro */
      if (ids=="") {
        $("#inpt1").css("border-color","red");
        $("#mnsj_id").css("visibility", "visible");
      }else{
        if (ids == "" || name == "" || ubi == "") {
          CasillasVaciasFormSensor(ids,name,ubi);
        }else{
          hideWarningFormSensor();
          var datos=$('#formRegist').serialize();
          $.ajax({
          type:"POST",
          url:"php/SnModificar.php",
          data: datos,
          success: function(r){
            if(r == 1){
              alert("Sensor modificado correctamente");
            }else if( r == 2){
              alert("El ID de sensor no se encuentra registrado");
            }else{
              alert(r);
             }
          }
          });
        }
      }
    }else{ /* opcion de eliminar registro */
      if (ids == "") {
        $("#inpt1").css("border-color","red");
        $("#mnsj_id").css("visibility", "visible");
      }else{
        hideWarningFormSensor();
        $.ajax({
        type: "POST",
        url: "php/SnEliminar.php",
        data: {idElim: ids},
        success: function(r){
          if(r == 1){
              alert("Sensor eliminado correctamente");
            }else if( r == 2){
              alert("El ID de sensor no se encuentra registrado");
            }else{
              alert(r);
            }
        }
        });
      }
    }
  });

  $("#icFrmBuscar").click(function(e){
    e.preventDefault();
    var ids = $("#inpt1").val();
    if (ids == "") {
      $("#inpt1").css("border-color","red");
      $("#mnsj_id").css("visibility", "visible");
    }else{
      $("#inpt1").css("border-color","rgb(28, 40, 51)");
      $("#mnsj_id").css("visibility", "hidden");
      $.ajax({
      type: "POST",
      url: "php/SnBuscar.php",
      async: false,
      data: {ids:ids},
      success: function(r){
        if (r==2) {
          alert("ID no se encuentra registrado");
        }else{
          mostrar("visible");
          var json = JSON.parse(r);
          $("#inpt2").val(json[1]);
          $("#inpt3").val(json[2]);
         }
      }
      });
    }
  });

  function CasillasVaciasFormSensor($id,$nomb,$ubic){
    if($id == ""){
        $("#inpt1").css("border-color","red");
        $("#mnsj_id").css("visibility", "visible");
      }else{
        $("#inpt1").css("border-color","rgb(28, 40, 51)");
        $("#mnsj_id").css("visibility", "hidden");
      }
      /*.............................................*/
      if ($nomb == "") {
        $("#inpt2").css("border-color","red");
        $("#mnsj_mod").css("visibility", "visible");
      }else{
        $("#inpt2").css("border-color","rgb(28, 40, 51)");
        $("#mnsj_mod").css("visibility", "hidden");
      }
      /*.............................................*/
      if ($ubic == "") {
        $("#inpt3").css("border-color","red");
        $("#mnsj_del").css("visibility", "visible");
      }else{
        $("#inpt3").css("border-color","rgb(28, 40, 51)");
        $("#mnsj_del").css("visibility", "hidden");
      }
  }

  function hideWarningFormSensor(){
    $("#inpt1").css("border-color","rgb(28, 40, 51)");
    $("#mnsj_id").css("visibility", "hidden");
    $("#inpt2").css("border-color","rgb(28, 40, 51)");
    $("#mnsj_mod").css("visibility", "hidden");
    $("#inpt3").css("border-color","rgb(28, 40, 51)");
    $("#mnsj_del").css("visibility", "hidden");
  }

  function limpiarCasillas(){
    $("#inpt1").val("");
    $("#inpt2").val("");
    $("#inpt3").val("");
  }
  /*================================================*/
  /*..........FIN FORMULARIO SENSOR.................*/
  $("#btnBuscarSensor").click(function(){
    $("#btnBuscarSensor").css("width","100%");
  });
   //========================================================
  $("#btnListar").click(function(){
    var datoBusqueda = $("#btnBuscarSensor").val();
    if (datoBusqueda == "") {
      var op = "";
      $.ajax({
        type:"POST",
        url:"php/SnListarDataNP.php",
        data: op,
        success: function(r){
          $("#cuerpo-tablaSensor").html(r);
          $("#icPDFSen").css("visibility", "visible");
        }
      });
    }else{
      $.ajax({
        type: "POST",
        url: "php/SnListarFiltro.php",
        data: {filtro: datoBusqueda},
        success:function(r){
          $("#cuerpo-tablaSensor").html(r);
          $("#icPDFSen").css("visibility", "visible");
        }
      });
    }
  });//Fin Boton Listar=====================================
  //========================================================
    $('#icPDFSen').click(function(){
    var datoBusqueda = $("#btnBuscarSensor").val();
    window.open("Reportes/SnReporte.php?filtro="+datoBusqueda);
  });//Fin Boton PDF========================================
  //========================================================
  //========================================================
  /*$('#btnEnviar').click(function(e){
    e.preventDefault();
    var ids = $("#inpt1").val();
    var name = $("#inpt2").val();
    var ubi = $("#inpt3").val();
    //...evaluar campos esten llenos...........
    if (ids == "" || name == "" || ubi == "") {
      alert("Asegurarse de llenar todos los campos del formulario");
    }else{
      var datos=$('#formRegist').serialize();
      $.ajax({
        type:"POST",
        url:"php/SnRegistrar.php",
        data:datos,
        success:function(r){
          if (r==1) {
            alert('Sensor registrado correctamente');
          }else if (r==2){
            alert('El ID ya se encuentra registrado');
          }else{
            alert(r)
          }
        }
      });
    }    
  }); //Fin Boton Enviar====================================
  //========================================================
  $("#btnModificar").click(function(e){
    e.preventDefault();
    var idm = $("#inpt1").val();
    var nombm = $("#inpt2").val();
    var ubim = $("#inpt3").val();
    //....evaluar que se ingresó el id......................
    if (idm == ""){
      alert("Ingrese el ID del sensor que desea modificar");
    }else{
      //....evaluar que se hayan ingresado los datos nuevos.
      if (nombm == "" || ubim == ""){
        alert("Asegurese de ingresar los nuevos datos");
      }else{
        var datos = $("#formRegist").serialize();
        $.ajax({
          type:"POST",
          url:"php/SnModificar.php",
          data: datos,
          success: function(r){
            if(r == 1){
              alert("Sensor modificado correctamente");
            }else if( r == 2){
              alert("El ID de sensor no se encuentra registrado");
            }else{
              alert(r);
            }
          }
        });
      }
    }
  });//Fin Boton Modificar==================================
  //========================================================
  $("#btnEliminar").click(function(e){
    e.preventDefault();
    var idE = $("#inpt1").val();
    if (idE == "") {
      alert("Ingrese el ID del sensor a eliminar");
    }else{
      $.ajax({
        type: "POST",
        url: "php/SnEliminar.php",
        data: {idElim: idE},
        success: function(r){
          if(r == 1){
              alert("Sensor eliminado correctamente");
            }else if( r == 2){
              alert("El ID de sensor no se encuentra registrado");
            }else{
              alert(r);
            }
        }
      });
    }
  });//Fin Boton Eliminar===================================
  //========================================================
  $("#btnActualizarLista").click(function(){
    var ob = "";
    $.ajax({
      type:"POST",
      url:"php/uploadlist.php",
      data: ob,
      success: function(r){
        //alert(r);
       $("#sList").html(r);
      }
    });
  });//Fin Boton Actualizar Lista===========================
 
  $("#btnBuscar").click(function(e){
    e.preventDefault();
    var filtro = $('#valsearch').val();
    if (filtro == "") {
      alert("Ingrese el Dato a buscar");
    }else{
      $.ajax({
        type: "POST",
        url: "php/SnListarFiltro.php",
        data: {filtro: filtro},
        success:function(r){
          $("#cuerpo-tablaSensor").html(r);
        }
      });
    }
  });//Fin Boton Listar con Filtro==========================*/
  //========================================================
}); //Fin $(document)
