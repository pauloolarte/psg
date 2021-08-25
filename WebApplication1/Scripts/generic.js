
window.onload = function (event) {
    //alert('Load');
    document.getElementById('ArchivoC').addEventListener('change', handleFileSelect, false);

   
}

var equipos = [];

function handleFileSelect(event) {
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
        console.log(event.target.result);
    }
    var file = event.target.files[0];
    var str = fileReader.readAsText(file);
    //alert(str);
}

function get(id) {
    return document.getElementById(id).value;
}

function getN(id) {
    return document.getElementsByName(id)[0].value;
}


function Error(texto ="Ocurrio un error") {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto
    })
}

function Correcto(texto="Se realizo correctamente") {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1500
    })
}


function Confirmacion(texto = "Desea guardar los cambios?", title = "Confirmacion",
callback) {
  return  Swal.fire({
        title: title,
        text: texto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        } 
    })
}

function set(id,valor) {
    document.getElementById(id).value = valor;
}

function setN(id, valor) {
    document.getElementsByName(id)[0].value = valor;
}


var objConfiguracionGlobal;
var objBusquedaGlobal;
var objFormularioGlobal;
var EquipoEnc = "No";


let adjuntos = [];
var tabla = "";
var clientesa = [];
var faenasa = [];
var seriessol = [];

function SeleccionarArchivo()
{
    //alert('Este es el evento');

}


function AgregarAdjuntoTemp() {

    //var archivo = document.getElementById("ArchivoC");
    var archivo = document.getElementById("files");

    //alert(archivo.files[0]);

    if (archivo.files[0] == undefined || archivo == null) {
        alert('Debe seleccionar un documento, caso contrario no se agregara el Adjunto');
        return;
    }
    else {
        UpLoad();
    }



    var nombrearchivo = archivo.files[0].name;

    //alert('Nombre Archivo:' + nombrearchivo);

   
    var file = archivo.files[0];

    var rutaarchivo = "Adjuntos\\" + nombrearchivo;

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz;

    //alert(urlAbsoluta);


    //C: \Komatsu\
    //archivo.value;

    //alert(archivo);

    //var fileReader = new FileReader();
    //fileReader.onload = function (event) {
    //    console.log(event.target.result);
    //}
    //var file = event.target.files[0];

    //var str = fileReader.readAsText(file);

    //alert(str);


    //var nombre = get("txtordenservicio");
    var idtipoadjunto = get("cboTipoAdjuntoC");
    //var idFalla = get("idFalla");
    var comentario = get("txtComentarioC");

    var combo = document.getElementById("cboTipoAdjuntoC");
    var tipoadjunto = combo.options[combo.selectedIndex].text;
    //alert(selected);


    if (document.getElementById("divTablaAdjuntosCrear").innerHTML == "")
    { adjuntos = []; }


    adjuntos.push([nombrearchivo, tipoadjunto, comentario, idtipoadjunto, rutaarchivo]);

    //alert(adjuntos);

    //alert(adjuntos.length);

    var refer = urlAbsoluta + rutaarchivo;

    //alert(refer);


    tabla = "<table class='table table-dark'>";

    tabla += "<tr><th>Archivo</th><th>Tipo de Adjunto</th><th>Comentario</th><th>Ruta</th><th>Acciones</th></tr>";

    for (let i = 0; i < adjuntos.length; i++) {
        tabla += "<tr id='fila" + i + "'><td> " + adjuntos[i][0] + " </td><td> " + adjuntos[i][1] +
            " </td><td> " + adjuntos[i][2] + " </td><td><a href='" + urlAbsoluta + adjuntos[i][4] + "' download = '" + nombrearchivo + "'><div style='height:100%;width:100%'>" + adjuntos[i][4] + "</div></a></td><td><i class='btn btn-danger' onclick='eliminarFila(" + i + ")';value='Eliminar'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash-fill' viewBox='0 0 16 16'><path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/></svg></i></td></tr>"


            //< input type = 'button' onclick = 'eliminarFila(" + i + ")'; value = 'Eliminar' /></td ></tr > ";
    };

    
    //

    tabla += "</table>";

    //alert(tabla);

    document.getElementById("divTablaAdjuntosCrear").innerHTML = tabla;

    set("txtComentarioC", "");
    set("cboTipoAdjuntoC", 0);
    document.getElementById("files").files[0].name = "";



}

function CargarClientesAuto() {
    
        //var local_source = [];

    //alert('Entro al CargarClienteAuto');

    clientesa = [];
    faenasa = [];
    series = [];
    equipos = [];
    seriessol = [];

    faenassol = [];
    clientessol = [];


    fetchGet("Falla/RecuperarEquipos", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = {
                idEquipo: elemento["idEquipo"], nombre: elemento["NombreEquipo"], numserie: elemento["Serie"],
                idTipoEquipo: elemento["TipoEquipo"], idCliente: elemento["ClienteE"], idFaena: elemento["FaenaE"],
                idModelo: elemento["ModeloE"], Cliente: elemento["Cliente"], Faena: elemento["Faena"]


            };

            equipos.push(obj);

        }
 
     });


        fetchGet("Falla/listarClientes", function (data) {

            for (var j = 0; j < data.length; j++) {
                elemento = data[j];
                //alert(elemento["idEstado"]);

                var obj = { idCliente: elemento["idCliente"], Nombre: elemento["Nombre"] };

                var objf = elemento["Nombre"];

                clientessol.push(objf);

                clientesa.push(obj);

            }

        });

    $('#cliente').autocomplete({

        source: clientessol,
        appendTo: $('#exampleModalCenter'),
        select: function (event, ui) {
            //alert(ui.item.id);
            SelecClientexNombre(ui.item.value,'R');
            // $(this).val(ui.item.value),
            //     $('#idserie').val(ui.item.id)
        }


            //source: function (request, response) {
            //    response($.map(clientesa, function (item) {
            //        return {
            //            id: item.idCliente,
            //            value: item.Nombre
            //        }
            //    }
            //    ))

            //},
            //appendTo: $('#exampleModalCenter'),
            //select: function (event, ui) {
            //    $(this).val(ui.item.value),
            //        $('#idcli').val(ui.item.id)
            //}


        });

    fetchGet("Falla/listarFaenas", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = { idFaena: elemento["idFaena"], Nombre: elemento["Nombre"] };
            var objf = elemento["Nombre"];


            faenasa.push(obj);
            faenassol.push(objf);

        }

    });


    $('#faena').autocomplete({
        source: faenassol,
        appendTo: $('#exampleModalCenter'),
        select: function (event, ui) {
            //alert(ui.item.id);
            SelecFaenaxNombre(ui.item.value, 'R');
            // $(this).val(ui.item.value),
            //     $('#idserie').val(ui.item.id)
        }

        //source: function (request, response) {
        //    response($.map(faenasa, function (item) {
        //        return {
        //            id: item.idFaena,
        //            value: item.Nombre
        //        }
        //    }
        //    ))

        //},
        //appendTo: $('#exampleModalCenter'),
        //select: function (event, ui) {
        //    $(this).val(ui.item.value),
        //        $('#idfae').val(ui.item.id)
        //}


    });

    fetchGet("Falla/ListarSeriesEquiposC", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = { Codigo: elemento["idEquipo"], Serie: elemento["Serie"] };


            series.push(obj);

        }

    });

    fetchGet("Falla/ListarSeriesEquipos", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = elemento["Codigo"];

            seriessol.push(obj);

        }

    });

    $('#txtnumserie').autocomplete({
        source: seriessol,
        appendTo: $('#exampleModalCenter'),
        select: function (event, ui) {
            //alert(ui.item.id);
            SelecEquipoxSerie(ui.item.value);
            // $(this).val(ui.item.value),
            //     $('#idserie').val(ui.item.id)
        }

        //source: function (request, response) {
        //    response($.map(series, function (item) {
        //        return {
        //            id: item.Codigo,
        //            value: item.Serie
        //        }
        //    }
        //    ))

        //},
        //appendTo: $('#exampleModalCenter'),
        //select: function (event, ui) {
        //    //alert(ui.item.id);
        //    SelecEquipo(ui.item.id);
        //    $(this).val(ui.item.value),
        //        $('#idserie').val(ui.item.id)
        //}


    });

    //alert(seriessol.length);

    $('#txtnumserief').autocomplete({
        source: seriessol,
        appendTo: $('#exampleModalCenter'),
        select: function (event, ui) {
            //alert(ui.item.id);
            SelecEquipoxSerie(ui.item.value);
           // $(this).val(ui.item.value),
           //     $('#idserie').val(ui.item.id)
        }

       

    });

    



    
}


function SelecFaenaxNombre(faena, tipo) {

    //alert('Llego al Selec Equipo');
    //alert('equipos: ' + equipos.length);

    for (var j = 0; j < faenasa.length; j++) {
        var elemento = faenasa[j]
        //alert(elemento["idEquipo"]);

        if (faenasa[j].Nombre == faena) {

            var idFaena = elemento["idFaena"];

            //alert('idFaena Nombre:' + idFaena);

            if (tipo == 'R') {
                SelecFaena(idFaena);
            }
            else {
                SelecFaenaM(idFaena);}
            return;

        }


    }

}


