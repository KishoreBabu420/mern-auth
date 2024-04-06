import express from 'express';
const router = express.Router();

//controllers
import { test } from '../controllers/user.controller.js';

router.get('/', test);

export default router;
