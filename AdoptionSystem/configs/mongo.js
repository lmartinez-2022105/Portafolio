//Toda la configuración a MongoDB
'use strict'

import mongoose from "mongoose"

export const connect = async () => {
    try {
        mongoose.connection.on('connecting', ()=>console.log('MongoDB | try connecting'))
        mongoose.connection.on('connected', ()=> console.log('MongoDB | connected to mongo'))
        mongoose.connection.on('open', ()=>console.log('MongoDB | connected to database'))
        mongoose.connection.on('error', ()=>{console.log('MongoDB | could not be connect to mongodb')})
       
        mongoose.connection.on('disconnected', ()=>console.log('MongoDB |  disconnect'))
        mongoose.connection.on('reconnected', ()=>console.log('MongoDB |  reconnected to mongodb'))
        await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystemAV24')
    } catch (error) {
        console.error('DataBase connection failed', error)
    }
}