function SelecClientexNombre(cliente, tipo) {

    //alert('Llego al Selec Equipo');
    //alert('equipos: ' + equipos.length);

    for (var j = 0; j < clientesa.length; j++) {
        var elemento = clientesa[j]
        //alert(elemento["idEquipo"]);

        if (clientesa[j].Nombre == cliente) {

            var idCliente = elemento["idCliente"];

            //alert('idCliente Nombre:' + idCliente);

            if (tipo == 'R') {
                SelecCliente(idCliente);
            }
            else { SelecClienteM(idCliente);}

            return;

        }


    }

}

function SelecEquipoxSerie(serie) {

    //alert('Llego al Selec Equipo');
    //alert('equipos: ' + equipos.length);

    for (var j = 0; j < equipos.length; j++) {
        var elemento = equipos[j]
        //alert(elemento["idEquipo"]);

        if (equipos[j].numserie == serie) {

            var idEquipo = elemento["idEquipo"];

            SelecEquipo(idEquipo);

            return;




        }


    }



}


function SelecEquipoxSerieM(serie) {

    //alert('Llego al Selec Equipo');
    //alert('equipos: ' + equipos.length);

    for (var j = 0; j < equipos.length; j++) {
        var elemento = equipos[j]
        //alert(elemento["idEquipo"]);

        if (equipos[j].numserie == serie) {

            var idEquipo = elemento["idEquipo"];

            SelecEquipoM(idEquipo);

            return;




        }


    }



}


function SelecFaena(id) {

   

    for (var j = 0; j < faenasa.length; j++) {
        var elemento = faenasa[j]

        //alert(elemento["idFaena"]);

        if (faenasa[j].idFaena == id) {
            
            //set('idcli', cliente);
           // alert(id);
            set('idfae', id);
           // alert('seteo idfaena')

            return;



        }

    }

}


function SelecFaenaM(id) {


    for (var j = 0; j < faenasa.length; j++) {
        var elemento = faenasa[j]

        //alert(elemento["idFaena"]);

        if (faenasa[j].idFaena == id) {

            //set('idcli', cliente);
            ///alert(id);
            set('idfaem', id);
           // alert('seteo idfaena')

            return;



        }

    }

}

function SelecClienteM(id) {



    for (var j = 0; j < clientesa.length; j++) {
        var elemento = clientesa[j]

        //alert(elemento["idCliente"]);

        if (clientesa[j].idCliente == id) {


            //alert(id);
            set('idclim', id);
            // alert('seteo idCliente')

            return;



        }

    }

}



function SelecCliente(id) {



    for (var j = 0; j < clientesa.length; j++) {
        var elemento = clientesa[j]

        //alert(elemento["idCliente"]);

        if (clientesa[j].idCliente == id) {

           
            //alert(id);
            set('idcli', id);
           // alert('seteo idCliente')

            return;



        }

    }

}


function SelecEquipo(id) {

    //alert('Llego al Selec Equipo');
    //alert('equipos: ' + equipos.length);

    for (var j = 0; j < equipos.length; j++) {
        var elemento = equipos[j]
        //alert(elemento["idEquipo"]);

        if (equipos[j].idEquipo == id)
        {
            var tipoequipo = elemento["idTipoEquipo"];
            var cliente = elemento["idCliente"];
            var faena = elemento["idFaena"];
            var modelo = elemento["idModelo"];

            var clienten = elemento["Cliente"];
            var faenan = elemento["Faena"];


            //alert('encontro el id Equipo');


            //alert('tipo equipo: ' + tipoequipo);
            //alert('cliente: ' + cliente);
            //alert('faena: ' + faena);
            //alert('modelo: ' + modelo);


            set('cboEquipo', tipoequipo);
            set('cboModelo', modelo);
            set('idcli', cliente);
            set('idfae', faena);

            set('faena', faenan );
            set('cliente', clienten);

            document.getElementById("cboEquipo").disabled = true;
            document.getElementById("cboModelo").disabled = true;

            document.getElementById("faena").disabled = true;
            document.getElementById("cliente").disabled = true;

            


        }


    }



}


function SelecEquipoM(id) {

    
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


            //alert('encontro el id Equipo');


            //alert('tipo equipo: ' + tipoequipo);
            //alert('cliente: ' + cliente);
            //alert('faena: ' + faena);
            //alert('modelo: ' + modelo);


            set('cboEquipoM', tipoequipo);
            set('cboModeloM', modelo);
            set('idclim', cliente);
            set('idfaem', faena);

            set('faenam', faenan);
            set('clientem', clienten);

            document.getElementById("cboEquipoM").disabled = true;
            document.getElementById("cboModeloM").disabled = true;

            document.getElementById("faenam").disabled = true;
            document.getElementById("clientem").disabled = true;



        }


    }



}


function CargarClientesAutoM() {

    //var local_source = [];

    clientesa = [];
    faenasa = [];
    series = [];
    equipos = [];
    seriessol = [];

    clientessol = [];
    faenassol = [];



    //alert('Entro al CargarClienteAutoM');
    fetchGet("Falla/RecuperarEquipos", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = {
                idEquipo: elemento["idEquipo"], nombre: elemento["NombreEquipo"], numserie: elemento["Serie"],
                idTipoEquipo: elemento["TipoEquipo"], idCliente: elemento["ClienteE"], idFaena: elemento["FaenaE"],
                idModelo: elemento["ModeloE"], Cliente: elemento["Cliente"], Faena: elemento["Faena"]


            };

            equipos.push(obj);

        }

    });


    fetchGet("Falla/listarClientes", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = { idCliente: elemento["idCliente"], Nombre: elemento["Nombre"] };


            var objf = elemento["Nombre"];

            clientessol.push(objf);

            clientesa.push(obj);

        }

    });

    $('#clientem').autocomplete({

        source: clientessol,
        appendTo: $('#ModFalla'),
        select: function (event, ui) {
            //alert(ui.item.id);
            SelecClientexNombre(ui.item.value,'M');
            // $(this).val(ui.item.value),
            //     $('#idserie').val(ui.item.id)
        }

        //source: function (request, response) {
        //    response($.map(clientesa, function (item) {
        //        return {
        //            id: item.idCliente,
        //            value: item.Nombre
        //        }
        //    }
        //    ))

        //},
        //appendTo: $('#ModFalla'),
        //select: function (event, ui) {
        //    $(this).val(ui.item.value),
        //        $('#idclim').val(ui.item.id)
        //}


    });

    fetchGet("Falla/listarFaenas", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = { idFaena: elemento["idFaena"], Nombre: elemento["Nombre"] };

            var objf = elemento["Nombre"];

            faenassol.push(objf);

            faenasa.push(obj);

        }

    });


    $('#faenam').autocomplete({

        source: faenassol,
        appendTo: $('#ModFalla'),
        select: function (event, ui) {
            //alert(ui.item.id);
            SelecFaenaxNombre(ui.item.value, 'M');
            // $(this).val(ui.item.value),
            //     $('#idserie').val(ui.item.id)
        }

        //source: function (request, response) {
        //    response($.map(faenasa, function (item) {
        //        return {
        //            id: item.idFaena,
        //            value: item.Nombre
        //        }
        //    }
        //    ))

        //},
        //appendTo: $('#ModFalla'),
        //select: function (event, ui) {
        //    $(this).val(ui.item.value),
        //        $('#idfaem').val(ui.item.id)
        //}


    });

    fetchGet("Falla/ListarSeriesEquiposC", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = { Codigo: elemento["idEquipo"], Serie: elemento["Serie"] };



            series.push(obj);

        }

    });

    fetchGet("Falla/ListarSeriesEquipos", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = elemento["Codigo"];

            seriessol.push(obj);

        }

    });

    $('#txtnumserieM').autocomplete({
        source: seriessol,
        appendTo: $('#ModFalla'),
        select: function (event, ui) {
            //alert(ui.item.id);
            SelecEquipoxSerieM(ui.item.value);
            // $(this).val(ui.item.value),
            //     $('#idserie').val(ui.item.id)
        }

        


    });




    //$('#txtnumserieM').autocomplete({
    //    source: function (request, response) {
    //        response($.map(series, function (item) {
    //            return {
    //                id: item.Codigo,
    //                value: item.Serie
    //            }
    //        }
    //        ))

    //    },
    //    appendTo: $('#ModFalla'),
    //    select: function (event, ui) {
    //        SelecEquipoM(ui.item.id);
    //        $(this).val(ui.item.value),
    //            $('#idserieM').val(ui.item.id)
    //    }

    //});


        
}



