export const create =  async ( body , model ) => {
    try {
        const doc = new model(body);
        const resp = doc.save();
        return resp;
    } catch (error) {
        throw error;
    }
};

export const read = async (model,path,fields) => {
    try {
        let docs;
        if(!!path && !!fields) docs = await model.find().select(path).populate(fields);
        if(!!path && !fields) docs = await model.find().select(path);
        if(!path && !!fields) docs = await model.find();
        return docs;
    } catch (error) {
        throw error;
    }
};

export const readById = async (_id,model,path,fields) => {
    try {
        let doc;
        if(!!path && !!fields) doc = await model.findById(_id).select(path).populate(fields);
        if(!!path && !fields) doc = await model.findById(_id).select(path);
        if(!path && !!fields) doc = await model.findById(_id); 
        return doc;
    } catch (error) {
        throw error;
    }
};

export const readOne = async (param,path,fields,model) => {
    try {
        let doc;
        if(!!path && !!fields) doc = await model.findOne(param).select(path).populate(fields);
        if(!!path && !fields) doc = await model.findOne(param).select(path);
        if(!path && !!fields) doc = await model.findOne(param); 
        return doc; 
    } catch (error) {
        throw error;
    }
}

export const upd = async(_id,model,update) => {
    try {
        const resp = await model.findByIdAndUpdate(_id,update);
        return resp;
    } catch (error) {
        throw error;
    }
};

export const dlete = async (_id,model) => {
    try {
        const resp = model.findByIdAndDelete(_id);
        return resp;
    } catch (error) {
        throw error;
    }
}
