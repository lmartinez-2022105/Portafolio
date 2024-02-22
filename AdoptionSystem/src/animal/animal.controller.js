'use strict'
import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'
import Animal from './animal.model.js'

export const addAnimal = async (req, res) => {
    try {
        //Capturar los datos del animal
        let data = req.body
        //Validar que el keeper exista
        let user = await User.findOne({_id: data.keeper})
        if(!user) return res.status(404).send({message: 'Keeper not found'})
        //Crear instancia del model
        let animal = new Animal(data)
        //Guardar datos
        await animal.save()
        //Responder al admin
        return res.send({ message: 'The animal was registered succesfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error registering an animal',error})
    }
}

export const get = async(req, res)=> {
    try {
        let animals = await Animal.find().populate('keeper', ['name', 'phone'])
        console.log(animals)
        if(!animals.length == 0) return res.status(404).send({message: 'Not found'})
        return res.send(animals)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error getting animals'})
    }
}

export const updateAnimal = async (req, res) => {
    try {
        //Obtener el id del animal
        let { id } = req.params
        //Obtener los datos a Actualizar
        let data = req.body
        //Validar que vengan datos
        let update = checkUpdate(data, false)
        if(!update) return res.status(400).send({message: 'Have submit some data that cannot be update or missing data'})
        //Actualizar
        let animalUpdated = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('keeper',['name', 'surname'])
        //Validar si se actualizo
        if (!animalUpdated) return res.status(401).send({ message: 'Animal not found and not updated' })
        //Responder con el dato actualizado
        return res.send({ message: 'Updated Animal', animalUpdated })
    } catch (error) {
        console.error(error)
        return res.status(404).send({ message: 'Error updating an animal' })
    }
}
export const deleteAnimal = async (req, res) => {
    try {
        //Obtener el id del animal
        let { id } = req.params
        //Eliminar
        let deletedAnimal = await Animal.findOneAndDelete({ _id: id })
        //Verificar que se elimino
        if (!deletedAnimal) return res.status(404).send({ message: 'Animal not found and not deleted' })
        return res.send({ message: `Animal with name ${deletedAnimal.name} deleted succesfully` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting an animal' })
    }
}

export const search = async(req, res)=>{
    try {
        //Obtener el parametro de busqueda
        let {search} = req.body
        //Buscar
        let animals = await Animal.find(
            {name: search}
        ).populate('keeper', ['name', 'surname', 'phone'])
        //Validar la respuesta
        if(animals.length == 0) return res.status(404).send({message: 'Animals not found'})
        return res.send({message: 'Animals Found', animals})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error searching animal'})
    }
}