window.onload = function () {
    listarCampanias();
    listarCombo();
    listarComboAdjunto();


    //var idFalla = get("idFallaM");
    //listarAdjuntosxIdFR(idFalla);


    series = [];
    fetchGet("Falla/ListarSeriesEquiposC", function (data) {

        for (var j = 0; j < data.length; j++) {
            elemento = data[j];

            var obj = { idEquipo: elemento["idEquipo"], Serie: elemento["Serie"] };


            series.push(obj);

        }

    });



    const myForm = document.getElementById('frmAdjuntoCrear');
    const inpFile = document.getElementById('ArchivoC');

    myForm.addEventListener('submit', e => {
        e.preventDefault();

        const endpoint = 'Upload/UploadFile';
        const formData = new FormData();

        //alert('Llego Aqui');

        var raiz = document.getElementById("hdfOculto").value;
        var urlAbsoluta = window.location.protocol + "//" +
            window.location.host + raiz + endpoint;

        //alert(urlAbsoluta);

        console.log(inpFile.files);

        formData.append('ArchivoC', inpFile.files[0]);

        fetch(urlAbsoluta, {
            method: "post",
            body: formData,
            enctype: "multipart/form-data",
            dataType: "json"

        }).catch(console.error);


    });


}

var objetoConf;
var estadoanterior;
var equipos = [];
var series = [];


function listarCampanias() {
    objetoConf = {
        url: "Campania/listarCampanias/", id: "divTabla",
        cabeceras: ["IdCampaña", "Nro Campaña", "Tipo Campaña", "Grupo", "Grupo Modelo", "Fecha Inicio", "Fecha Termino", "Estado", "Acciones"],
        propiedades: ["idCampana", "numCampana", "TipoCampana", "Grupo", "GrupoModelo", "FechaInicio", "FechaFin", "Estado"],
        editar: true,
        eliminar: false,
        propiedadId: "idCampana"

    }
    pintar(objetoConf, null, null, 'FR')



}


function CargarNuevaFalla() {
    //alert('Entro al cargar Nueva Falla');

    CargarClientesAuto();

    LimpiarDatos("frmEquipo");

    LimpiarDatos("frmFalla");

    //    { idEstado: 1, Estado: "Creado" },
    //    { idEstado: 2, Estado: "Alo" },
    //    { idEstado: 3, Estado: "Gisela" }
    //];



    //alert(local_source);







}


function listarComboAdjunto() {
    fetchGet("Falla/listarTiposAdjuntos", function (data) {
        llenarCombo(data, "cboTipoAdjuntoM", "Nombre", "idTipoAdjunto")

    });

    fetchGet("Falla/listarTiposAdjuntos", function (data) {
        llenarCombo(data, "cboTipoAdjuntoC", "Nombre", "idTipoAdjunto")

    });

    //alert('Adjutnos Limpiar');

    document.getElementById("divTablaAdjuntosCrear").innerHTML = "";

    /*fetchGet("Falla/listarTiposAdjuntos", function (data) {
        llenarCombo(data, "cboTipoAdjuntos", "Nombre", "idTipoAdjunto")

    });*/
    ///**************************************************////

}


function CerrarNuevaFalla() {
    document.getElementById("divTablaAdjuntosCrear").innerHTML = "";
    $('#exampleModalCenter').modal('hide');

    document.getElementById("cboEquipo").disabled = false;
    document.getElementById("cboModelo").disabled = false;

    document.getElementById("faena").disabled = false;
    document.getElementById("cliente").disabled = false;


}


