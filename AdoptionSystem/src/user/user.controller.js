//Toda la logica
'user strict'

import User from './user.model.js'//Unico que puede ir en mayáscula
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'


export const test = (req, res) => {
    return res.send('Hello Word')
}

export const register = async (req, res) => {
    try {
        //Capturar la información del cliente
        let data = req.body
        console.log(data)
        //Encriptar las contraseñas
        data.password = await encrypt(data.password)
        //Asignar rol por defecto
        data.role = 'CLIENT' //si viene con otro valor o no viene se asigna a role cliente
        //Crear una instancia del modelo (schema)
        let user = new User(data)
        //Guardar la información 
        await user.save()
        //Respodo al usuario 
        return res.send({ message: 'Registered Succesfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error registering user', error })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar  la Informacion 
        let { username, password } = req.body
        //Validar que el usuario existe
        let user = await User.findOne({ username }) //username: 'lo que mande el usuario'
        //Verificar que la contraseña coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            //Responder (dar acceso)       loggedUser
            return res.send({message: `Welcome ${user.name}`, loggedUser, token })
        }
        return res.status(404).send({ message: 'Invalid credentials' })

    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Failed to Login' })
    }
}

export const update = async (req, res) => { //Usuarios logeados
    try {
        //Obtener el id del usuario
        let { id } = req.params
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si trae datos a actualizar
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data' })
        //Validar si tiene permisos (tokenización)
        //Actualizar en la  DB
        let updatedUser = await User.findOneAndUpdate(
            { _id: id }, //ObjectId <- hexadecimal (hora sys, vercion mongo, llave privada)
            data,
            { new: true } //Objeto de la DB ya actualizado
        )
        //Validar si se actualizo
        if (!updatedUser) return res.status(401).send({ message: 'User not found and not updated' })
        //Responder con el dato actualizado
        return res.send({message: 'Updated User', updatedUser})    
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message:`Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({ message: 'Error updating account' })
    }

}

export const deleteU = async(req, res)=>{
    try {
        //Obtener el id
        let {id} = req.params
        //Validar si esta logeado y es el mismo 
        //Eliminar (deleteOne / findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({_id: id})
        //Verificar que se eliminó
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not delete'})
        //Responder
        return res.send({message: `Account with username ${deletedUser.username} deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
