import { configDotenv } from "dotenv";
configDotenv();

export const config = {
  port: process.env.PORT || 5003,
  mongo_url: process.env.MONGO_URL || "mongodb://localhost:27017/rentalApp",
};
