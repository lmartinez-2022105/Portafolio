'user strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async (req, res, next) => {
    try {
        //Obtener llave de acceso del token
        let secretKey = process.env.SECRET_KEY
        //Obtener el tokende los headers
        let { token } = req.headers
        //Verificar si viene el token
        if (!token) return res.status(401).send({ message: 'Unauthorized' })
        //Obtener el uid que envio el usuario
        let { uid } = jwt.verify(token, secretKey)
        //Validar si el usuario aun existe en la DB
        let user = await User.findOne({ _id: uid })
        if (!user) return res.status(404).send({ message: 'User not Found - Unauthorized' })
        //Ok para que continue  
        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).send({ message: 'Invalid token or expired' })
    }
}

export const isAdmin = async(req, res, next)=>{
    try {
        let {role, username} = req.user
        if(!role || role !== 'ADMIN') return res.status(403).send({message: `You dont have acces | username ${username}`})
        next
    } catch (error) {
        console.error(error)
        return res.status(401).send({message: 'Error verification role'})
    }
}