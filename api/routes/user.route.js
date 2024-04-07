import express from 'express';
const router = express.Router();
import { updateUser } from '../controllers/user.controller.js';

//controllers
import { test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/index.js';

router.get('/', test);
router.post('/update/:id', verifyToken, updateUser);

export default router;
