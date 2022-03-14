import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Forbbiden } from './errors';


export const createToken = (user) => {
    const secret = process.env.SECRET;
    const payload = {
        sub:user._id,
        role:user.role,
        exp:moment.utc().add(30,'seconds').valueOf()
    };
    try {
        const resp = jwt.sign(payload,secret,{algorithm:'HS256'});
        return resp;
    } catch (error) {
        throw Forbbiden('No se pudo generar el token de acceso');
    }
};