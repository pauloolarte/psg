window.onload = function () {
    // alert('Lee mis cambios');
   // listarAdminFallas();


  
    

   

    //fetchGet("Falla/listarTiposEquipo", function (data) {
    //    llenarCombo(data, "cboTipoEquipoEM", "Nombre", "idTipoEquipo")

    //});


    //setN("tituloFallaM", 'Fallaakjkja');

  //  alert(IdFallaSelect);

    series = [];
    equipos = [];

    fetchGet("Falla/RecuperarEquipos", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = {
                idEquipo: elemento["idEquipo"], nombre: elemento["NombreEquipo"], numserie: elemento["Serie"],
                idTipoEquipo: elemento["TipoEquipo"], idCliente: elemento["ClienteE"], idFaena: elemento["FaenaE"],
                idModelo: elemento["ModeloE"], Cliente: elemento["Cliente"], Faena: elemento["Faena"],
                TipoEquipoN: elemento["TipoEquipoN"], ModeloN: elemento["ModeloN"]


            };

            equipos.push(obj);

        }

    });


    fetchGet("Falla/ListarSeriesEquiposC", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
           
            var obj = { idEquipo: elemento["idEquipo"], Serie: elemento["Serie"] };


            series.push(obj);

        }

    });

    $('#SerieEquipoMod').autocomplete({
        source: function (request, response) {
            response($.map(series, function (item) {
                return {
                    id: item.idEquipo,
                    value: item.Serie
                }
            }
            ))

        },
   
        select: function (event, ui) {
            //alert(ui.item.id);
            SelecEquipoMF(ui.item.id);
            $(this).val(ui.item.value),
                $('#idEquipoFinalM').val(ui.item.id)
        }


    });


    //var storedNames = JSON.parse(localStorage.getItem("names"));


    var value = localStorage.getItem('IdFallaSelect');

    //alert(storedNames);

   // llenarCombo(storedNames, "cboTipoEquipoEM", "Nombre", "idTipoEquipo")

   

    //var data = localStorage.getItem('datatipoequipo');

    //var datatipoequipo = [];
    //for (var j = 0; j < storedNames.length; j++) {
    //    elemento = storedNames[j];
     
    //    var obj = { idTipoEquipo: elemento["idTipoEquipo"], Nombre: elemento["Nombre"] };

    //    datatipoequipo.push(obj);

    //}


    //var datacliente = localStorage.getItem('datacliente');

   
    //llenarCombo(datacliente, "cboClienteEM", "Nombre", "idCliente")


   // var myVar = setTimeout(CargarDatos(value), 3000);


    console.log("Before the delay")
    listarComboModFallas();
    listarComboAdjuntosMod();
    syncDelay(2500);
    console.log("After the delay")
    recuperarGenericoFalla("Falla/recuperarFalla/?id=" + value,
        "frmModFallaAdmin");


    //alert('falla local storage:' + value);

    //recuperarGenericoFalla("Falla/recuperarFalla/?id=" + value,
     //   "frmModFallaAdmin");


    //recuperarEquipo("Falla/RecuperarEquipoxIdFalla/?IdFalla=" + value,
   //     "frmEquipoModA");


    //alert('Pintar Adjuntos');
    //set('Comentario',"Comentario");

    //var combo = document.getElementById("cboSerieM");
    //console.log(combo);
    //combo.value = "21";
    //console.log('este es el valor del combo:' + combo.value);
    ///setN("idEquipoFM", 21)


    listarAdjuntosxIdMod(value);
    //alert('Historial de Estados');
    listarHistorialEstadosMod(value);
   
    //  listarAdjuntosxId(idFalla);
    //alert('Pagina');

   


}




function getComboA(selectObject) {
    var value = selectObject.value;
    //alert('valor seleccionado:' + value);

    SelecEquipoMF(value);
}

function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}