function GenerarTablaAdjuntos(arrayadj)
{
    document.getElementById("divTablaAdjuntosCrear").innerHTML = "";

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz;


    tabla = "";

    tabla = "<table class='table'>";

    tabla += "<tr><th>Archivo</th><th>Tipo de Adjunto</th><th>Comentario</th><th>Ruta</th><th>Acciones</th></tr>";

    for (let i = 0; i < arrayadj.length; i++) {
        tabla += "<tr id='fila" + i + "'><td> " + arrayadj[i][0] + " </td><td> " + arrayadj[i][1] + " </td><td> " + arrayadj[i][2] +
            "</td><td><a href='" + urlAbsoluta + adjuntos[i][4] + "' download='" + arrayadj[i][0] + "'><div style='height:100%;width:100%'>" + arrayadj[i][4] + "</div></a></td><td><i class='btn btn-danger' onclick='eliminarFila(" + i + ")';value='Eliminar'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash-fill' viewBox='0 0 16 16'><path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/></svg></i></td></tr>"


            //"</div></a></td><td><input type='button' onclick='eliminarFila(" + i + ")'; value='Eliminar' /></td></tr>";
  


    };


           // " </td><td><input type='button' onclick='eliminarFila(" + i + ")';  value='Eliminar' /></td></tr>";

   

    tabla += "</table>";

    //alert(tabla);

    document.getElementById("divTablaAdjuntosCrear").innerHTML = tabla;

}

function eliminarFila(index) {
    $("#fila" + index).remove();

    var removed = adjuntos.splice(index, 1);

    //alert(adjuntos.length);

    GenerarTablaAdjuntos(adjuntos);

}

function pintarAdjuntos(objConfiguracion, objBusqueda, objFormulario) {

    //alert('PintarAdjuntos');
    //URL Absolute  https://localhos
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + objConfiguracion.url;
    // alert(urlAbsoluta)
    //Controles//accion
    //alert('PintaAdjuntos');
    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(res => {
            var contenido = "";
            //Configuracion del formulario
            if (objFormulario != undefined) {
                objFormularioGlobal = objFormulario;
                if (objFormulario.guardar == undefined)
                    objFormulario.guardar = true
                if (objFormulario.limpiar == undefined)
                    objFormulario.limpiar = true
                if (objFormulario.formulariogenerico == undefined)
                    objFormulario.formulariogenerico = true
                if (objFormulario.callbackGuardar == undefined)
                    objFormulario.callbackGuardar = "GuardarDatos"
                if (objFormulario.id == undefined)
                    objFormulario.id = "frmFormulario"
                var type = objFormulario.type;
                if (type == "fieldset") {
                    contenido += "<fieldset>";
                    if (objFormulario.legend != undefined) {
                        contenido += "<legend>" + objFormulario.legend + "</legend>"
                    }


                    contenido += construirFormulario(objFormulario)
                    contenido += `
                     ${objFormulario.guardar == true ?
                            `<button class="btn btn-primary"
                          onclick="${(objFormulario.formulariogenerico == undefined
                                || objFormulario.formulariogenerico == false) ? `${objFormulario.callbackGuardar}()`
                                : `GuardarGenerico
                          ('${objFormulario.id}', '${objFormulario.urlGuardar}')`}">
                                Aceptar</button>` :
                            ''}    
                        ${objFormulario.limpiar == true ?
                            `<button class="btn btn-danger"
                                  onclick="${(objFormulario.formulariogenerico == undefined
                                || objFormulario.formulariogenerico == false) ? "Limpiar" :
                                "LimpiarGenerico"}('${objFormulario == undefined ? "" : objFormulario.id}')">
                                   Limpiar</button>`
                            : ''} 
                       `
                    contenido += "</fieldset>";
                }

            }

            if (objConfiguracion != undefined) {
                if (objConfiguracion.editar == undefined)
                    objConfiguracion.editar = false;
                if (objConfiguracion.eliminar == undefined)
                    objConfiguracion.eliminar = false;
                if (objConfiguracion.propiedadId == undefined)
                    objConfiguracion.propiedadId = "id";
                if (objConfiguracion.callbackEliminar == undefined)
                    objConfiguracion.callbackEliminar = "Eliminar";
                if (objConfiguracion.callbackEditar == undefined)
                    objConfiguracion.callbackEditar = "Editar";

                objConfiguracionGlobal = objConfiguracion;
            }

            if (objBusqueda != undefined && objBusqueda.busqueda == true) {
                if (objBusqueda.placeholder == undefined)
                    objBusqueda.placeholder = "Ingrese un valor"
                if (objBusqueda.id == undefined)
                    objBusqueda.id = "txtbusqueda"
                if (objBusqueda.type == undefined)
                    objBusqueda.type = "text"
                if (objConfiguracion.id == undefined)
                    objConfiguracion.id = "divTabla";
                if (objBusqueda.button == undefined)
                    objBusqueda.button = true;

                //Asignar los valores

                objBusquedaGlobal = objBusqueda;
                var type = objBusqueda.type;
                contenido += `
                 <div class="input-group mb-3">`
                if (type == "text") {
                    contenido += `
                           <input type="${objBusqueda.type}" class="form-control"
                           id="${objBusqueda.id}"
                         ${objBusqueda.button == true ? "" : "onkeyup='Buscar()'"}  
                       placeholder="${objBusqueda.placeholder}"
                               />`
                } else if (type == "combobox") {
                    contenido += `
                            <select class="form-control"
                        ${objBusqueda.button == true ? "" : "onchange='Buscar()'"}  
                            id="${objBusqueda.id}"></select>
                              `
                }

                if (objBusqueda.button == true) {
                    contenido += `
                  <button class="btn btn-primary" 
                     onclick="Buscar()"
                      type="button" >
                    Buscar</button>`
                }

                contenido += ` </div>`
            }
            contenido += "<div id='divContenedor'>";
            contenido += generarTablaAdjunto(objConfiguracion, res, objFormulario, true);
            contenido += "</div>";
            //alert(contenido);
            //alert(objConfiguracion.id);
            document.getElementById(objConfiguracion.id).innerHTML = contenido;
            //llenarComboBusqueda(res);

        })

}


function pintar(objConfiguracion, objBusqueda,objFormulario, listado) {

    //URL Absolute  https://localhos
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + objConfiguracion.url;
    // alert(urlAbsoluta)
    //Controles//accion
    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(res => {
            var contenido = "";
            //Configuracion del formulario
            if (objFormulario != undefined) {
                objFormularioGlobal = objFormulario;
                if (objFormulario.guardar == undefined)
                    objFormulario.guardar = true
                if (objFormulario.limpiar == undefined)
                    objFormulario.limpiar = true
                if (objFormulario.formulariogenerico == undefined)
                    objFormulario.formulariogenerico = true
                if (objFormulario.callbackGuardar == undefined)
                    objFormulario.callbackGuardar = "GuardarDatos"
                if (objFormulario.id == undefined)
                    objFormulario.id = "frmFormulario"
                var type = objFormulario.type;
                if (type == "fieldset") {
                    contenido += "<fieldset>";
                    if (objFormulario.legend != undefined) {
                        contenido += "<legend>" + objFormulario.legend+"</legend>"
                    }
                    

                    contenido += construirFormulario(objFormulario)
                    contenido += `
                     ${objFormulario.guardar == true ?
                        `<button class="btn btn-primary"
                          onclick="${( objFormulario.formulariogenerico == undefined
                            || objFormulario.formulariogenerico == false) ? `${objFormulario.callbackGuardar}()` 
                                : `GuardarGenerico
                          ('${objFormulario.id}', '${ objFormulario.urlGuardar }')`}">
                                Aceptar</button>` :
                        ''}    
                        ${objFormulario.limpiar == true ? 
                        `<button class="btn btn-danger"
                                  onclick="${(objFormulario.formulariogenerico == undefined
                            || objFormulario.formulariogenerico == false) ? "Limpiar" :
                            "LimpiarGenerico"}('${objFormulario==undefined?"":objFormulario.id}')">
                                   Limpiar</button>`
                        : ''} 
                       `
                    contenido += "</fieldset>";
                }
               
            }

            if (objConfiguracion != undefined) {
                if (objConfiguracion.editar == undefined)
                    objConfiguracion.editar = false;
                if (objConfiguracion.eliminar == undefined)
                    objConfiguracion.eliminar = false;
                if (objConfiguracion.propiedadId == undefined)
                    objConfiguracion.propiedadId = "id";
                if (objConfiguracion.callbackEliminar == undefined)
                    objConfiguracion.callbackEliminar = "Eliminar";
                if (objConfiguracion.callbackEditar == undefined)
                    objConfiguracion.callbackEditar = "Editar";

                objConfiguracionGlobal = objConfiguracion;
            }

            if (objBusqueda != undefined && objBusqueda.busqueda == true) {
                if (objBusqueda.placeholder == undefined)
                    objBusqueda.placeholder = "Ingrese un valor"
                if (objBusqueda.id == undefined)
                    objBusqueda.id = "txtbusqueda"
                if (objBusqueda.type == undefined)
                    objBusqueda.type = "text"
                if (objConfiguracion.id == undefined)
                    objConfiguracion.id = "divTabla";
                if (objBusqueda.button == undefined)
                    objBusqueda.button = true;
               
                //Asignar los valores
         
                objBusquedaGlobal = objBusqueda;
                var type = objBusqueda.type;
                contenido += `
                 <div class="input-group mb-3">`
                if (type == "text") {
                    contenido += `
                           <input type="${objBusqueda.type}" class="form-control"
                           id="${objBusqueda.id}"
                         ${objBusqueda.button == true ? "" : "onkeyup='Buscar()'"}  
                       placeholder="${objBusqueda.placeholder}"
                               />`
                } else if (type == "combobox") {
                    contenido += `
                            <select class="form-control"
                        ${objBusqueda.button == true ? "" : "onchange='Buscar()'"}  
                            id="${objBusqueda.id}"></select>
                              `
                }
               
                if (objBusqueda.button == true) {
                    contenido += `
                  <button class="btn btn-primary" 
                     onclick="Buscar()"
                      type="button" >
                    Buscar</button>`
                }
           
                contenido +=  ` </div>`
            }
            contenido += "<div id='divContenedor'>";

            if (listado == 'FR') { contenido += generarTabla(objConfiguracion, res, objFormulario, true); }
            else {
            contenido += generarTablaAdmin(objConfiguracion, res, objFormulario, true);
            }
            contenido += "</div>";
            //alert(contenido);
            //alert(objConfiguracion.id);
            document.getElementById(objConfiguracion.id).innerHTML = contenido;
            //llenarComboBusqueda(res);

        })

}

