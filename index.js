//Dependences
const express = require('express')
const app = express();
const db = require('./config/database')

app.get("/", async (req, res, next) => {
    const rh = await db.query("SELECT * FROM empleados")
    res.status(200)
    res.send(rh)
})

app.get("/:name", async (req, res, next) => {
    const rh = await db.query("SELECT name FROM empleados")
    res.status(200)
    res.send(rh)
})

app.get("/:name/:id", async (req, res, next) => {
    const rh = await db.query("SELECT id FROM empleados")
    res.status(200)
    res.send(rh)
})
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});