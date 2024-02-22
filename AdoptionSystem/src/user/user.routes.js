//Todas las rutas

'use strict'

import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'
import {
    test,
    register,
    login,
    update,
    deleteU

} from './user.controller.js'

const api = express.Router()

//Middlewares

//Rol Admin

//Rol Cliente/Admin
api.get('/test', [validateJwt], [isAdmin], test)

api.put('/update/:id',[validateJwt], update)
api.delete('/delete/:id',[validateJwt], deleteU)

//Public Routes
api.post('/register', register)
api.post('/login', login)

export default api

//export const api <- Tengo si o si el nombre que esta en el archivo
//export default api / <- importar con otro nombre userRoutes