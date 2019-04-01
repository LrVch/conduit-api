import express from 'express';
import { authenticateUser, createUser, getUser, updateUser } from './route';

const router = express.Router();

router.get('/user', getUser);

router.put('/user', updateUser);

router.post('/users/login', authenticateUser);

router.post('/users', createUser);

export default router;
