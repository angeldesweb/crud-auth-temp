export const ValidationErrors = (err,req,res,next) => {
    if(err.name === 'ValidationError' && err.errors) {
        const paths = Object.keys(err.errors);
        if(err.errors[paths[0]].kind === 'required') err.status = 400;
        const messages = paths.map(path => ({[path]:err.errors[path].properties.message}));
        return res.status(err.status).send({messages,paths});
    }
    next(err);
    
};