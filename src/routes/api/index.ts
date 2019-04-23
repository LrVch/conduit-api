import express from 'express';
import handleValidationErrors from '../../utils/handleVlidationErrors';
import users from './users';

const router = express.Router();

router.use('/', users);

router.use(handleValidationErrors);

export default router;
