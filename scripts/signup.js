window.addEventListener('load', function() {
    /* ---------------------- obtenemos variables globales ---------------------- */


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        // Capturamos los datos del formulario
        // Llamamos a la API en realizarRegister
        // Si el registro se hizo ok, guardamos el token en 'localStorage'
        event.preventDefault()

        let data = {
            firstName: document.querySelector('#inputNombre').value,
            lastName: document.querySelector('#inputApellido').value,
            email: document.querySelector('#inputEmail').value,
            password: document.querySelector('#inputPassword').value,
          }

          realizarRegister(data)

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(data) {

        let settings = {
            "method": "POST",
            "headers": {
              "content-type": "application/json"
            },
            "body": JSON.stringify(data)
        }

        Url = "https://ctd-todo-api.herokuapp.com/v1/users"
        fetch(Url, settings)

        .then(function(respuesta){
            if (respuesta.status == 400 || respuesta.status == 404) {
            alert("El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto")
            }
            if (respuesta.status == 500) {
            alert("El sistema esta caido, intente mas tarde")
            }
            if (respuesta.status == 201) {
            return respuesta.json()
            }
        })

        .then(function(informacion){
            localStorage.setItem(data.email, JSON.stringify(informacion));
            console.table(localStorage)
        })
        .catch(function(e){
        console.log("Error! " + e)
        })

    };



    document.querySelector('#inputNombre').addEventListener('keypress', (e) => {

        if (validarNombre(e.key) == false) {
            // const error = mostrarMensajeEnElemento('El campo nombre no se admiten números.');
            // document.querySelector(".form-header").after(error);

            e.target.placeholder = "El campo nombre no se admiten números."

            e.preventDefault();
        }
    });

    document.querySelector('#inputApellido').addEventListener('keypress', (e) => {
        if (validarNombre(e.key) == false) {
            // const error = mostrarMensajeEnElemento('El campo apellido no se admiten números.');
            // e.target.parentNode.appendChild(error);
            e.target.placeholder = "El campo apellido no se admiten números."
            e.preventDefault();
        }
    });

    document.querySelector('#inputEmail').addEventListener('blur', (e) => {
        if (validarEmail(e.target.value) == false) {
            // TODO - falta quitar el mensaje cuando esta bien
           // const error = mostrarMensajeEnElemento('El campo email no tiene el formato correcto.');
           // e.target.parentNode.appendChild(error);
            e.target.value = ""
            e.target.placeholder = "El campo email no tiene el formato correcto."
            e.preventDefault();
        }
    });

    function validatePass(e) {
        if (validarContrasenia(e.target.value) == false) {
            // const error =
            //     mostrarMensajeEnElemento('La contraseña debe tener mas de 3 dígitos y no puede contener " " ni  "-".');
            // e.target.parentNode.appendChild(error);
            e.target.value = ""
            e.target.focus();

            e.target.placeholder = "La contraseña debe tener mas de 3 dígitos y no puede contener ' ' ni '_' ."

            e.preventDefault();
        }
    }

    const pass1 = document.querySelector('#inputPassword');
    const pass2 = document.querySelector('#inputPasswordRepetida');

    pass1.addEventListener('blur', (e) => {
        validatePass(e);
    });

    pass2.addEventListener('focus', (e) => {
        if (pass1.value == ''){
            e.target.placeholder = "Falta informacion en contraseña";
            pass1.focus();

        } else {

            pass2.addEventListener('blur', (e) => {
                if (pass2.value == pass1.value) {
                    console.log("contraeñas coiciden")

                }
                else {
                    console.log("contraseña no es igual")
                    e.target.value = ""
                    e.target.placeholder = "Contraseña no es igual";
                    pass1.focus();
                }
            });
        }
    });

    // pass1.addEventListener('blur', (e) => {
    //     if (validarMinimoContraseña(pass1.value) == false && compararContrasenias(pass1.value, pass2.value) == false) {
    //         const error = mostrarMensajeEnElemento('otra La contraseñas debe tener un mínimo de 3 dígitos y deben coincidir.');
    //         e.target.parentNode.appendChild(error);
    //     }
    // });

    // pass2.addEventListener('blur', (e) => {
    //     if (validarMinimoContraseña(pass2.value) == false && compararContrasenias(pass1.value, pass2.value) == false) {
    //         const error = mostrarMensajeEnElemento('La contraseñas debe tener un mínimo de 3 dígitos y deben coincidir.');
    //         e.target.parentNode.appendChild(error);
    //     }
    // });

});





