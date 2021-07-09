import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/index.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 3001;

app.get("/", cors(), (req, res) => {
  res.send('Hello World');
});
app.use(
  cors({
    origin: "http://127.0.0.1:5500",  
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Our API is available on port: ${port}`);
});
