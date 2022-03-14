import User from '../models/User';
import { createToken } from '../services/auth';
import { Authorization, Forbbiden } from '../services/errors';
import { checkPassword, savePassword } from '../services/passwords';
import { create, read, readById, readOne , dlete, upd } from './crud';

export const signUp = async (req,res,next) => {
    try {
        const { body } = req;
        const hash = await savePassword(body.password);
        body.password = hash;
        const user = await create(body,User);
        return res.status(200).send({success:true,user});
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req,res,next) => {
    try {
        const {username,password} = req.body;

        const user = await readOne({username},'password',null,User);
        if(!user) return next(Forbbiden(`${username} no existe en la base de datos.`));
        
        const pass = await checkPassword(password,user.password);
        if(!pass) return next(Authorization('Contraseña inválida'));

        const token = createToken(user);
        const old = await upd(user._id,User,{lastlogin:Date.now()});

        return res.status(200).send({sucess:true,user:user._id,token,lastsession:old.lastlogin});
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req,res,next) => {
    try {
        const user = await readById(req.params.id,User);
        if(!user) next(Forbbiden('No existe el usuario'));
        return res.status(200).send({success:true,user});
    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req,res,next) => {
    try {
        const users = await read(User);
        if(!users.length) next(Forbbiden('Sin registros'))
        return res.status(200).send({success:true,users});
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req,res,next) => {
    try {
        if(!!req.body.password){
            let hash = await savePassword(req.body.password);
            req.body.password = hash;
        }
        const user = await readOne({_id:req.params.id},'password',null,User);
        const resp = await upd(user._id,User,req.body);
        return res.status(200).send({success:true,old:resp});
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async (req,res,next) => {
    try {
        const deltdUser = await dlete(req.params.id,User);
        return res.status(200).send({success:true,deleted:deltdUser});
    } catch (error) {
        next(error);
    }
}