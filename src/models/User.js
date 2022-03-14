import { model , Schema } from 'mongoose';

const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,'Debe ingresar un nombre de usuario.'],
        unique:[true,'Ya existe una cuenta con ese nombre de usuario.'],
        lowercase:true
    },
    fullname:{
        type:String,
        required:[true,'Por favor indique su nombre.'], 
    },
    email:{
        type:String,
        required:[true,'Debe ingresar un correo electrónico'],
        unique:[true,'Ya existe una cuenta con esta dirección de correo'],
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Debe ingresar una contraseña'],
        select:false
        //min:[6,'La contraseña debe tener al menos 6 carácteres.']
    },
    birthdate:{
        type:Date
    },
    signupdate:{
        type:Date,
        default:Date.now()
    },
    lastlogin:{
        type:Date
    },
    role:{
        type:String,
        enum:{
            values:['Dev','Admin','User'],
            message:'{VALUE} no es un rol permitido.'
        },
        required:[true,'Se requiere un rol para esta cuenta.']}
});

export default model('User',UserSchema);