function SelecEquipoMF(id) {

    //alert('Llego al Selec Equipo');
    //alert('equipos: ' + equipos.length);

    for (var j = 0; j < equipos.length; j++) {
        var elemento = equipos[j]
        //alert(elemento["idEquipo"]);

        if (equipos[j].idEquipo == id) {
            var tipoequipo = elemento["idTipoEquipo"];
            var cliente = elemento["idCliente"];
            var faena = elemento["idFaena"];
            var modelo = elemento["idModelo"];

            var clienten = elemento["Cliente"];
            var faenan = elemento["Faena"];
            var tipoequipon = elemento["TipoEquipoN"];
            var modelon = elemento["ModeloN"];


            //alert('encontro el id Equipo');


            //alert('tipo equipo: ' + tipoequipo);
            //alert('tipo equipon: ' + tipoequipon);

            //alert('tipo modelon: ' + modelon);

            //alert('faenan: ' + faenan);
            //alert('clienten: ' + clienten);


            //alert('cliente: ' + cliente);
            //alert('faena: ' + faena);
            //alert('modelo: ' + modelo);

            //setN('idTipoEquipoM', tipoequipo);
            //setN('idFaenaM', faena)
            //setN('idModeloM', modelo);
            //setN('idClienteM', cliente);

            //var tipoequipon = getN('idTipoEquipoM');
            //var faenan = getN('idFaenaM');
            //var modelon = getN('idModeloM');
            //var clienten = getN('idClienteM');

            //alert(tipoequipon);
            //alert(faenan);
            //alert(modelon);
            //alert(clienten);

            //document.getElementById("cboEquipoM").disabled = false;
            //document.getElementById("cboModeloM").disabled = false;
            //document.getElementById("cboClienteM").disabled = false;
            //document.getElementById("cboFaenaM").disabled = false;


          //  set('cboEquipoM', tipoequipo);
            //set('cboModeloM', modelo);

            set('idTipoEquipoM', tipoequipo);
            set('TipoEquipoMod', tipoequipon);

            //document.getElementById('TipoEquipoM').innerHTML = tipoequipon;
           
            set('idModeloM', modelo);
            set('ModeloM', modelon);

            set('idFaenaM', faena);
            set('FaenaM', faenan);

            set('idClienteM', cliente);
            set('Cliente', clienten);


            //set('cboFaenaM', faena);


            //var select_val = $('#cboEquipoM option:selected').val();
            //alert(select_val);

            //var select_valcli = $('#cboClienteM option:selected').val();
            //alert(select_valcli);

            //$('#hdn_test').val(select_val);
            //$('#output').text('Selected value is: ' + select_val);

            //setN('idTipoEquipoM', select_val);
          
            //setN('idClienteM', select_valcli);

            //var tipoequipon = getN('idTipoEquipoM');
            //var faenan = getN('idFaenaM');
            //var modelon = getN('idModeloM');
            //var clienten = getN('idClienteM');

            //alert('Tipo de Equipo hidden:' + tipoequipon);
            //alert(faenan);
            //alert(modelon);
            //alert('Cliente hidden :' + clienten);



            //document.getElementById("cboEquipoM").disabled = true;
            //document.getElementById("cboModeloM").disabled = true;
            //document.getElementById("cboClienteM").disabled = true;
            //document.getElementById("cboFaenaM").disabled = true;

       
           // set('faena', faenan);
           // set('cliente', clienten);


        }


    }



}




var objetoConf;
function listarAdminFallas() {
    objetoConf = {
        url: "Falla/listarAdminFallas/?fechainicio=&fechafin=&numOS=&Estado=&idUsrCreacion=0", id: "divTabla",
        cabeceras: ["IdFalla", "Titulo", "Tipo Equipo", "Modelo", "Orden Servicio", "Fecha Creacion", "Cliente", "Estado"],
        propiedades: ["idFalla", "titulo", "TipoEquipo", "Modelo", "OrdenServicio", "FechaCreacion", "Cliente", "Estado"],
        editar: true,
        eliminar: false,
        propiedadId: "idFalla"

    }
    pintar(objetoConf, null, null, 'AF')



}


