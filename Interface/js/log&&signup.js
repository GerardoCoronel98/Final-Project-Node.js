window.onload = init;

//Función signup
function init() {
    document.querySelector('.btn-primary').addEventListener('click', signup), function () {
    }
}

function signup() {
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-sign-mail').value;
    var pass = document.getElementById('input-sign-password').value;
    console.log(name, mail, pass)

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(function (res) {
        console.log(res)
        alert("¡Registro exitoso!")
    }).catch(function (err) {
        console.log(err)
        alert("Campos incompletos")
    })
}

//Función login
function init() {
    document.querySelector('.btn-secondary').addEventListener('click', login), function () {
    }
}

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
        } else {
            alert("Usario y/o contraseña incorrectos")
        }
    }).catch(function (err) {
        console.log(err)
        alert("Campos incompletos")
    })
}