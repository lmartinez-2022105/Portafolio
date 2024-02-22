import {Schema, model} from "mongoose";

const animalSchema = Schema({
    name:{
        type:String,
        require: true
    },
    size:{
        type:String,
        require: true,
        enum:['SMALL','MEDIUM', 'LARGE']
    },
    description:{
        type: String,
        minLenght: [4, 'The description its to short, please write a extended description']
    },
    age:{
        type: Number,
        require: true,
    },
    keeper:{
        type: Schema.ObjectId,
        maxLenght: [24, 'The id could not be max 24 characters'],
        ref: 'user',
        require: true
    }
    
})

export default model('animal', animalSchema)