import jwt from 'jsonwebtoken';
import moment from 'moment';
import 'moment/locale/es-mx';
import { Authorization } from '../services/errors';
moment.locale('es-mx');


export const Auth = async (req,res,next) => {
    if(!req.headers.authorization) return next(Authorization('No hay credenciales de autorización'));
        const token = req.headers.authorization.split(' ')[1];
    try {
        const { sub , role , exp } = await jwt.verify(token,process.env.SECRET);
        req.user = sub;
        req.role = role;
        const time = moment(exp).diff(moment());
        if(time <= 0) return next(Authorization('La sesión ha expirado'))
        return next()
    } catch (error) {
        next(error);
    }
}