function listarCombo() {
    fetchGet("FallaReportada/listarEstados", function (data) {
        llenarCombo(data, "cboEstadoFalla", "Estado", "idEstado")

    });
    ///**************************************************////

    //////////////*************Equipo*****************/////


    fetchGet("Falla/listarTiposEquipo", function (data) {
        llenarCombo(data, "cboTipoEquipoE", "Nombre", "idTipoEquipo")

    });




    fetchGet("Falla/listarClientes", function (data) {
        llenarCombo(data, "cboClienteE", "Nombre", "idCliente")

    });


    fetchGet("Falla/listarFaenas", function (data) {
        llenarCombo(data, "cboFaenaE", "Nombre", "idFaena")

    });


    fetchGet("Falla/listarModelos", function (data) {
        llenarCombo(data, "cboModeloE", "Nombre", "idModelo")

    });



    fetchGet("Falla/listarTiposEquipo", function (data) {
        llenarCombo(data, "cboTipoEquipoEM", "Nombre", "idTipoEquipo")

    });


    fetchGet("Falla/listarClientes", function (data) {
        llenarCombo(data, "cboClienteEM", "Nombre", "idCliente")

    });


    fetchGet("Falla/listarFaenas", function (data) {
        llenarCombo(data, "cboFaenaEM", "Nombre", "idFaena")

    });


    fetchGet("Falla/listarModelos", function (data) {
        llenarCombo(data, "cboModeloEM", "Nombre", "idModelo")

    });



    /////////////////////////////

    fetchGet("FallaReportada/listarEstados", function (data) {
        llenarCombo(data, "cboEstado", "Estado", "idEstado")

    });

    fetchGet("FallaReportada/listarEstados", function (data) {
        llenarCombo(data, "cboEstadoL", "Estado", "idEstado")

    });

    fetchGet("Falla/listarSolicitantes", function (data) {
        llenarCombo(data, "cboSolicitante", "nombre", "idUsuario")

    });

    fetchGet("Falla/listarGrupos", function (data) {
        llenarCombo(data, "cboGrupo", "Nombre", "idGrupo")

    });

    fetchGet("Falla/listarDivisiones", function (data) {
        llenarCombo(data, "cboDivision", "Nombre", "idDivision")

    });


    //fetchGet("Falla/ListarSeriesEquipos", function (data) {
    //   // llenarCombo(data, "cboDivision", "Nombre", "idDivision")

    //});

    fetchGet("Falla/listarTiposEquipo", function (data) {
        llenarCombo(data, "cboEquipo", "Nombre", "idTipoEquipo")

    });

    fetchGet("Falla/listarModelos", function (data) {
        llenarCombo(data, "cboModelo", "Nombre", "idModelo")

    });

    fetchGet("Falla/listarClientes", function (data) {
        llenarCombo(data, "cboCliente", "Nombre", "idCliente")

    });

    fetchGet("Falla/listarFaenas", function (data) {
        llenarCombo(data, "cboFaena", "Nombre", "idFaena")

    });

    ///////----------------------------------------------
    fetchGet("Falla/listarSolicitantes", function (data) {
        llenarCombo(data, "cboSolicitanteM", "nombre", "idUsuario")

    });

    fetchGet("Falla/listarGrupos", function (data) {
        llenarCombo(data, "cboGrupoM", "Nombre", "idGrupo")

    });

    fetchGet("Falla/listarDivisiones", function (data) {
        llenarCombo(data, "cboDivisionM", "Nombre", "idDivision")

    });

    fetchGet("Falla/listarTiposEquipo", function (data) {
        llenarCombo(data, "cboEquipoM", "Nombre", "idTipoEquipo")

    });

    fetchGet("Falla/listarModelos", function (data) {
        llenarCombo(data, "cboModeloM", "Nombre", "idModelo")

    });

    fetchGet("Falla/listarClientes", function (data) {
        llenarCombo(data, "cboClienteM", "Nombre", "idCliente")

    });

    fetchGet("Falla/listarFaenas", function (data) {
        llenarCombo(data, "cboFaenaM", "Nombre", "idFaena")

    });


}

function BuscarFalla() {
    var ordenservicio = get("txtordenservicio");
    var fechainicio = get("datepicker");
    var estado = get("cboEstadoFalla");
    var fechafin = get("datepicker1");

    // alert(ordenservicio);
    objetoConf.url =
        "FallaReportada/listarFallaReportada/?fechainicio=" + fechainicio + "&fechafin=" + fechafin + "&numOS=" + ordenservicio + "&Estado=" + estado + "&idUsrCreacion=0";


    pintar(objetoConf, null, null, 'FR')
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

    CargarClientesAutoM();

    //alert('entro a EditarFalla version 111111.0');
    recuperarGenerico("Falla/recuperarFalla/?id=" + id,
        "frmModFalla");

    recuperarEquipo("Falla/RecuperarEquipoxIdFalla/?IdFalla=" + id,
        "frmEquipoMod");

    //var estado = get('cboEstado');

    //alert('Estado Cargado: ' + estado);

    //set('cboEstadoL', estado);

    //alert('Pintar Adjuntos');

    HabilitaEquipo();

    listarAdjuntosxIdFR(id);
    listarHistorialEstados(id);

    //estadoanterior = get("cboEstado");

    //alert('estado anterior');
    //alert(estadoanterior);



}

