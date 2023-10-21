const express = require('express')
const user = express.Router();
const db = require('../config/database')
const jwt = require('jsonwebtoken')

user.post('/signin', async (req, res, next) => {
    const { user_name, user_mail, user_password } = req.body;

    if (user_name && user_mail && user_password) {
        let query = "INSERT INTO users (user_name, user_mail, user_password) ";
        query += `VALUES ('${user_name}', '${user_mail}', '${user_password}')`

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario insertado correctamente" })
        }
        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

user.post('/login', async (req, res, next) => {
    const { user_mail, user_password } = req.body
    const query = `SELECT * FROM users WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`
    const rows = await db.query(query)

    if (user_mail && user_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token })
        }
        else {
            return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" })
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })


})

//Muestra todos los usuarios pero no es tan necesario
// user.get('/all', async (req, res, next) => {
//     const users = await db.query("SELECT * FROM users")
//     return res.status(200).json({ code: 1, message: users })
// })


module.exports = user