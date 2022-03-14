import CustomResp from 'http-errors';

export const Forbbiden = (message) => {
    return CustomResp(404,message);
};

export const Authorization = (message) => {
    return CustomResp(401,message);
};