function listarAdjuntosxIdMod(IdFalla) {
    objetoConf = {
        url: "Falla/listarAdjuntoxIdFalla/?idFalla=" + IdFalla, id: "divTablaAdjuntosMod",
        cabeceras: ["Nombre Archivo", "Tipo Archivo", "Comentario", "Ruta"],
        propiedades: ["Nombre", "TipoAdjunto", "Comentario", "Ruta"],
        editar: false,
        eliminar: true,
        propiedadId: "idAdjunto"

    }
    pintarAdjuntos(objetoConf)



}

function RegistrarEquipo()
{

    //set('cboSerieM', 25);

    LimpiarDatos('frmEquipoModA');

    //set('SerieEquipoM', serie);

    var uno = document.getElementById('btnEquipo');

    uno.innerText = 'Registrar Equipo';

    //if (uno.innerText == 'off')
    //    uno.innerText = 'on';
    //else uno.innerText = 'off';

    var combo = document.getElementById("cboSerieM");

    var serieo =  localStorage.getItem('SerieO');
    var tipoequipoo = localStorage.getItem('TipoEquipoO');
    var clienteo = localStorage.getItem('ClienteO');
    var faenao = localStorage.getItem('FaenaO');
    var modeloo = localStorage.getItem('ModeloO');

    //alert(serieo);
   //alert(tipoequipoo)
    //alert(clienteo)

    set('SerieEquipoM', serieo);
    set('cboTipoEquipoEM', tipoequipoo);
    set('cboClienteEM', clienteo);
    set('cboFaenaEM', faenao);
    set('cboModeloEM', modeloo);




    //if (combo.selectedIndex > -1) {
    //    var serier = combo.options[combo.selectedIndex].text;
    //    set('SerieEquipoM', serier);


    //    var tipoequipo = get('idTipoEquipoM');
    //    var cliente = get('idClienteM');
    //    var faena = get('idFaenaM');
    //    var modelo = get('idModeloM');

    //    //alert(tipoequipo);

    //    set('cboTipoEquipoEM', tipoequipo);
    //    set('cboClienteEM', cliente);
    //    set('cboFaenaEM', faena);
    //    set('cboModeloEM', modelo);


    //}

   

    $('#ModalEquipo').modal('show');

    //alert('Llego aqui');


}