function enterKeyPressed(event) {
    if (event.keyCode == 13) {

        var serie = get('SerieEquipo');

        //alert('Esta es la serie del Equipo:' + serie);

        recuperarEquipo("Falla/RecuperarEquipoxSerie/?Serie=" + serie,
            "frmEquipo");

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


function BuscaEquipoxSerie(event) {
    if (event.keyCode == 13) {

        var serie = get('SerieEquipoM');

        //alert('Esta es la serie del Equipo:' + serie);

        LimpiarDatos('frmEquipoMod');

        set('SerieEquipoM', serie);

        recuperarEquipoMod("Falla/RecuperarEquipoxSerieMod/?Serie=" + serie,
            "frmEquipoMod");

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


function listarAdjuntosxIdFR(IdFalla) {
    objetoConf = {
        url: "Falla/listarAdjuntoxIdFalla/?idFalla=" + IdFalla, id: "divTablaAdjuntosFR",
        cabeceras: ["Nombre Archivo", "Tipo Archivo", "Comentario", "Ruta"],
        propiedades: ["Nombre", "TipoAdjunto", "Comentario", "Ruta"],
        editar: false,
        eliminar: true,
        propiedadId: "idAdjunto"

    }
    pintarAdjuntos(objetoConf)



}


function listarHistorialEstadosCampania(IdFalla) {
    objetoConf = {
        url: "Falla/listarHistorialEstados/?idFalla=" + IdFalla, id: "divTablaHistEst",
        cabeceras: ["Estado", "Fecha Actualización", "Comentario"],
        propiedades: ["Estado", "FechaCreacion", "Comentario"],
        editar: false,
        eliminar: false,
        propiedadId: "idEstadoHistorial"




    }
    pintar(objetoConf, null, null, 'FR')



}

function BuscaEquipoxSerieMod(event) {

    //alert('Llego al Evento');

    //alert(event.keyCode);
    var encontrado = 'N'

    if (event.keyCode == 13) {

        var serie = get('txtnumserieM');

        //alert('Esta es la serie del Equipo:' + serie);

        for (var j = 0; j < series.length; j++) {
            elemento = series[j];

            if (elemento["Serie"] == serie) {
                encontrado = "S";
            }
        }

        if (encontrado == "N") {
            document.getElementById("cboEquipoM").disabled = false;
            document.getElementById("cboModeloM").disabled = false;

            document.getElementById("faenam").disabled = false;
            document.getElementById("clientem").disabled = false;


        }


        //LimpiarDatos('frmEquipoModA');


        //var uno = document.getElementById('btnEquipo');

        //uno.innerText = 'Asignar Equipo';


        //set('SerieEquipoM', serie);

        //recuperarEquipoMod("Falla/RecuperarEquipoxSerieMod/?Serie=" + serie,
        //    "frmEquipoModA");

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




function BuscaEquipoxSerie(event) {

    //alert('Llego al Evento');

    //alert(event.keyCode);
    var encontrado = 'N'

    if (event.keyCode == 13) {

        var serie = get('txtnumserie');

        //alert('Esta es la serie del Equipo:' + serie);

        for (var j = 0; j < series.length; j++) {
            elemento = series[j];

            if (elemento["Serie"] == serie) {
                encontrado = "S";
            }
        }

        if (encontrado == "N") {
            document.getElementById("cboEquipo").disabled = false;
            document.getElementById("cboModelo").disabled = false;

            document.getElementById("faena").disabled = false;
            document.getElementById("cliente").disabled = false;


        }


        //LimpiarDatos('frmEquipoModA');


        //var uno = document.getElementById('btnEquipo');

        //uno.innerText = 'Asignar Equipo';


        //set('SerieEquipoM', serie);

        //recuperarEquipoMod("Falla/RecuperarEquipoxSerieMod/?Serie=" + serie,
        //    "frmEquipoModA");

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


function HabilitaEquipo() {

    //alert('Llego al Evento');

    //alert(event.keyCode);
    var encontrado = 'S'


    var serie = get('txtnumserieM');

    //alert('Esta es la serie del Equipo:' + serie);

    for (var j = 0; j < series.length; j++) {
        elemento = series[j];

        if (elemento["Serie"] != serie) {
            encontrado = "N";
        }
    }

    if (encontrado == "N") {
        document.getElementById("cboEquipoM").disabled = false;
        document.getElementById("cboModeloM").disabled = false;

        document.getElementById("faenam").disabled = false;
        document.getElementById("clientem").disabled = false;

    }
    else {
        document.getElementById("cboEquipoM").disabled = true;
        document.getElementById("cboModeloM").disabled = true;

        document.getElementById("faenam").disabled = true;
        document.getElementById("clientem").disabled = true;
    }


    //LimpiarDatos('frmEquipoModA');


    //var uno = document.getElementById('btnEquipo');

    //uno.innerText = 'Asignar Equipo';


    //set('SerieEquipoM', serie);

    //recuperarEquipoMod("Falla/RecuperarEquipoxSerieMod/?Serie=" + serie,
    //    "frmEquipoModA");

    //var idEquipo;

    //   idEquipo = get('idEquipo');

    //alert('Codigo de Equipo ' + idEquipo);


    //alert("Enter key is pressed");
    //return true;


}


function Eliminar(id) {

    //alert('Llego al eliminar FallaReportada ' + id);

    var idFalla = get("idFallaM");

    //alert(idFalla);

    Confirmacion("Desea eliminar el adjunto?", "Confirmar eliminación", function (res) {

        fetchGetText("Falla/EliminarAdjunto/?idAdjunto=" + id, function (rpta) {
            if (rpta == "1") {
                Correcto("Se elimino correctamente");
                listarAdjuntosxIdFR(idFalla);
            }
        })
    })
}
