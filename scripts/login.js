window.addEventListener('load', function() {
    /* ---------------------- obtenemos variables globales ---------------------- */

    const urlBase = "https://ctd-todo-api.herokuapp.com/v1/"
    const inputEmail = document.querySelector('#inputEmail')
    const password = document.querySelector('#inputPassword')





    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */

    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {

        event.preventDefault()

        let dataLogin = {
            email: inputEmail.value,
            password: password.value,
          }

          realizarLogin(dataLogin)

    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */

    inputEmail.addEventListener('blur', (e) => {
      if (validarEmail(e.target.value) == false) {
          e.target.value = ""
          e.target.placeholder = "El campo email no tiene el formato correcto."
          e.preventDefault();
      }
    });

    password.addEventListener('focus', (e) => {
      if (inputEmail.value == "") {
        inputEmail.focus();
      }
    });



    function realizarLogin(dataLogin) {

        let settings = {
            "method": "POST",
            "headers": {
              "content-type": "application/json"
            },
            "body": JSON.stringify(dataLogin)
          }

          Url = urlBase + "users/login"
          fetch(Url, settings)

          .then(function(respuesta){
            if (respuesta.status == 400) {
              alert("Contraseña incorrecta")
              event.preventDefault()
            } else if (respuesta.status == 404){
              alert("El usuario no existe")
              event.preventDefault()
            } else if (respuesta.status == 500) {
              alert("El sistema esta caido, intente mas tarde")
              event.preventDefault()
            } else {
              return respuesta.json()
            }
          })

          .then(function(informacion){
                localStorage.setItem(dataLogin.email, JSON.stringify(informacion));
                console.table(localStorage)
                alert("login correcto")
          })
          .catch(function(e){
            console.log("Error! " + e)
           })

    };

});