function llenarComboBusqueda(res) {
    if (objBusquedaGlobal.type == "combobox") {
        var id = objBusquedaGlobal.id;
        var propiedadMostrar = objBusquedaGlobal.displaymember;
        var propiedadId = objBusquedaGlobal.valuemember;
        var name = objBusquedaGlobal.name;
        var data = res[name]
        llenarCombo(data, id, propiedadMostrar, propiedadId)
    }
  
}

function LimpiarDatos(idFormulario,excepciones=[]) {
    var elementos = document.querySelectorAll("#"+idFormulario+" [name]")
    for (var i = 0; i < elementos.length; i++) {
        //Si esta incluido no se hace nada

        if (!excepciones.includes(elementos[i].name))
        elementos[i].value = "";
    }
}

function generarTablaAdjunto(objConfiguracion, res, objFormulario, primeravez = false) {
    // objFormulario.formulariogenerico = true
    var listaPintar = res;

    //alert(res.length);

    var contenido = "";

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz;

    if (res.length > 0) {
        //alert('LLego al generar Tabla');

        if (objConfiguracion != null && objConfiguracion.name != undefined && primeravez == true) {
            var nombrePropiedad = objConfiguracion.name;
            listaPintar = res[nombrePropiedad];
        }

        contenido += "<table class='table'>";
        contenido += "<tr>";
        for (var j = 0; j < objConfiguracion.cabeceras.length; j++) {
            contenido += "<th>" + objConfiguracion.cabeceras[j] + "</th>"
        }
        if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {

            contenido += "<th>Acción</th>";
        }
        contenido += "</tr>";
        var fila;
        var propiedadActual;
        for (var i = 0; i < listaPintar.length; i++) {
            fila = listaPintar[i]
            contenido += "<tr>";
            for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
                propiedadActual = objConfiguracion.propiedades[j]

                //alert(propiedadActual);

                var archivo;

                if (propiedadActual == "Nombre")
                {
                    archivo = fila[propiedadActual];
                    //alert(archivo);
                }


                if (propiedadActual == "Ruta")
                {
                    //" </td><td><a href='http://google.com.pe'><div style='height:100%;width:100%'>hello world</div></a></td><td><input type='button' onclick='eliminarFila(" + i + ")'; value='Eliminar' /></td></tr>";

                    contenido += "<td><a href='" + urlAbsoluta + fila[propiedadActual] + "' download = '" + archivo +"' ><div style='height:100%;width:100%'>" + fila[propiedadActual] + "</div></a></td>";

                  
                }
                else {

                    contenido += "<td>" + fila[propiedadActual] + "</td>";
                }
            }
            ////contenido += "<td>" + fila.id + "</td>";  //fila["id"]
            ////contenido += "<td>" + fila.nombre + "</td>";
            ////contenido += "<td>" + fila.descripcion + "</td>";
            if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {
                contenido += "<td>";
                if (objConfiguracion.editar == true) {
                    contenido += ` <i class="btn btn-primary" data-toggle="modal" data-target="#ModFalla"
               onclick='${(objFormulario != undefined &&
                            objFormulario.formulariogenerico != undefined &&
                            objFormulario.formulariogenerico == true) ? "EditarGenerico"
                            : objConfiguracion.callbackEditar
                        }(${fila[objConfiguracion.propiedadId]} , 
                     "${objFormulario == undefined ? "" : objFormulario.id} " ) ' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
                    <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.854a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z" />
                </svg></i>`
                }

                if (objConfiguracion.eliminar == true) {
                    contenido += `<i class="btn btn-danger" 
                onclick='${(objFormulario != undefined &&
                            objFormulario.formulariogenerico != undefined
                            &&
                            objFormulario.formulariogenerico == true) ? "EliminarGenerico"
                            : objConfiguracion.callbackEliminar
                        }(${fila[objConfiguracion.propiedadId]}) '  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                       <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                       </svg></i>`
                }

                contenido += "</td>";

            }

            contenido += "</tr>";
        }
        contenido += "</table>"

    }

    return contenido;

}

function generarTablaAdmin(objConfiguracion, res, objFormulario, primeravez = false) {
    // objFormulario.formulariogenerico = true
    var listaPintar = res;

    //alert(res.length);

    var contenido = "";

    if (res.length > 0) {
        //alert('LLego al generar Tabla');

        if (objConfiguracion != null && objConfiguracion.name != undefined && primeravez == true) {
            var nombrePropiedad = objConfiguracion.name;
            listaPintar = res[nombrePropiedad];
        }

        contenido += "<table class='table'>";
        contenido += "<tr>";
        for (var j = 0; j < objConfiguracion.cabeceras.length; j++) {
            contenido += "<th>" + objConfiguracion.cabeceras[j] + "</th>"
        }
        if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {

            contenido += "<th>Operaciones</th>";
        }
        contenido += "</tr>";
        var fila;
        var propiedadActual;
        for (var i = 0; i < listaPintar.length; i++) {
            fila = listaPintar[i]
            contenido += "<tr>";
            for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
                propiedadActual = objConfiguracion.propiedades[j]
                contenido += "<td>" + fila[propiedadActual] + "</td>";
            }
            ////contenido += "<td>" + fila.id + "</td>";  //fila["id"]
            ////contenido += "<td>" + fila.nombre + "</td>";
            ////contenido += "<td>" + fila.descripcion + "</td>";
            if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {
                contenido += "<td>";
                if (objConfiguracion.editar == true) {
                    contenido += ` <i class="btn btn-primary"
               onclick='${(objFormulario != undefined &&
                            objFormulario.formulariogenerico != undefined &&
                            objFormulario.formulariogenerico == true) ? "EditarGenerico"
                            : objConfiguracion.callbackEditar
                        }(${fila[objConfiguracion.propiedadId]} , 
                     "${objFormulario == undefined ? "" : objFormulario.id} " ) ' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
                    <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.854a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z" />
                </svg></i>`
                }

                if (objConfiguracion.eliminar == true) {
                    contenido += `<i class="btn btn-danger" 
                onclick='${(objFormulario != undefined &&
                            objFormulario.formulariogenerico != undefined
                            &&
                            objFormulario.formulariogenerico == true) ? "EliminarGenerico"
                            : objConfiguracion.callbackEliminar
                        }(${fila[objConfiguracion.propiedadId]}) '  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                       <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                       </svg></i>`
                }

                contenido += "</td>";

            }

            contenido += "</tr>";
        }
        contenido += "</table>"

    }

    return contenido;

}



function generarTabla(objConfiguracion, res , objFormulario,primeravez=false) {
    // objFormulario.formulariogenerico = true
    var listaPintar = res;

    //alert(res.length);

    var contenido = "";

    if (res.length > 0)
    {
        //alert('LLego al generar Tabla');

        if (objConfiguracion != null && objConfiguracion.name != undefined && primeravez == true) {
            var nombrePropiedad = objConfiguracion.name;
            listaPintar = res[nombrePropiedad];
        }

        contenido += "<table class='table'>";
        contenido += "<tr>";
        for (var j = 0; j < objConfiguracion.cabeceras.length; j++) {
            contenido += "<th>" + objConfiguracion.cabeceras[j] + "</th>"
        }
        if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {

            contenido += "<th>Operaciones</th>";
        }
        contenido += "</tr>";
        var fila;
        var propiedadActual;
        for (var i = 0; i < listaPintar.length; i++) {
            fila = listaPintar[i]
            contenido += "<tr>";
            for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
                propiedadActual = objConfiguracion.propiedades[j]
                contenido += "<td>" + fila[propiedadActual] + "</td>";
            }
            ////contenido += "<td>" + fila.id + "</td>";  //fila["id"]
            ////contenido += "<td>" + fila.nombre + "</td>";
            ////contenido += "<td>" + fila.descripcion + "</td>";
            if (objConfiguracion.editar == true || objConfiguracion.eliminar == true) {
                contenido += "<td>";
                if (objConfiguracion.editar == true) {
                    contenido += ` <i class="btn btn-primary" data-toggle="modal" data-target="#ModFalla"
               onclick='${(objFormulario != undefined &&
                            objFormulario.formulariogenerico != undefined &&
                            objFormulario.formulariogenerico == true) ? "EditarGenerico"
                            : objConfiguracion.callbackEditar
                        }(${fila[objConfiguracion.propiedadId]} , 
                     "${objFormulario == undefined ? "" : objFormulario.id} " ) ' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
                    <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.854a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z" />
                </svg></i>`
                }

                if (objConfiguracion.eliminar == true) {
                    contenido += `<i class="btn btn-danger" 
                onclick='${(objFormulario != undefined &&
                            objFormulario.formulariogenerico != undefined
                            &&
                            objFormulario.formulariogenerico == true) ? "EliminarGenerico"
                            : objConfiguracion.callbackEliminar
                        }(${fila[objConfiguracion.propiedadId]}) '  ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                       <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                       </svg></i>`
                }

                contenido += "</td>";

            }

            contenido += "</tr>";
        }
        contenido += "</table>"
       
    }

    return contenido;

}

