'use strict'

import {Router} from "express"
import { addAnimal, deleteAnimal, updateAnimal, get, search } from "./animal.controller.js"
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

api.post('/add', [validateJwt, isAdmin], addAnimal)
api.get('/get', get)
api.put('/updateAnimal/:id',[validateJwt, isAdmin], updateAnimal)
api.delete('/deleteAnimal/:id',[validateJwt, isAdmin], deleteAnimal)
api.post('/search', search)

export default api