import express from 'express';
const router = express.Router();

export default router;

import {
  SignUp,
  Login
} from '../controllers/authentication';

router.post('/signup', SignUp);
router.post('/login', Login);
