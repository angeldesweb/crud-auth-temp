import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Authorization, Forbbiden } from './errors';


export const createToken = (user,next) => {
    const secret = process.env.SECRET;
    const payload = {
        sub:user._id,
        role:user.role,
        exp:moment.utc().add(15,'minutes').valueOf()
    };
    try {
        const resp = jwt.sign(payload,secret,{algorithm:'HS256'});
        return resp;
    } catch (error) {
        throw Forbbiden('No se pudo generar el token de acceso');
    }
};