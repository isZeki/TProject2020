/*=======================================================*/
/*=======================================================*/
/* Se producen cuando el documento carga por completo*/
$(document).ready(function(){
  var S=0; // variable global para saber si se modifica semaforo
  /*================================================*/
  /*.............ANIMACIONES Y DISEÑO...............*/
  $(function (){
    $("#logo").hide().fadeIn(3000);
  });
  /*================================================*/
  /*================================================*/
  /* ...........FORMULARIO SENSOR...................*/
  var opForm = 2;
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
    $("#FR-Select").css("display","none");
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
    $("#FR-Select").css("display","none");
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
      url: "php/phpSensor/SnBuscar.php",
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

  $("#btnAceptar").click(function(e){
    e.preventDefault();
    var ids = $("#inpt1").val();
    var name = $("#inpt2").val();
    var ubi = $("#inpt3").val();
    var sel = $("#FR-Select :selected").text();
    if(s == 1){
      if(opForm == 3){
        $.ajax({
          type:"POST",
          url:"php/phpSensor/SnElimSemaf.php",
          data:{idsf:ids},
          success:function(r){
            if (r==1) {
              alert('Sensor Eliminado correctamente');
            }else if (r==2){
              alert('El ID no se encuentra registrado');
            }else{
              alert(r)
            }
          }
        });
      }else{
        $.ajax({
          type:"POST",
          url:"php/phpSensor/SnModSemaf.php",
          data:{idsf:ids,namesf:sel},
          success:function(r){
            if (r==1) {
              alert('Sensor modificado correctamente');
            }else if (r==2){
              alert('El ID no se encuentra registrado');
            }else{
              alert(r)
            }
          }
        });
      }
    }else{
        if (opForm == 1){ /* opcion de añadir registro*/
          if (ids == "" || name == "" || ubi == "") {
            CasillasVaciasFormSensor(ids,name,ubi);
          }else{
            hideWarningFormSensor();
            var datos=$('#formRegist').serialize();
            $.ajax({
                type:"POST",
                url:"php/phpSensor/SnRegistrar.php",
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
            url:"php/phpSensor/SnModificar.php",
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
            url: "php/phpSensor/SnEliminar.php",
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
    } // fin else de condificon 's'
  });

  /*================================================*/
  /*..........FIN FORMULARIO SENSOR.................*/
  $("#btnBuscarSensor").click(function(){
    $("#btnBuscarSensor").css("width","100%");
  });
   //========================================================
   $("#btnSF").click(function(){
      $("#icFrm2").css("visibility", "hidden");
      $("#inpt3").css("display", "none");
      $("#icFrmBuscar").css("visibility","hidden");
      $("#icPDFSen").css("visibility", "hidden");
      $("#lbl2").css("display","none");
      $("#mnsj_mod").css("display","none");
      $("#inpt2").css("display", "none");
      //------se muestra el select------------
      $("#FR-Select").css("display","inline");
      
      hideWarningFormSensor(); 
      limpiarCasillas();
      mostrar("visible");
      //-------Listar Tabla
      var op = "NA";
      $.ajax({
        type:"POST",
        url:"php/phpSensor/SnListarSemaforos.php",
        data: op,
        success: function(r){
          $("#cuerpo-tablaSensor").html(r);
        }
      });
      //-----Agregar al Select
      var op = "";
      $.ajax({
        type:"POST",
        url:"php/phpSensor/SnSelect.php",
        data: op,
        success:function(r){
          //console.log(r);
          $('#FR-Select').html(r);
        }
      });
      s = 1;
      //-------------------------------------- 
   });


  $("#btnListar").click(function(){
    /*---Evaluar si la casilla NA -> No Asignado esta habilitada---*/
    s = 0;
    if (document.getElementById('ckNA').checked) {
      $("#icFrm2").css("visibility", "hidden");
      $("#icFrm3").css("visibility", "hidden");
      $("#icFrmBuscar").css("visibility","hidden");
      $("#icPDFSen").css("visibility", "hidden");

      $("#lbl2").css("display","");
      $("#mnsj_mod").css("display","");
      $("#inpt2").css("display", "");
      $("#inpt3").css("display", "");
      $("#FR-Select").css("display","none");
      hideWarningFormSensor(); 
      mostrar("visible");
      $("#btnBuscarSensor").val("");
      limpiarCasillas();
      opForm = 1;
      var op = "NA";
        $.ajax({
          type:"POST",
          url:"php/phpSensor/SnListarNA.php",
          data: op,
          success: function(r){
            $("#cuerpo-tablaSensor").html(r);
          }
        });
    }else{ /* Listar registros que tenga ya informacion asiganada */
      $("#icFrm2").css("visibility", "visible");
      $("#icFrm3").css("visibility", "visible");
      $("#icFrmBuscar").css("visibility","visible");

      $("#lbl2").css("display","");
      $("#mnsj_mod").css("display","");
      $("#inpt2").css("display", "");
      $("#inpt3").css("display", "");
      $("#FR-Select").css("display","none");
      hideWarningFormSensor(); 
      mostrar("hidden");
      limpiarCasillas();
      opForm = 2; 
      var datoBusqueda = $("#btnBuscarSensor").val();
      if (datoBusqueda == "") {
        var op = "";
        $.ajax({
          type:"POST",
          url:"php/phpSensor/SnListarDataNP.php",
          data: op,
          success: function(r){
            $("#cuerpo-tablaSensor").html(r);
            $("#icPDFSen").css("visibility", "visible");
          }
        });
      }else{
        $.ajax({
          type: "POST",
          url: "php/phpSensor/SnListarFiltro.php",
          data: {filtro: datoBusqueda},
          success:function(r){
            $("#cuerpo-tablaSensor").html(r);
            $("#icPDFSen").css("visibility", "visible");
          }
        });
      }
    }
  });//Fin Boton Listar=====================================
  //========================================================
    $('#icPDFSen').click(function(){
    var datoBusqueda = $("#btnBuscarSensor").val();
    window.open("Reportes/SnReporte.php?filtro="+datoBusqueda);
  });//Fin Boton PDF========================================
  //========================================================
  //========================================================
}); //Fin $(document)