function fetchGet(url,callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    fetch(urlAbsoluta).then(res => res.json())
        .then(res => {
            callback(res)
        }).catch(err => {
            console.log(err)
        })

}

function fetchGetText(url, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    fetch(urlAbsoluta).then(res => res.text())
        .then(res => {
            callback(res)
        }).catch(err => {
            console.log(err)
        })

}

function fetchPostText(url,frm, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;

   

    fetch(urlAbsoluta, {
        method: "POST",
        body: frm
    }).then(res => res.text())
        .then(res => {
            callback(res)
        }).catch(err => {
            console.log(err)
        })
    /*
    fetch(urlAbsoluta).then(res => res.json())
        .then(res => {
            callback(res)
        }).catch(err => {
            console.log(err)
        })
        */
}



function Buscar() {
    var objConf = objConfiguracionGlobal;
    var objBus = objBusquedaGlobal;
    //Id del control
    var valor = get(objBus.id)
    fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
        var rpta = generarTabla(objConf, res, objFormularioGlobal);
        document.getElementById("divContenedor").innerHTML = rpta;
    })
    /*
    fetch(`${objBus.url}/?${objBus.nombreparametro}=` + valor)
        .then(res => res.json())
        .then(res => {
            var rpta = generarTabla(objConf, res);
            document.getElementById("divContenedor").innerHTML = rpta;
        })
        */
    /*
    pintar({
        url: `${objBus.url}/?${objBus.nombreparametro}=` + valor,
        id: objConf.id,
        cabeceras: objConf.cabeceras,
        propiedades: objConf.propiedades
    }, objBus)*/
}


function recuperarGenerico(url,idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    var nombreName;
    fetchGet(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            nombreName = elementos[i].name;

            if (nombreName == "idEstado")
            {
                //alert('Estado');
                set('cboEstadoL', res[nombreName]);
            }

            if (!excepciones.includes(elementos[i].name))
                setN(nombreName, res[nombreName])
        }
    });



    
}


function recuperarEquipo(url, idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    var nombreName;
    fetchGet(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            nombreName = elementos[i].name;

            //if (nombreName == "idEstado") {
            //    //alert('Estado');
            //    set('cboEstadoL', res[nombreName]);
            //}

            if (!excepciones.includes(elementos[i].name))
                setN(nombreName, res[nombreName])
        }

        EquipoEnc = "Si"

    });




}


function recuperarEquipoMod(url, idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    var nombreName;
    fetchGet(url, function (res) {
        if (res != undefined) {
            if (res["idEquipoM"] != '0')
            {
                for (var i = 0; i < elementos.length; i++) {
                    nombreName = elementos[i].name;



                    if (!excepciones.includes(elementos[i].name))
                        setN(nombreName, res[nombreName])
                }

                $('#ModalEquipo').modal('show');

            }
            else {
                alert('No se encontro equipo con la serie asignada');
            }

           
        }
       

   

    });




}



function ModificarEstadoAdm() {

    var idFalla = get("idFallaG");
    var comentarios = get("ComentarioAdm");

    var estadoanterior = get("idEstadoAnterior");
    var estadoactual = get("cboEstadoAdm");

    //alert(idFalla);

    //alert('Este es el estado anterior: ' + estadoanterior);
    //alert('Este es el estado actual: ' + estadoactual);



    if (estadoanterior != estadoactual) {
        //alert('Insertar en Historial estados');

        if (comentarios == null || comentarios == '') {
            alert('Debe ingresar los comentarios por el Cambio de Estado');
            return;
        }

        ActualizarEstado(idFalla, estadoactual, comentarios, 'AdmF');

        //AgregarHistorial(estadoactual, comentarios, 1, idFalla)

    }
    else { alert('Debe de modificar por un estado diferente al actual'); }


}


function ModificarEstado()
{

    var idFalla = get("idFallaM");
    var comentarios = get("Comentario");

    var estadoanterior = get("idEstadoAnterior");
    var estadoactual = get("cboEstadoL");

    //alert('Este es el estado anterior: ' + estadoanterior);
    //alert('Este es el estado actual: ' + estadoactual);

  

    if (estadoanterior != estadoactual) {
        //alert('Insertar en Historial estados');

        if (comentarios == null || comentarios == '') {
            alert('Debe ingresar los comentarios por el Cambio de Estado');
            return;
        }

        ActualizarEstado(idFalla, estadoactual, comentarios, 'FR');

        //AgregarHistorial(estadoactual, comentarios, 1, idFalla)

    }
    else
    { alert('Debe de modificar por un estado diferente al actual');}


}

function ActualizarEstado(idFalla,idEstado,Comentario,Pantalla)
{
    var url =
        "Falla/ActualizarEstado/?idFalla=" + idFalla + "&idEstado=" + idEstado + "&Comentario=" + Comentario;


    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;

    //alert(urlAbsoluta);

    fetch(urlAbsoluta)
        //.then(res => res.json())
        .then(res => {
            if (res.text() != "0") {
                //alert('Inserto el adjunto');
                set("idEstadoAnterior", idEstado);
               
                if (Pantalla == "FR") {
                    listarHistorialEstados(idFalla);
                    listarFallaReportada(); //Pantalla Principal
                

                }
                else {
                    //alert('LLego al AdminFallas Historial');
                    listarHistorialEstadosM(idFalla);
                    listarAdminFallas(); //Pantalla Principal
                }
           

            }


            //Configuracion del formulario

        });
    
   
}


function recuperarGenericoFalla(url, idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]")
    var nombreName;
    fetchGet(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            nombreName = elementos[i].name

            if (nombreName == "idEstado") {
                //alert('Estado');
                set('cboEstadoAdm', res[nombreName]);
            }

           


            //alert('Campo: ' + nombreName + ' valor: ' + res[nombreName]);
            
            if (!excepciones.includes(elementos[i].name)) {


                if (nombreName == "idTipoEquipoM") {
                    tipoequipoo = res[nombreName];
                    localStorage.setItem('TipoEquipoO', tipoequipoo); };

                if (nombreName == "idModeloM") { modeloo = res[nombreName]; localStorage.setItem('ModeloO', modeloo); };
                if (nombreName == "idClienteM") { clienteo = res[nombreName]; localStorage.setItem('ClienteO', clienteo); };
                if (nombreName == "idFaenaM") { faenao = res[nombreName]; localStorage.setItem('FaenaO', faenao); };
                //if (nombreName == "numSerieM") { alert(res[nombreName]);  serieo = res[nombreName]; localStorage.setItem('SerieO', serieo); };


                if (nombreName == "idEquipoFM") {
                    if (res[nombreName] == '0') { set('cboSerieM', ''); }
                    else { setN(nombreName, res[nombreName]) }
                    //alert('valor del equipo:' + res[nombreName]);
                    //set('cboSerieM', '21');
                }
                else { setN(nombreName, res[nombreName]) }
            }
        }

        //alert(res['tituloM']);

        //setN('tituloFalla', res['tituloM']); no se xq hace esto

        //alert('Recupera');

        var idcliente = get('idClienteM');
        var clienteRef = get('clienteRefM');
        var faenaRef = get('faenaRefM');
        var idfaena = get('idFaenaM');

        var idEquipo = get('cboSerieM');
        var serie = get('numserieM');

        var serieo = serie;
        //alert(serieo);
        localStorage.setItem('SerieO', serieo);
   


        //alert('esta es el idequipo' + idEquipo);
       // alert(serie);


        if (idEquipo == '0' || idEquipo == '')
             {
            //alert('Entro');
            $("#lblNroSerie").text("Nro. Serie: (Ref: " + serie + " )");
            //set('lblCliente', 'Cliente Ref(');
        }
        else { $("#lblNroSerie").text("Nro. Serie:"); }

        //alert(clienteRef);
        //alert('Este es el valor del idcliente ' + idcliente);

        if (idcliente == '') {
            //alert('Entro');
            $("#lblCliente").text("Cliente: (Ref: " + clienteRef + " )");
            //set('lblCliente', 'Cliente Ref(');
        }
        else
        { $("#lblCliente").text("Cliente:");}

        if (idfaena == '') {
           // alert('Entro');
            $("#lblFaena").text("Faena: (Ref: " + faenaRef + " )");
            //set('lblCliente', 'Cliente Ref(');
        }
        else
        { $("#lblFaena").text("Faena:"); }



        var elementosf = document.querySelectorAll("#frmModFallaAdminG [name]");

        //alert('Elementos de FallaAdminG');
        //alert(elementosf.length);

        for (var i = 0; i < elementosf.length; i++) {
            nombreName = elementosf[i].name
            if (!excepciones.includes(elementosf[i].name)) {

                switch (nombreName) {

                    case "IngGarantias":

                        if (res[nombreName] == '0') { set('cboIngGarantia', ''); }
                        else { setN(nombreName, res[nombreName]) }

                        break;


                    case "ResponsablePSG":

                        if (res[nombreName] == '0') { set('cboResponsablePSG', ''); }
                        else { setN(nombreName, res[nombreName]) }

                        break;

                    case "Fabrica":

                        if (res[nombreName] == '0') { set('cboFabrica', ''); }
                        else { setN(nombreName, res[nombreName]) }

                        break;

                    case "TipoGarantia":

                        if (res[nombreName] == '0') { set('cboTipoGarantia', ''); }
                        else { setN(nombreName, res[nombreName]) }

                        break;

                    default:

                        setN(nombreName, res[nombreName])

                        break;

                }


                //if (nombreName == "IngGarantias") {
                
                //    if (res[nombreName] == '0') { set('cboIngGarantia', ''); }
                //    else { setN(nombreName, res[nombreName]) }
                 
                //}
                //else { setN(nombreName, res[nombreName]) }

                //if (nombreName == "ResponsablePSG") {
                  
                //    if (res[nombreName] == '0') { set('cboResponsablePSG', ''); }
                //    else { setN(nombreName, res[nombreName]) }
                
                //}
                //else { setN(nombreName, res[nombreName]) }

               // ---------------------------------------------------

                //if (nombreName == "Fabrica") {
                   
                //    if (res[nombreName] == '0') { set('cboFabrica', ''); }
                //    else { setN(nombreName, res[nombreName]) }
                  
                //}
                //else { setN(nombreName, res[nombreName]) }

                //if (nombreName == "TipoGarantia") {
                  
                //    if (res[nombreName] == '0') { set('cboTipoGarantia', ''); }
                //    else { setN(nombreName, res[nombreName]) }
                    
                //}
                //else { setN(nombreName, res[nombreName]) }


            //    setN(nombreName, res[nombreName])
            }
        }

    });


}


