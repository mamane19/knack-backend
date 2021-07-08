import express, { Router } from "express";
import usersRouter from "./usersRouter.js";


const router = express.Router();

router.use("/users", usersRouter);


export default router;
