window.onload = init;

// Función signup
function init() {
    document.querySelector('.btn-primary').addEventListener('click', signup);

    if (!localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', login), {
        }
    } else {
        window.location.href = "employees-b.html"
    }
}

//Función login
function login() {
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(function (res) {
        if (res.data.code == 200) {
            localStorage.setItem("token", res.data.message)
            window.location.href = "employees-b.html";
        } else {
            alert("Usario y/o contraseña incorrectos")
        }
    }).catch(function (err) {
        console.log(err)
        alert("Campos incompletos")
    })
}

//Funcio´n signup
function signup() {
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-sign-mail').value;
    var pass = document.getElementById('input-sign-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(function (res) {
        if (res.data.code == 201) {
            console.log(res);
            alert("¡Registro exitoso!");
        } else {
            alert("Error al registrar usuario.");
        }
    }).catch(function (err) {
        console.log(err);
        alert("Campos incompletos");
    });
}



