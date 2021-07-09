import express from "express";
import {signUp, signIn } from '../controllers/usersController.js'
import { authenticate } from '../middlewares/auth.js';

const usersRouter = express.Router();

//Add a User - Sign Up - No need of Authentication.
usersRouter.post("/signup", signUp);

//Add a User - Sign In - Authenticate
usersRouter.post("/signin", signIn);



export default usersRouter;






