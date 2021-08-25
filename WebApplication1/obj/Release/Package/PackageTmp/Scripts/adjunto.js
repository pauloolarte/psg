window.onload = function () {
    listarAdjuntosxId(16);
    listarComboAdjunto();
}
var objetoConf;


function listarComboAdjunto() {
    fetchGet("Falla/listarTiposAdjuntos", function (data) {
        llenarCombo(data, "cboTipoAdjunto", "Nombre", "idTipoAdjunto")

    });
    ///**************************************************////

}

//function AgregarAdjunto() {
//    var ordenservicio = get("txtordenservicio");
//    var fechainicio = get("datepicker");
//    var estado = get("cboEstadoFalla");
//    var fechafin = get("datepicker1");

//    // alert(ordenservicio);
//    objetoConf.url =
//        "Falla/listarAdminFallas/?fechainicio=" + fechainicio + "&fechafin=" + fechafin + "&numOS=" + ordenservicio + "&Estado=" + estado + "&idUsrCreacion=0";


//    pintar(objetoConf)
//    //alert(nombretipohabitacion)
//}

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

    //alert('entro a Editar AdminFalla');
    recuperarGenerico("Falla/recuperarFalla/?id=" + id,
        "frmModFallaAdmin");

}


function Eliminar(id) {
    Confirmacion("Desea eliminar el tipo habitacion?", "Confirmar eliminaciòn", function (res) {

        fetchGetText("TipoHabitacion/eliminarTipoHabitacion/?id=" + id, function (rpta) {
            if (rpta == "1") {
                Correcto("Se elimino correctamente");
                listarTipoHabitacion();
            }
        })
    })
}
