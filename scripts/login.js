window.addEventListener('load', function() {
    /* ---------------------- obtenemos variables globales ---------------------- */

    const urlBase = "https://ctd-todo-api.herokuapp.com/v1/"





    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */

    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {

        event.preventDefault()

        let dataLogin = {
            email: document.querySelector('#inputEmail').value,
            password: document.querySelector('#inputPassword').value,
          }

          realizarLogin(dataLogin)


    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
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
            if (respuesta.status == 400 || respuesta.status == 404) {
              alert("Credenciales invalidas")
            }
            if (respuesta.status == 500) {
              alert("El sistema esta caido, intente mas tarde")
            }
            if (respuesta.status == 201) {
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