function construirFormulario(objFormulario) {
    var type = objFormulario.type;
    var elementos = objFormulario.formulario;
    
    var contenido = "<div class='mt-3 mb-3'>";
    contenido += `<form id='${objFormulario.id}'  method='POST'>`;
    //FILAS
    var arrayelemento;
    var numeroarrayelemento;
    for (var i = 0; i < elementos.length; i++) {
        arrayelemento = elementos[i];
        numeroarrayelemento = arrayelemento.length;
        contenido += "<div class='row'>";
        for (var j = 0; j < numeroarrayelemento; j++) {
            var hijosArray = arrayelemento[j]
            if (hijosArray.class == undefined) {
                hijosArray.class = "mb-3";
            }
            if (hijosArray.type == undefined) {
                hijosArray.type = "text";
            }
            if (hijosArray.readonly == undefined) {
                hijosArray.readonly = false;
            }
            if (hijosArray.value == undefined) {
                hijosArray.value = "";
            }
            if (hijosArray.label == undefined) {
                hijosArray.label = hijosArray.name;
            }
            if (hijosArray.cols == undefined) {
                hijosArray.cols = "50";
            }
            if (hijosArray.rows == undefined) {
                hijosArray.rows = "10";
            }
            var typelemento = hijosArray.type;
            contenido += `<div class="${hijosArray.class}">`
            contenido += `<label>${hijosArray.label}</label>`
            if (typelemento == "text" || typelemento == "number" || typelemento == "date") {
                contenido += `  <input type="${typelemento}" class="form-control"
                       name="${hijosArray.name}" value="${hijosArray.value}"
                   ${hijosArray.readonly == true ? "readonly" : ""}  />`
            } else if (typelemento == "textarea") {
                contenido += `<textarea name="${hijosArray.name}" 
                     class="form-control"
                     rows="${hijosArray.rows}" cols="${hijosArray.cols}"
                       >${hijosArray.value}</textarea>`

            }
            contenido += `</div>`

        }

        contenido += "</div>";

    }
    contenido += "</form>";
    contenido += "</div>"
    return contenido;
}

function GuardarGenerico(idformulario, urlguardar) {
   // alert(idformulario);
   // alert(urlguardar);
    var frmGenerico = document.getElementById(idformulario);
    var frm = new FormData(frmGenerico);
    fetchPostText(urlguardar, frm, function (res) {
        if (res == "1") {

            var objConf = objConfiguracionGlobal;
            var objBus = objBusquedaGlobal;
            //Id del control
            var valor = get(objBus.id)
            fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
                var rpta = generarTabla(objConf, res, objFormularioGlobal);
                document.getElementById("divContenedor").innerHTML = rpta;
            })
            LimpiarDatos(idformulario)
            //listarTipoHabitacion();
            //Limpiar();
        }
    })
}

function EditarGenerico(id, idFormulario) {
    //var idFormulario = "frmCama";
   // var idformulario = objConfiguracionGlobal 
    //alert(idFormulario)
    var url = objConfiguracionGlobal.urlRecuperar;  
    var nombreparametro = objConfiguracionGlobal.parametroRecuperar  
    recuperarGenerico(`${url}/?${nombreparametro}=` + id,
        idFormulario);
}

function EliminarGenerico(id) {
    var url = objConfiguracionGlobal.urlEliminar;
    var nombreparametro = objConfiguracionGlobal.parametroEliminar;
    var objConf = objConfiguracionGlobal;
    var objBus = objBusquedaGlobal;
                var valor = get(objBus.id)

    Confirmacion("Desea eliminar el tipo habitacion?", "Confirmar eliminaciòn",
        function (res) {

            fetchGetText(`${url}/?${nombreparametro}=` + id,
                function (rpta) {
            if (rpta == "1") {
                Correcto("Se elimino correctamente");
                fetchGet(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
                    var rpta = generarTabla(objConf, res, objFormularioGlobal);
                    document.getElementById("divContenedor").innerHTML = rpta;
                })
               // listarTipoHabitacion();
            }
        })
    })
}

function LimpiarGenerico(idFormulario) {
    LimpiarDatos(idFormulario)
}

function GuardarFalla() {

    var idFalla = document.getElementById("idFalla").value;

    //alert('este es el IdFalla: valor');
    //alert(idFalla);

    if (idFalla == "")
    { AgregarFalla(); }
    else { ModificarFalla(); }


}

function ModificarFalla() {

    var txtcliente = get('clientem');
    var txtfaena = get('faenam');

    var enc = "No";
    var encfa = "No";

    //alert(txtcliente);
    //alert(txtfaena);

    for (var j = 0; j < clientesa.length; j++) {
        elemento = clientesa[j];
        //alert(elemento["idEstado"]);

        if (txtcliente == elemento["Nombre"]) {
            //alert('Elemento distinto');
            enc = "Si";
        }


    }

    //alert('valor encontrado: ' + enc);

    if (enc == "No") {
        //alert('No encontrado clientem');

        set('clienteRefM', txtcliente);

        set('idclim', null);

    }
    else { set('clienteRefM', txtcliente); }

    for (var j = 0; j < faenasa.length; j++) {
        elemento = faenasa[j];
        //alert(elemento["idEstado"]);

        if (txtfaena == elemento["Nombre"]) {
            //alert('Elemento distinto');
            encfa = "Si";
        }


    }

    //alert('valor encontrado: ' + enc);

    if (encfa == "No") {
        //alert('No encontrado FaenaM');

        set('faenaRefM', txtfaena);

        set('idfaem', null);

    }
    else { set('faenaRefM', txtfaena); }


    var estadoanterior = get("idEstadoAnterior");
    //var estadoactual = get("cboEstado");

    setN('idEstado', estadoanterior);

    //alert('Llego al Habiitar');

    document.getElementById("cboEquipoM").disabled = false;
    document.getElementById("cboModeloM").disabled = false;



    var frmFalla = document.getElementById("frmModFalla");
    var frm = new FormData(frmFalla);


    //alert('Este es el estado anterior: ' + estadoanterior);
    //alert('Este es el estado actual: ' + estadoactual);

    var idFalla = get("idFallaM");
    var comentarios = get("Comentario");

    ///Solo se puede modificar el estado a travez del Tab
    //if (estadoanterior != estadoactual )
    //{
      
    //    if (comentarios == null || comentarios == '')
    //    {
    //        alert('Debe ingresar los comentarios por el Cambio de Estado');
    //        return;
    //    }

    //    AgregarHistorial(estadoactual, comentarios, 1,  idFalla )
    //}

    var idEquipo = get('idEquipoEM');


    if (idEquipo == '') {
        //set('idEquipoFinal', 0);
        var serieEquipo = get('SerieEquipoM');

        //alert(serieEquipo);

        ////Se registra nuevo equipo

        if (serieEquipo != "") {

            set('idEquipoEM', 0);

            var frmEquipo = document.getElementById("frmEquipoMod");

            var frmequi = new FormData(frmEquipo);

            fetchPostText("Falla/RegistrarEquipoMod", frmequi, function (res) {
                // alert('Lo que devuelve el store:');
                // alert(res);
                if (res != "0") {

                    set('idEquipoFinalM', res);
                    //Modificar Falla//

                    var frm = new FormData(frmFalla);
                    fetchPostText("Falla/GuardarFalla", frm, function (res) {
                        //alert('Lo que devuelve el store:');
                        //alert(res);
                        if (res != "0") {
                            //    alert('Modifico correctamente');
                            $('#ModFalla').modal('hide');
                            listarFallaReportada();
                            //Limpiar();
                        }
                    });


                }
            });

        }
    }
    else
    {

        set('idEquipoFinalM', idEquipo);
                    

        var frm = new FormData(frmFalla);
        fetchPostText("Falla/GuardarFalla", frm, function (res) {
            //alert('Lo que devuelve el store:');
            //alert(res);
            if (res != "0") {
                //    alert('Modifico correctamente');
                $('#ModFalla').modal('hide');
                listarFallaReportada();
                //Limpiar();
            }
        });


    }






}

