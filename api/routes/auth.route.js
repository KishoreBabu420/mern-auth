import express from 'express';

const router = express.Router();

import {
  register,
  login,
  google,
  logout,
} from '../controllers/auth.controller.js';

router.post('/register', register);
router.post('/login', login);
router.post('/google', google);
router.get('/logout', logout);

export default router;
