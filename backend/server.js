import express from "express";
import cors from "cors";
import detenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./src/config/config.js";
import authRouter from "./src/routers/authRouter.js";
import loginRouter from "./src/routers/loginRouter.js";

const app = express();
const port = config.port;

const mongo_url = config.mongo_url;

app.use(cors());
app.use(express.json());

app.get("/", (re, res) => {
  res.send({
    status: "success",
    message: "Welcome to the Rental App API",
  });
});

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", loginRouter);

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, (error) => {
      if (error) {
        console.log("Error starting the server", error);
      } else {
        console.log(`Server started at ${port}`);
      }
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
