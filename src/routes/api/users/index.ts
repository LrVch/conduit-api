import express from 'express';
import auth from '../../auth';
import { updateUser } from './route';
import { authenticateUser, createUser, getUser } from './routes';

const router = express.Router();

router.get('/user', auth.required, getUser);

router.put('/user', auth.required, updateUser);

router.post('/users/login', authenticateUser);

router.post('/users', createUser);

export default router;
