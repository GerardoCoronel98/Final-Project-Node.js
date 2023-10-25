const express = require('express')
const empleados = express.Router();
const db = require('../config/database')

empleados.post('/', async (req, res, next) => {
    const { name, last_name, phone, email, address } = req.body;

    if (name && last_name && phone && email && address) {
        let query = "INSERT INTO empleados (name, last_name, phone, email, address) "
        query += `VALUES ('${name}', '${last_name}', '${phone}', '${email}', '${address}')`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" })
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    console.log(req.body)
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
});

empleados.delete('/:id([0-9]{1,3})', async (req, res, next) => {

    const query = `DELETE FROM empleados WHERE id=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado" })
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" })
});

empleados.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const { name, last_name, phone, email, address } = req.body;

    if (name && last_name && phone && email && address) {
        let query = `UPDATE empleados SET name='${name}', last_name='${last_name}',`;
        query += `phone='${phone}', email='${email}', address='${address}' WHERE id=${req.params.id};`;
        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" })
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })

})

empleados.patch('/:id([0-9]{1,3})', async (req, res, next) => {

    if (req.body.name) {
        let query = `UPDATE empleados SET name='${req.body.name}' WHERE id=${req.params.id},`
        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" })
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" })
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" })
})

empleados.get('/', async (req, res, next) => {
    const emp = await db.query("SELECT * FROM empleados")
    res.json({
        data: emp
    })
});

/*Agregar al "if" que de como límite la cantidad de usuarios que esten en el sistema
//por lo que debemos definir una variable que contenga a tiempo real los empleados
del sistema
*/
empleados.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id
    if (id >= 1 && id <= 1000) {
        const emp = await db.query("SELECT * FROM empleados WHERE id=" + id + ";")
        return res.status(200).json({ code: 1, message: emp })
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado" })
});

empleados.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name
    const emp = await db.query("SELECT * FROM empleados WHERE name='" + name + "'")
    if (emp.length > 0) {
        return res.status(200).json({ code: 1, message: emp })
    }
    return res.status(404).send({ code: 404, message: "Empleado no encontrado" })
});

module.exports = empleados;