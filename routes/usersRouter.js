import express from "express";
import {signUp, signIn } from '../controllers/usersController.js'
import { authenticate } from '../middlewares/auth.js';

const usersRouter = express.Router();

//Add a User - Sign Up - Authenticate.
usersRouter.post("/signup", authenticate, signUp);

//Add a User - Sign In - No need of Authentication
usersRouter.post("/signin", signIn);



export default usersRouter;






