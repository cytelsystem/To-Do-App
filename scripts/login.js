window.addEventListener('load', function() {
    /* ---------------------- obtenemos variables globales ---------------------- */





    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
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

          Url = "https://ctd-todo-api.herokuapp.com/v1/users/login"
          fetch(Url, settings)

          .then(function(respuesta){
              
            return respuesta.json()

          })

          .then(function(informacion){
            console.log("informacion que retorna" + " " + informacion);

            if (informacion == "El usuario ya se encuentra registrado") {
                alert("El usuario ya se encuentra registrado")

            } else {
                localStorage.setItem(data.email, JSON.stringify(informacion));
                console.table(localStorage)
            }


          })
          .catch(function(e){
            console.log("Error! " + e)
           })







    };


});