function AsignarEquipoFalla() {

    var uno = document.getElementById('btnEquipo');

    if (uno.innerText == 'Registrar Equipo') {

        var serie = get('SerieEquipoM');
        var idmodelo = get('cboModeloEM');

        //alert(idmodelo);

        var url = "Falla/RecuperarEquipoxSerieMod/?Serie=" + serie + "&idModelo=" + idmodelo;

        ///set('cboSerieM', '2');

        //////////Validacion si la serie ya existe ////////////

        fetchGet(url, function (data) {



            if (data != undefined) {
                if (data["idEquipoM"] != '0') {
                    alert('La serie y modelo que se desea registrar ya existen');
                    ///set('cboSerieM', '2');
                    return;

                }
                else
                { ///Se registra el equipo//
                    set('idEquipoEM', 0);

                    var frmEquipo = document.getElementById("frmEquipoModA");

                    var frmequi = new FormData(frmEquipo);

                    fetchPostText("Falla/RegistrarEquipoMod", frmequi, function (res) {
                        // alert('Lo que devuelve el store:');
                        // alert(res);

                       

                        if (res != "0") {

                            

                            //fetchGet("Falla/ListarSeriesEquiposC", function (data) {
                            //    llenarCombo(data, "cboSerieM", "Serie", "idEquipo");

                            //});

                          
                            equipos = [];

                            fetchGet("Falla/RecuperarEquipos", function (data) {

                                for (var j = 0; j < data.length; j++) {
                                    elemento = data[j];
                                    //alert(elemento["idEstado"]);

                                    var obj = {
                                        idEquipo: elemento["idEquipo"], nombre: elemento["NombreEquipo"], numserie: elemento["Serie"],
                                        idTipoEquipo: elemento["TipoEquipo"], idCliente: elemento["ClienteE"], idFaena: elemento["FaenaE"],
                                        idModelo: elemento["ModeloE"], Cliente: elemento["Cliente"], Faena: elemento["Faena"],
                                        TipoEquipoN: elemento["TipoEquipoN"], ModeloN: elemento["ModeloN"]


                                    };

                                    equipos.push(obj);

                                }

                            });


                            //set('idEquipoFinalM', res);
                            //set('cboSerieM', res);

                            //set('idEquipoFM', res);

                         

                           

                           

                            //alert('Codigo de Equipo Nuevo Generado: ' + res)

                           // localStorage.setItem('IdEquipoN', res);

                             fetchGet("Falla/ListarSeriesEquiposC", function (data) {
                                llenarCombo(data, "cboSerieM", "Serie", "idEquipo");
                                set('cboSerieM', res);


                                 var tipoequipon = get('cboTipoEquipoEM');
                                 var clienten = get('cboClienteEM');
                                 var faenan = get('cboFaenaEM');
                                 var modelon = get('cboModeloEM');

                                 var combo = document.getElementById("cboTipoEquipoEM");

                                 if (combo.selectedIndex > -1) {
                                     var tipoequipone = combo.options[combo.selectedIndex].text;
                                     set('TipoEquipoMod', tipoequipone);
                                 }

                                 combo = document.getElementById("cboClienteEM");

                                 if (combo.selectedIndex > -1) {
                                     var clientene = combo.options[combo.selectedIndex].text;
                                     set('Cliente', clientene);
                                 }

                                 combo = document.getElementById("cboFaenaEM");

                                 if (combo.selectedIndex > -1) {
                                     var faenane = combo.options[combo.selectedIndex].text;
                                     set('FaenaM', faenane);
                                 }

                                 combo = document.getElementById("cboModeloEM");

                                 if (combo.selectedIndex > -1) {
                                     var modelone = combo.options[combo.selectedIndex].text;
                                     set('ModeloM', modelone);
                                 }

                                 set('idTipoEquipoM', tipoequipon);
                                 set('idClienteM', clienten);
                                 set('idFaenaM', faenan);
                                 set('idModeloM', modelon);



                                 //var tipoequipone = get('idTipoEquipoM');
                                 //var clientene = get('idClienteM');
                                 //var faenane = get('idFaenaM');
                                 //var modelone = get('idModeloM');



                                 //alert(tipoequipo);

                                


                            });

                         
                            $('#ModalEquipo').modal('hide');

                           // AsignarEquipoReg();

                            //var idequipoF = get('idEquipoFinalM');
                            
                            //var serieN = get('SerieEquipoM');

                            //set('SerieEquipoMod', serieN);

                            
                        }
                    });
                }
            }
        });

        /////////Fin de la validacion /////////////////
        //syncDelay(3000);

        //alert('Delay 1000');

       // var idequipon = 0;
       // idequipon = localStorage.getItem('IdEquipoN');

       // alert('IdEquipoN: ' + idequipon);

        ///set('cboSerieM', 15);

        //if (idequipon != '0')
        //{
        //    alert('setear combo');
        //    set('cboSerieM', idequipon);

        //}



    }
    else
    {
        var idequipo = get('idEquipoEM');

        //alert(idequipo);

        set('idEquipoFinalM', idequipo);

        $('#ModalEquipo').modal('hide');

    }


}



function CerrarModFallaAdmin() {

   // myFunction();

    var url = "Falla/AdminFallas"

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    //// alert(urlAbsoluta)

    window.location.replace(urlAbsoluta);

}


