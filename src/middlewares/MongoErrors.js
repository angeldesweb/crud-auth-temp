export const MongoErrors = (err,req,res,next) => {
    
    if(err.code === 11000){ 
        const path = Object.keys(err.keyValue)[0];
        const value = err.keyValue[path];
        return res.status(400).send({
            path:err.keyValue,
            message:`Ya existe un registro con el valor ${value}`
        });
    };

    next(err);
};