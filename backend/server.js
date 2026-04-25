import express from "express";
import cors from "cors";
import detenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./config/config.js";

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