function listarComboAdjuntosMod() {
    fetchGet("Falla/listarTiposAdjuntos", function (data) {
        llenarCombo(data, "cboTipoAdjuntos", "Nombre", "idTipoAdjunto");

    });


    fetchGet("Falla/listarEstadosAdminFallas", function (dataest) {
        llenarCombo(dataest, "cboEstadoFalla", "Estado", "idEstado")

    });
    ///**************************************************////

}



function listarComboModFallas() {
   
   


    fetchGet("Falla/listarEstadosAdminFallas", function (data) {
        llenarCombo(data, "cboEstado", "Estado", "idEstado");
      
    });


    fetchGet("Falla/ListarSeriesEquiposC", function (data) {
        llenarCombo(data, "cboSerieM", "Serie", "idEquipo");

    });


   
     fetchGet("Falla/listarEstadosAdminFallas", function (data) {
            llenarCombo(data, "cboEstadoAdm", "Estado", "idEstado")
        
        });
    

    //alert('cargo 2');
    //////////////////////Equipo////////////////////////
   
    fetchGet("Falla/listarTiposEquipo", function (data) {
            llenarCombo(data, "cboTipoEquipoEM", "Nombre", "idTipoEquipo");
          
    });

    
 
        //alert('cargo 3');
        fetchGet("Falla/listarClientes", function (data) {
            llenarCombo(data, "cboClienteEM", "Nombre", "idCliente");
          
        });
    

   
        //alert('cargo 4');
        fetchGet("Falla/listarFaenas", function (data) {
            llenarCombo(data, "cboFaenaEM", "Nombre", "idFaena");
         
        });
    

        //alert('cargo 5');
    
            fetchGet("Falla/listarModelos", function (data) {
                llenarCombo(data, "cboModeloEM", "Nombre", "idModelo");
               
            });
        

        //alert('cargo 6');
        ///////----------------------------------------------

       
        fetchGet("Falla/listarSolicitantes", function (data) {
            llenarCombo(data, "cboSolicitanteM", "nombre", "idUsuario")
          
        });

    

   
        fetchGet("Falla/listarGrupos", function (data) {
            llenarCombo(data, "cboGrupoM", "Nombre", "idGrupo")
           
        });
    

   // alert('cargo 8');
    
        fetchGet("Falla/listarDivisiones", function (data) {
            llenarCombo(data, "cboDivisionM", "Nombre", "idDivision")
       
        });
    

    //alert('cargo 9');
   
        //fetchGet("Falla/listarTiposEquipo", function (data) {
        //    llenarCombo(data, "cboEquipoM", "Nombre", "idTipoEquipo")
           
        //});
    

    //alert('cargo 10');

    
        //fetchGet("Falla/listarModelos", function (data) {
        //    llenarCombo(data, "cboModeloM", "Nombre", "idModelo")
          
        //});
    

        //alert('cargo 11');
        //fetchGet("Falla/listarClientes", function (data) {
        //    llenarCombo(data, "cboClienteM", "Nombre", "idCliente")
         
        //});
    

    //alert('cargo 12');
 
        //fetchGet("Falla/listarFaenas", function (data) {
        //    llenarCombo(data, "cboFaenaM", "Nombre", "idFaena")
          
        //});
    

    ////////////////FallaAdmin//////////////
 
        fetchGet("Falla/listarIngGarantias", function (data) {
            llenarCombo(data, "cboIngGarantia", "nombre", "idUsuario")
         
        });
    

   
        fetchGet("Falla/listarResponsablePSG", function (data) {
            llenarCombo(data, "cboResponsablePSG", "nombre", "idUsuario")
           
        });
    

    //alert('cargo 14');
   
        fetchGet("Falla/listarFabricas", function (data) {
            llenarCombo(data, "cboFabrica", "Nombre", "idFabrica")
          
        });
    

    //alert('cargo 15');
   
        fetchGet("Falla/listarTiposGarantia", function (data) {
            llenarCombo(data, "cboTipoGarantia", "Nombre", "idTipoGarantia")
          
        });
    


}

