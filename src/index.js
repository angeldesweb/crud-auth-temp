import { connect } from 'mongoose';
import { app } from './app';
import {} from 'dotenv/config';

const port = process.env.port || 3001
const db = process.env.MONGO_URI;

(() => {
    app.listen( port , err => {
        if(err) return console.log(`Something is wrong with the server: ${err}`);

        connect(db,err => {
            if(err) return console.log(`Mongo connection has an error: ${err}`);

            console.log(`Service running at port: ${port}. mongoDb connected.`);
        });
    });
})();