function AgregarHistorial(Estado, Comentario, Usuario, idFalla)
{
    var url =
        "Falla/guardarHistorialEstados/?idEstado=" + Estado + "&idUsuarioCreacion=" + Usuario + "&Comentario=" + Comentario + "&idFalla=" + idFalla;


    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;

    //alert(urlAbsoluta);

    fetch(urlAbsoluta)
        //.then(res => res.json())
        .then(res => {
            if (res.text() != "0") {
                //alert('Inserto el adjunto');
                listarHistorialEstados(idFalla);

            }


            //Configuracion del formulario

        });


}





function ModificarFallaAdmin() {


    var estadoanterior = get("idEstadoAnterior");
    setN('idEstado', estadoanterior);


    //var combo = document.getElementById("cboClienteM");

    //if (combo.selectedIndex > -1) {
    var txtcliente = get('Cliente');
    set('clienteRefM', txtcliente);
    //}


    //var combo = document.getElementById("cboFaenaM");

    //if (combo.selectedIndex > -1) {

    var txtfaena = get('FaenaM');
    set('faenaRefM', txtfaena);

   // }

    var idequipoff = get('cboSerieM');

    //alert('Equipo seleccionado:'+ idequipoff);
    //set('idEquipoFinalM', idEquipo);

    if (idequipoff == '0' || idequipoff == '' ) {
        alert('Debe seleccionar un equipo para guardar los cambios.');
        return;

    }
    else
    {
        var combo = document.getElementById("cboSerieM");
        
        if (combo.selectedIndex > -1) {

            var serienum = combo.options[combo.selectedIndex].text;
         

            set('numserieM', serienum);


    }

       
    }


    
    var clienten = getN('idClienteM');
    //alert('clienre:' + clienten);

    var frmFalla = document.getElementById("frmModFallaAdmin");
    var frm = new FormData(frmFalla);

    fetchPostText("Falla/GuardarFalla", frm, function (res) {
        // alert('Lo que devuelve el store:');
        //  alert(res);
        if (res == "1") {
            ModificarFallaAdminG();
            //alert('Modifico correctamente');
            // $('#ModFalla').modal('hide');
            // listarAdminFallas();



        }
    });

    



    //var idEquipo = get('idEquipoEM');

    //if (idEquipo == '') {
    //    //set('idEquipoFinal', 0);
    //    var serieEquipo = get('SerieEquipoM');

       

    //    if (serieEquipo != "") {

    //        set('idEquipoEM', 0);

    //        var frmEquipo = document.getElementById("frmEquipoModA");

    //        var frmequi = new FormData(frmEquipo);

    //        fetchPostText("Falla/RegistrarEquipoMod", frmequi, function (res) {
               
    //            if (res != "0") {

    //                set('idEquipoFinalM', res);
    //                //Modificar Falla//

    //                var frmFalla = document.getElementById("frmModFallaAdmin");
    //                var frm = new FormData(frmFalla);



    //                fetchPostText("Falla/GuardarFalla", frm, function (res) {
    //                    // alert('Lo que devuelve el store:');
    //                    //  alert(res);
    //                    if (res == "1") {
    //                        ModificarFallaAdminG();
                          



    //                    }
    //                });

    //            }
    //        });
    //    }
    //}
    //else
    //{
    //    set('idEquipoFinalM', idEquipo);

    //    var frmFalla = document.getElementById("frmModFallaAdmin");
    //    var frm = new FormData(frmFalla);

    //    fetchPostText("Falla/GuardarFalla", frm, function (res) {
    //        // alert('Lo que devuelve el store:');
    //        //  alert(res);
    //        if (res == "1") {
    //            ModificarFallaAdminG();
                


    //        }
    //    });

    //}







   


    ///////////// 2da parte ///////////

   

}


function ModificarFallaAdminG() {


    //alert('Llego al nuevo FallaAdminG');

    var fecharecepcion = document.getElementById("frecepcion").value;

    //alert(fecharecepcion);
   
    /*if (fecharecepcion == '') {
        alert('FechaRecepcionNull');
        document.getElementsByName("FechaRecepcion")[0].value = '';

    }*/


    document.getElementById("frecepcion").disabled = false;
    document.getElementById("Margen").disabled = false;

    var aceptado = get('TotalAceptado');
    var reclamado = get('TotalReclamado');

    var margen = aceptado - reclamado;
    set('Margen', margen);


    var frmFallaG = document.getElementById("frmModFallaAdminG");
    var frmG = new FormData(frmFallaG);

    //alert(frmG.length);

    fetchPostText("Falla/GuardarFallaAdmin", frmG, function (res) {
        //alert('Lo que devuelve el store GFallaAdmin:');
        //alert(res);
        if (res == "1") {
           
           // $('#ModFalla').modal('hide');
            //listarAdminFallas();

            var url = "Falla/AdminFallas"

            var raiz = document.getElementById("hdfOculto").value;
            var urlAbsoluta = window.location.protocol + "//" +
                window.location.host + raiz + url;
            //// alert(urlAbsoluta)

            window.location.replace(urlAbsoluta);

           
        }
    });


}



function AgregarFalla() {

    var urlguardar = "Falla/CrearFalla";

    var titulofalla = get('titulo');

    //alert('titlo al registrar: ' + titulofalla);

    if (titulofalla == null || titulofalla == '')
        {
        alert('Para registrar una falla, necesita ingresar el titulo');
        return;
        }


    document.getElementById("cboEquipo").disabled = false;
    document.getElementById("cboModelo").disabled = false;

    var frmFalla = document.getElementById("frmFalla");
    var frm = new FormData(frmFalla);

    var txtcliente = get('cliente');
    var txtfaena = get('faena');


    var enc = "No";
    var encfa = "No";

    //alert(txtcliente);
    //alert(txtfaena);

    for (var j = 0; j < clientesa.length; j++) {
        elemento = clientesa[j];
        //alert(elemento["idEstado"]);

        if (txtcliente == elemento["Nombre"]) {
            //alert('Elemento distinto');
            enc = "Si";
        }


    }

    //alert('valor encontrado: ' + enc);

    if (enc == "No") {
        //alert('No encontrado');

        set('clienteRef', txtcliente);

        set('idcli', null);

    }
    else { set('clienteRef', txtcliente); }

    for (var j = 0; j < faenasa.length; j++) {
        elemento = faenasa[j];
        //alert(elemento["idEstado"]);

        if (txtfaena == elemento["Nombre"]) {
            //alert('Elemento distinto');
            encfa = "Si";
        }


    }

    //alert('valor encontrado: ' + enc);

    if (encfa == "No") {
        //alert('No encontrado Faena');

        set('faenaRef', txtfaena);

        set('idfae', null);

    }
    else { set('faenaRef', txtfaena); }

    var idEquipo = get('idEquipoE');

   
    //alert('Codigo de Equipo ' + idEquipo);

    if (idEquipo == '' )
    {
        //set('idEquipoFinal', 0);
        var serieEquipo = get('SerieEquipo');

        //alert(serieEquipo);

        ////Se registra nuevo equipo

        if (serieEquipo != "") {

            set('idEquipoE', 0);

            var frmEquipo = document.getElementById("frmEquipo");

            var frmequi = new FormData(frmEquipo);

            fetchPostText("Falla/RegistrarEquipo", frmequi, function (res) {
                // alert('Lo que devuelve el store:');
                // alert(res);
                if (res != "0") {

                    set('idEquipoFinal', res);
                    //Registrar Falla//

                    var frm = new FormData(frmFalla);

                    fetchPostText("Falla/CrearFalla", frm, function (res) {

                        if (res != "0") {


                            for (var i = 0; i < adjuntos.length; i++) {

                                var url =
                                    "Falla/CrearAdjunto/?Nombre=" + adjuntos[i][0] + "&idTipoAdjunto=" + adjuntos[i][3] + "&idFalla=" + res + "&Comentario=" + adjuntos[i][2] + "&Ruta=" + adjuntos[i][4] + "&idUsrCreacion=1";



                                var raiz = document.getElementById("hdfOculto").value;
                                var urlAbsoluta = window.location.protocol + "//" +
                                    window.location.host + raiz + url;


                                fetch(urlAbsoluta)

                                    .then(res => {
                                        if (res.text() != "0") {


                                        }



                                    });


                            }



                            //alert('Inserto correctamente');
                            $('#exampleModalCenter').modal('hide');
                            listarFallaReportada();
                            LimpiarDatos("frmFalla");
                        }
                    });


                    /////////////////Fin del Registral Falla///////////
                }
            });


        }
        else
        {
            set('idEquipoFinal', 0);

            //alert('Llego al Habilitar Nueva Falla');

         
            var frm = new FormData(frmFalla);

            fetchPostText("Falla/CrearFalla", frm, function (res) {

                if (res != "0") {


                    for (var i = 0; i < adjuntos.length; i++) {

                        var url =
                            "Falla/CrearAdjunto/?Nombre=" + adjuntos[i][0] + "&idTipoAdjunto=" + adjuntos[i][3] + "&idFalla=" + res + "&Comentario=" + adjuntos[i][2] + "&Ruta=" + adjuntos[i][4] + "&idUsrCreacion=1";



                        var raiz = document.getElementById("hdfOculto").value;
                        var urlAbsoluta = window.location.protocol + "//" +
                            window.location.host + raiz + url;


                        fetch(urlAbsoluta)

                            .then(res => {
                                if (res.text() != "0") {


                                }



                            });


                    }



                    //alert('Inserto correctamente');
                    $('#exampleModalCenter').modal('hide');
                    listarFallaReportada();
                    LimpiarDatos("frmFalla");
                }
            });

        }

        //alert('Llega aqui y no hace nada');
    }

    else
    {
      
       //Se registra la falla y se le asocia el equipo ya existente
               

            /////////////////Registrar Falla ////////////////
        set('idEquipoFinal', idEquipo);

        var frm = new FormData(frmFalla);

        fetchPostText("Falla/CrearFalla", frm, function (res) {

            if (res != "0") {


                for (var i = 0; i < adjuntos.length; i++) {

                    var url =
                        "Falla/CrearAdjunto/?Nombre=" + adjuntos[i][0] + "&idTipoAdjunto=" + adjuntos[i][3] + "&idFalla=" + res + "&Comentario=" + adjuntos[i][2] + "&Ruta=" + adjuntos[i][4] + "&idUsrCreacion=1";



                    var raiz = document.getElementById("hdfOculto").value;
                    var urlAbsoluta = window.location.protocol + "//" +
                        window.location.host + raiz + url;


                    fetch(urlAbsoluta)

                        .then(res => {
                            if (res.text() != "0") {


                            }



                        });


                }



                //alert('Inserto correctamente');
                $('#exampleModalCenter').modal('hide');
                listarFallaReportada();
                LimpiarDatos("frmFalla");
            }
        });



        

    
    }

    




   

    //alert(frmFalla.titulo);







}