function BuscarFallaAdmin() {
    var ordenservicio = get("txtordenservicio");
    var fechainicio = get("datepicker");
    var estado = get("cboEstadoFalla");
    var fechafin = get("datepicker1");

    // alert(ordenservicio);
    objetoConf.url =
        "Falla/listarAdminFallas/?fechainicio=" + fechainicio + "&fechafin=" + fechafin + "&numOS=" + ordenservicio + "&Estado=" + estado + "&idUsrCreacion=0";


    pintar(objetoConf, null, null, 'AF')
    //alert(nombretipohabitacion)
}

function Limpiar() {
    /*
    setN("id", "")
    setN("nombre", "")
    setN("descripcion", "")
    */
    /*
    var elementos = document.querySelectorAll("#frmTipoHabitacion [name]")
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].value = "";
    }*/
    LimpiarDatos("frmTipoHabitacion")
    //Correcto("Funciono mi alerta")
}


function GuardarDatos() {

    var frmTipoHabitacion = document.getElementById("frmTipoHabitacion");
    var frm = new FormData(frmTipoHabitacion);
    fetchPostText("TipoHabitacion/guardarDatos", frm, function (res) {
        if (res == "1") {
            listarTipoHabitacion();
            Limpiar();
        }
    })
    /*
    fetch("TipoHabitacion/guardarDatos", {
        method: "POST",
        body: frm
    }).then(res => res.text())
        .then(res => {
            if (res == "1") {
                listarTipoHabitacion();
            }
        })
        */

}

//function AgregarFalla() {

//    var urlguardar = "Falla/CrearFalla";


//    fetchPostText(urlguardar, frm, function (res) {
//        if (res == "1") {

//            var objConf = objConfiguracionGlobal;
//            var objBus = objBusquedaGlobal;
//            //Id del control
//            var valor = get(objBus.id)
//            fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
//                var rpta = generarTabla(objConf, res, objFormularioGlobal);
//                document.getElementById("divContenedor").innerHTML = rpta;
//            })
//            LimpiarDatos(idformulario)
//            //listarTipoHabitacion();
//            //Limpiar();
//        }
//    });

//}



//function AgregarFalla() {

//    /*var frmTipoHabitacion = document.getElementById("frmTipoHabitacion");*/

//    var frmFalla = {
//        titulo: 'example',
//        idEstado: 5,
//        idusrSolicitante: 10,
//        numOS: '6328'

//    };

//    alert(frmFalla);

//    var frm = new FormData(frmFalla);
//    fetchPostText("Falla/CrearFalla", frm, function (res) {
//        if (res == "1") {
//            listarFallaReportada();
//            //Limpiar();
//        }
//    });
//    /*
//    fetch("TipoHabitacion/guardarDatos", {
//        method: "POST",
//        body: frm
//    }).then(res => res.text())
//        .then(res => {
//            if (res == "1") {
//                listarTipoHabitacion();
//            }
//        })
//        */

//}

function Editar(id) {
    /*
    fetchGet("TipoHabitacion/recuperarTipoHabitacion/?id=" + id, function (res) {
        setN("id",res.id)
        setN("nombre",res.nombre)
        setN("descripcion",res.descripcion)
    })
    */



    var url = "FallaReportada/Index"

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    //// alert(urlAbsoluta)

    window.location.replace(urlAbsoluta);


    //alert('entro a Editar AdminFalla');
    //recuperarGenerico("Falla/recuperarFalla/?id=" + id,
    //    "frmModFallaAdmin");

    //alert('Llego al Generico Falla');

    recuperarGenericoFalla("Falla/recuperarFalla/?id=" + id,
        "frmModFallaAdmin");


    recuperarEquipo("Falla/RecuperarEquipoxIdFalla/?IdFalla=" + id,
        "frmEquipoModA");


    //alert('Pintar Adjuntos');
    //set('Comentario',"Comentario");


    listarAdjuntosxIdMod(id);
    //alert('Historial de Estados');
    listarHistorialEstadosM(id);



    //window.location.href = "http://stackoverflow.com";

    //var raiz = document.getElementById("hdfOculto").value;
    //var urlAbsoluta = window.location.protocol + "//" +
    //    window.location.host + raiz + url;
    //// alert(urlAbsoluta)
    ////Controles//accion
    //fetch(urlAbsoluta)
    //    .then(res => { });



}



