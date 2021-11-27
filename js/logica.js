// Nombre de usuario, email y password
/**-----------------------------------Crear Usuarios----------------------------------------------------- */
//const urlbase='http://localhost:9090/api/user';
const urlbase='http://129.151.112.106:9090/api/user';
const crear = () => {

    const nombre = $('#txtNombre').val();
    const email = $('#txtEmail').val();
    const password = $('#txtPassword').val();
    const confirmar = $('#txtConfirmarClave').val();


/*--------------------                 VALIDACIONES PRINCIPALES                               ---------------*/
const payload = {
    name: nombre,
    email: email,
    password: password
};


    if(nombre !=null && email !=null && password !=null && email && email.indexOf("@") !=-1 && email.indexOf(".") !=-1){
        $.ajax({
            url: `${urlbase}/${email}`,
            type: "GET",
            success: function(result){
                if(result == true){
                    mostrarMensaje('Error', 'Ya existe un usuario registrado con ese correo', true);
                    clearInputs();
                    return false;
                } else {
                    $.ajax({
                        url: `${urlbase}/new`,
                        type: "POST",
                        dataType: 'json',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: JSON.stringify(payload),
                        statusCode: {
                            201: function () {
                                mostrarMensaje('Confirmacion', 'Usuario Creado Exitosamente');
                                window.location.href = 'index.html';
                            }
                        },
                    });               
                }

            }
        })
    }else {
        re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        if(nombre == "" ||
          email == "" ||
          password == ""||
          confirmar == ""
        ){
          alert("Todos los campos son obligatorios");
        }
        else if (!re.exec(email)){
          alert("Correo No valido");
          clearInputs();
          return false;
        }
      }
/* Validacion de si la clave y la confirmacion coinciden */
    if (password !== confirmar) {
        mostrarMensaje('Error', 'Las claves no coinciden', true);
        return;
    } else if (password.length < 6) {
        mostrarMensaje('Error', 'La clave debe tener minimo 6 caracteres', true);
        return;
    }


} 

const mostrarMensaje = (titulo, cuerpo, error) => {
    
    document.getElementById("titulomensaje").innerHTML = titulo;
    $("#cuerpomensaje").html(cuerpo);
    $("#myToast").removeClass();
    if (error) {
        $("#myToast").addClass("toast bg-danger")
    } else {
        $("#myToast").addClass("toast bg-primary")
    }

    $("#myToast").toast("show");
}

function clearInputs(){
    $("#txtEmail").val("");
    $("#txtNombre").val("");
    $("#txtPassword").val("");
    $("#txtConfirmarClave").val("");
  }

/*-------------------------Logica de Iniciar Sesion----------------------------*/
const iniciarSesion = () => {
    const loading = '<img src="imagenes/spinner.gif">';
    $("#loading").html(loading);

    /*Para que se vea el Git de logging */
    setTimeout(()=>{ //Recibe una funcion interna y llamamos un metodo autenticar, el 1000 son los ms
        autenticar();
    }, 1000);
}

const autenticar = ()=>{
    const email = $("#txtEmail").val();
    const password = $("#txtPassword").val();

    if (email.length === 0 || password.length === 0) {
        mostrarMensaje('Error', 'Debe escribir el Correo y la clave para ingresar', true);
        $("#loading").html("");
        return;
        }


    $.ajax({
        url: `${urlbase}/${email}/${password}`,
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            $("#loading").html("");
            console.log(respuesta);
            if (respuesta.id===null){
                mostrarMensaje('Error', 'Usuario y/o clave incorrectos', true);
            }else{
                mostrarMensaje('Confirmacion','Ingreso Correcto');

                setTimeout(()=>{
                   // window.location.href = 'menu.html';
                }, 1000);
                
            }
        },
        error: function (xhr, status) {
            $("#loading").html("");
            console.log(xhr);
            console.log(status);
            mostrarMensaje('Error', 'Error al validar', true);
        }
    });
}

