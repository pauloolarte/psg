window.onload = function () {
   // alert('Lee mis cambios');
    listarAdminFallas();
    listarComboAdminFallas();
    listarComboAdjuntos();

    ////////Vista Modificar Falla///////
    //listarComboModFallas();
    //listarComboAdjuntosMod();

    //alert('Carga los Adjuntos x Falla');
   // var idFalla = get("idFalla");
  //  listarAdjuntosxId(idFalla);


}
var objetoConf;
var IdFallaSelect;

var datatipoequipo = [];
var datacliente = [];

function listarAdminFallas() {
    objetoConf = {
        url: "Falla/listarAdminFallas/?fechainicio=&fechafin=&numOS=&Estado=&idUsrCreacion=0", id: "divTabla",
        cabeceras: ["IdFalla", "Titulo", "Tipo Equipo", "Modelo", "Orden Servicio", "Fecha Creacion", "Cliente", "Estado"],
        propiedades: ["idFalla", "titulo", "TipoEquipo", "Modelo", "OrdenServicio", "FechaCreacion", "Cliente", "Estado"],
        editar: true,
        eliminar: false,
        propiedadId: "idFalla"

    }
    pintar(objetoConf, null, null,'AF')



}


function listarAdjuntosxId(IdFalla) {
    objetoConf = {
        url: "Falla/listarAdjuntoxIdFalla/?idFalla=" + IdFalla, id: "divTablaAdjuntos",
        cabeceras: ["Nombre Archivo", "Tipo Archivo", "Comentario","Ruta"],
        propiedades: ["Nombre", "TipoAdjunto", "Comentario","Ruta"],
        editar: false,
        eliminar: true,
        propiedadId: "idAdjunto"

    }
    pintarAdjuntos(objetoConf)



}



function listarComboAdjuntos() {
    fetchGet("Falla/listarTiposAdjuntos", function (data) {
        llenarCombo(data, "cboTipoAdjuntos", "Nombre", "idTipoAdjunto")

    });
    ///**************************************************////

}


function listarComboAdminFallas() {
    fetchGet("Falla/listarEstadosAdminFallas", function (data) {
        llenarCombo(data, "cboEstadoFalla", "Estado", "idEstado")

    });
    ///**************************************************////

    fetchGet("Falla/listarEstadosAdminFallas", function (data) {
        llenarCombo(data, "cboEstado", "Estado", "idEstado")

    });

    fetchGet("Falla/listarEstadosAdminFallas", function (data) {
        llenarCombo(data, "cboEstadoAdm", "Estado", "idEstado")

    });

    //////////////////////Equipo////////////////////////

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
        //datatipoequipo = data;

        datatipoequipo = [];
        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = { idTipoEquipo: elemento["idTipoEquipo"], Nombre: elemento["Nombre"] };

            datatipoequipo.push(obj);

        }

        llenarCombo(data, "cboEquipoM", "Nombre", "idTipoEquipo");

    });

    fetchGet("Falla/listarModelos", function (data) {
        llenarCombo(data, "cboModeloM", "Nombre", "idModelo")

    });

    fetchGet("Falla/listarClientes", function (data) {

        datacliente = [];
        for (var j = 0; j < data.length; j++) {
            elemento = data[j];
            //alert(elemento["idEstado"]);

            var obj = { idCliente: elemento["idCliente"], Nombre: elemento["Nombre"] };



            datacliente.push(obj);

        }

       
        llenarCombo(data, "cboClienteM", "Nombre", "idCliente");

    });

    fetchGet("Falla/listarFaenas", function (data) {
        llenarCombo(data, "cboFaenaM", "Nombre", "idFaena")

    });

    ////////////////FallaAdmin//////////////

    fetchGet("Falla/listarIngGarantias", function (data) {
        llenarCombo(data, "cboIngGarantia", "nombre", "idUsuario")

    });

    fetchGet("Falla/listarResponsablePSG", function (data) {
        llenarCombo(data, "cboResponsablePSG", "nombre", "idUsuario")

    });

    fetchGet("Falla/listarFabricas", function (data) {
        llenarCombo(data, "cboFabrica", "Nombre", "idFabrica")

    });

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


    pintar(objetoConf,null,null,'AF')
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

    //alert(id);

    //setN('idFallaS', id);

    //IdFallaSelect = id;

    //var idFalla = get('idFallaS');

    //alert('idfalla:' + idFalla);

    localStorage.setItem('IdFallaSelect', id);


    //localStorage.setItem("names", JSON.stringify(datatipoequipo));

  

    //localStorage.setItem('datatipoequipo', );


   // localStorage.setItem('datacliente', datacliente);



    var url = "Falla/ModificarFalla"

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" +
        window.location.host + raiz + url;
    //// alert(urlAbsoluta)

    window.location.replace(urlAbsoluta);


    //alert('entro a Editar AdminFalla');
    //recuperarGenerico("Falla/recuperarFalla/?id=" + id,
    //    "frmModFallaAdmin");

    //alert('Llego al Generico Falla');

    //recuperarGenericoFalla("Falla/recuperarFalla/?id=" + id,
    //    "frmModFallaAdmin");


    //recuperarEquipo("Falla/RecuperarEquipoxIdFalla/?IdFalla=" + id,
    //    "frmEquipoModA");


    //alert('Pintar Adjuntos');
    //set('Comentario',"Comentario");


    //listarAdjuntosxId(id);
    //alert('Historial de Estados');
   // listarHistorialEstadosM(id);

   

    //window.location.href = "http://stackoverflow.com";

    //var raiz = document.getElementById("hdfOculto").value;
    //var urlAbsoluta = window.location.protocol + "//" +
    //    window.location.host + raiz + url;
    //// alert(urlAbsoluta)
    ////Controles//accion
    //fetch(urlAbsoluta)
    //    .then(res => { });



}


//function listarHistorialEstadosM(IdFalla) {
//    objetoConf = {
//        url: "Falla/listarHistorialEstados/?idFalla=" + IdFalla, id: "divTablaHistEstM",
//        cabeceras: ["Estado", "Fecha Actualización", "Comentario"],
//        propiedades: ["Estado", "FechaCreacion", "Comentario"],
//        editar: false,
//        eliminar: false,
//        propiedadId: "idEstadoHistorial"




//    }

//    //alert('Llego al listarHistoreio');
//    pintar(objetoConf,null,null,'FR')

//}


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


function Eliminar(id) {

   
    //alert('Llego al eliminar FallaAdmin ' + id);

    var idFalla = get("idFallaG");

    //alert(idFalla);

    Confirmacion("Desea eliminar el adjunto?", "Confirmar eliminación", function (res) {

        fetchGetText("Falla/EliminarAdjunto/?idAdjunto=" + id, function (rpta) {
            if (rpta == "1") {
                Correcto("Se elimino correctamente");
                listarAdjuntosxId(idFalla);
            }
        })
    })
}