function listarAdjuntosxId(IdFalla) {
    objetoConf = {
        url: "Falla/listarAdjuntoxIdFalla/?idFalla=" + IdFalla, id: "divTablaAdjuntosMod",
        cabeceras: ["Nombre Archivo", "Tipo Archivo", "Comentario", "Ruta"],
        propiedades: ["Nombre", "TipoAdjunto", "Comentario", "Ruta"],
        editar: false,
        eliminar: true,
        propiedadId: "idAdjunto"

    }
    pintarAdjuntos(objetoConf)



}


function listarHistorialEstadosMod(IdFalla) {
    objetoConf = {
        url: "Falla/listarHistorialEstados/?idFalla=" + IdFalla, id: "divTablaHistEstM",
        cabeceras: ["Estado", "Fecha Actualización", "Comentario"],
        propiedades: ["Estado", "FechaCreacion", "Comentario"],
        editar: false,
        eliminar: false,
        propiedadId: "idEstadoHistorial"




    }
    pintar(objetoConf, null, null, 'FR')

}


function BuscaEquipoxSerieA(event) {
    if (event.keyCode == 13) {

        var serie = get('SerieEquipoM');

        //alert('Esta es la serie del Equipo:' + serie);

        LimpiarDatos('frmEquipoModA');

        set('SerieEquipoM', serie);

        recuperarEquipoMod("Falla/RecuperarEquipoxSerieMod/?Serie=" + serie,
            "frmEquipoModA");

        //var idEquipo;

        //   idEquipo = get('idEquipo');

        //alert('Codigo de Equipo ' + idEquipo);


        //alert("Enter key is pressed");
        //return true;
    }
    else {
        // return false;
    }
}


function CalculaMargen(event) {
    if (event.keyCode == 13) {

        var aceptado = get('TotalAceptado');

        var reclamado = get('TotalReclamado');


        var margen = aceptado - reclamado;

        set('Margen', margen);

        //var idEquipo;

        //   idEquipo = get('idEquipo');

        //alert('Codigo de Equipo ' + idEquipo);


        //alert("Enter key is pressed");
        //return true;
    }
    else {
        // return false;
    }
}


function listarHistorialEstadosM(IdFalla) {
    objetoConf = {
        url: "Falla/listarHistorialEstados/?idFalla=" + IdFalla, id: "divTablaHistEstM",
        cabeceras: ["Estado", "Fecha Actualización", "Comentario"],
        propiedades: ["Estado", "FechaCreacion", "Comentario"],
        editar: false,
        eliminar: false,
        propiedadId: "idEstadoHistorial"




    }

    //alert('Llego al listarHistoreio');
    pintar(objetoConf, null, null, 'FR')

}



function Eliminar(id) {


    //alert('Llego al eliminar FallaAdmin ' + id);

    var idFalla = get("idFallaG");

    //alert(idFalla);

    Confirmacion("Desea eliminar el adjunto?", "Confirmar eliminación", function (res) {

        fetchGetText("Falla/EliminarAdjunto/?idAdjunto=" + id, function (rpta) {
            if (rpta == "1") {
                Correcto("Se elimino correctamente");
                listarAdjuntosxIdMod(idFalla);
            }
        })
    })
}