function AgregarAdjunto() {

    //var urlguardar = "Falla/CrearAdjunto";

   
    var frmAdj = document.getElementById("frmAdjunto");
    var frm = new FormData(frmAdj);

    var archivo = document.getElementById("filesm");

    //alert(archivo.files[0]);

    if (archivo.files[0] == undefined) {
        alert('Debe seleccionar un documento, caso contrario no se agregara el Adjunto');
        return;
    }
    else {
        UpLoadAdm();
    }



    var nombrearchivo = archivo.files[0].name;




    //var nombre = get("txtordenservicio");
    var idtipoadjunto = get("cboTipoAdjuntos");
    var idFalla = get("idFalla");
    var comentario = get("txtComentario");

    //var ruta = archivo.value;

    var ruta = "Adjuntos\\" + nombrearchivo;

    //var rutaarchivo = + nombrearchivo;



    // alert(ordenservicio);
    var url =
        "Falla/CrearAdjunto/?Nombre=" + nombrearchivo + "&idTipoAdjunto=" + idtipoadjunto + "&idFalla=" + idFalla + "&Comentario=" + comentario + "&Ruta=" + ruta + "&idUsrCreacion=1";

 
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;

    //alert(urlAbsoluta);

    fetch(urlAbsoluta)
        //.then(res => res.json())
        .then(res => {
            if (res.text() != "0")
            {
                //alert('Inserto el adjunto');
                listarAdjuntosxIdMod(idFalla);

            }


            //Configuracion del formulario

        });

      

   
   

    //fetchPostText("Falla/CrearAdjunto", frm, function (res) {
    //    alert('Lo que devuelve el store:');
    //    alert(res);
    //    if (res != "0") {
    //        alert('Inserto correctamente el adjunto');
           
    //        listarAdjuntosxId(16);
        
    //    }
    //});

}

function UpLoadAdm() {

    var fileUpload = $("#filesm").get(0);
    var files = fileUpload.files;

    // Create  a FormData object
    var fileData = new FormData();

    // if there are multiple files , loop through each files
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }

    // Adding more keys/values here if need
    fileData.append('Test', "Test Object values");

    $.ajax({
        url: '/Home/UploadFiles', //URL to upload files 
        type: "POST", //as we will be posting files and other method POST is used
        processData: false, //remember to set processData and ContentType to false, otherwise you may get an error
        contentType: false,
        data: fileData,
        success: function (result) {
            alert(result);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });

}

function UpLoad() {

    var fileUpload = $("#files").get(0);
    var files = fileUpload.files;

    // Create  a FormData object
    var fileData = new FormData();

    // if there are multiple files , loop through each files
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }

    // Adding more keys/values here if need
    fileData.append('Test', "Test Object values");

    $.ajax({
        url: '/Home/UploadFiles', //URL to upload files 
        type: "POST", //as we will be posting files and other method POST is used
        processData: false, //remember to set processData and ContentType to false, otherwise you may get an error
        contentType: false,
        data: fileData,
        success: function (result) {
            alert(result);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });


}


function AgregarAdjuntoM() {

    //var urlguardar = "Falla/CrearAdjunto";

    //alert('LLego al crear Adjunto M');
    var frmAdj = document.getElementById("frmAdjuntoM");
    var frm = new FormData(frmAdj);

    var archivo = document.getElementById("filesm");

    //alert(archivo.files[0]);

    if (archivo.files[0] == undefined) {
        alert('Debe seleccionar un documento, caso contrario no se agregara el Adjunto');
        return;
    }
    else {
        UploadM();
    }

    var nombrearchivo = archivo.files[0].name;

    

    //var nombre = get("txtordenservicio");
    var idtipoadjunto = get("cboTipoAdjuntoM");
    var idFalla = get("idFallaM");

    //var ruta = archivo.value;

    //var ruta = "C:\\Komatsu" + "\\" + nombrearchivo;
    var ruta = "Adjuntos\\" + nombrearchivo;

    //alert(idFalla);

    var comentario = get("txtComentarioM");

    // alert(ordenservicio);
    var url =
        "Falla/CrearAdjunto/?Nombre=" + nombrearchivo + "&idTipoAdjunto=" + idtipoadjunto + "&idFalla=" + idFalla + "&Comentario=" + comentario + "&Ruta=" + ruta + "&idUsrCreacion=1";


    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;

    //alert(urlAbsoluta);

    fetch(urlAbsoluta)
        //.then(res => res.json())
        .then(res => {
            if (res.text() != "0") {
                //alert('Inserto el adjunto en FallaModificar');
                listarAdjuntosxIdFR(idFalla);


                set("txtComentarioM", "");
                set("cboTipoAdjuntoM", 0);
                document.getElementById("filesm").files[0].name = "";
            }


            //Configuracion del formulario

        });






    //fetchPostText("Falla/CrearAdjunto", frm, function (res) {
    //    alert('Lo que devuelve el store:');
    //    alert(res);
    //    if (res != "0") {
    //        alert('Inserto correctamente el adjunto');

    //        listarAdjuntosxId(16);

    //    }
    //});

}


function UploadM() {

    var fileUpload = $("#filesm").get(0);
    var files = fileUpload.files;

    // Create  a FormData object
    var fileData = new FormData();

    // if there are multiple files , loop through each files
    for (var i = 0; i < files.length; i++) {
        fileData.append(files[i].name, files[i]);
    }

    // Adding more keys/values here if need
    fileData.append('Test', "Test Object values");

    $.ajax({
        url: '/Home/UploadFiles', //URL to upload files 
        type: "POST", //as we will be posting files and other method POST is used
        processData: false, //remember to set processData and ContentType to false, otherwise you may get an error
        contentType: false,
        data: fileData,
        success: function (result) {
            alert(result);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });


}






function TrasladarFalla() {


    var idFalla = get("idFallaM");

    //alert(idFalla);

    // alert(ordenservicio);
    var url =
        "Falla/TrasladarFalla/?idFalla=" + idFalla;


    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;

    //alert(urlAbsoluta);

    fetch(urlAbsoluta)
        //.then(res => res.json())
        .then(res => {
            if (res.text() != "0") {
                //alert('Trasalado el adjunto');
                $('#ModFalla').modal('hide');
                listarFallaReportada();

            }


            //Configuracion del formulario

        });



}


function llenarCombo(data,id,propiedadMostrar,propiedadId) {
    var contenido = ""
    var elemento;
    contenido+="<option value=''>--Seleccione--</option>"
    for (var j = 0; j < data.length; j++) {
        elemento = data[j];
        contenido +=
       "<option value='" + elemento[propiedadId] + "' >" + elemento[propiedadMostrar] + "</option>"
    } 

    contenido += "";
    document.getElementById(id).innerHTML = contenido;
}