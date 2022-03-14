import express from 'express';
import cors from 'cors';
import { api } from './routes';
import { EndErrors } from './middlewares/EndErrors'
import { ValidationErrors } from './middlewares/ValidationErrors';
import { MongoErrors } from './middlewares/MongoErrors';
import morgan from 'morgan';

export const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',api);
app.use(morgan('tiny'))
app.use(MongoErrors);
app.use(ValidationErrors);
app.use(EndErrors);