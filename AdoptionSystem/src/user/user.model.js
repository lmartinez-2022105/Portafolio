import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    surname:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    username:{
        type: String,
        unique: true,
        lowercase: true,
        require: true
    },
    password:{
        type: String,
        minLength: [8, 'Password must be 8 characters'],
        require: true
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        require: true
    },
    address:{
        type: String,
        required: true
    },
    role:{
        type: String,
        uppercase: true,
        enum:['ADMIN', 'CLIENT'],//Solo los datos que estan en el arreglo son validos
        required:true
    }
})

//Pre mongoose
                            //pluralizar
export default mongoose.model('user',userSchema)