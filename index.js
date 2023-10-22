//Dependences
const morgan = require('morgan')
const express = require('express')
const app = express();
//Routers
const empleados = require('./routes/empleados')
const user = require('./routes/users')
//Middleware
const auth = require('./middleware/auth')
const notFound = require('./middleware/notFound')
const index = require('./middleware/index')
const cors = require('./middleware/cors')

app.use(cors)
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*Mensaje de bienvenida*/
app.get('/', index)
/*Acceso al usuario */
app.use("/user", user)
/*Verificación de usuario, filtro para no acceder a la base de datos */
app.use(auth)
/*Base de datos de empleados */
app.use("/rhnode", empleados)
/*Filtro de error por url */
app.use(notFound)
//Server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});