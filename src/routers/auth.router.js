import express from 'express';
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/log-in-validator.middleware.js';
import AuthController from '../controllers/auth.controller.js';
import { requireAccessToken } from '../middlewares/authorization.middleware.js'

const authRouter = express.Router();

authRouter.post('/sign-up/customer', signUpValidator, AuthController.signUpCustomer);

authRouter.post('/sign-up/owner', signUpValidator, AuthController.signUpOwner);

authRouter.patch('/email-verify', AuthController.emailVerify);

authRouter.post('/log-in', signInValidator, AuthController.logIn);

authRouter.post('/log-out', requireAccessToken, AuthController.logOut);

authRouter.delete('/', requireAccessToken, AuthController.deleteId);

authRouter.get('/profile', requireAccessToken, AuthController.getProfile);

authRouter.patch('/profile', requireAccessToken, AuthController.updateProfile)

export { authRouter };
