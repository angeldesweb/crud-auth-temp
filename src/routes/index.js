import { Router } from 'express';
import { deleteUser, getUserById, getUsers, signIn, signUp, updateUser } from '../controllers/users';

export const api = Router();

//MÉTODOS TESTEADOS DEPURAR
api.get('/users',getUsers);
api.get('/user/:id',getUserById);

api.post('/up',signUp);
api.post('/in',signIn);

api.put('/user/:id',updateUser);

api.delete('/user/:id',deleteUser);