export const EndErrors = (err,req,res,next) => {
    if(err.status) return res.status(err.status).send({error:err});
    
    return res.status(500).send({message:`UNKNOWN ERROR: ${err.stack}`});
};