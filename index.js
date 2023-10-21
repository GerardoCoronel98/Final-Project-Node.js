//Dependences
const morgan = require('morgan')
const express = require('express')
const app = express();
//routes
const empleados = require('./routes/empleados')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res, next) => {
    return res.status(200).json({ code: 1, message: "Bienvenidos a RH de Node.js" })
})
app.use("/rhnode", empleados)

app.use((req, res, next) => {
    return res.status(404).json({ code: 404, message: "URL no encontrada" })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});