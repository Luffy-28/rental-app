import { configDotenv } from "dotenv";
configDotenv();

export const config = {
  port: process.env.PORT || 5003,
  mongo_url: process.env.MONGO_URL || "mongodb://localhost:27017/rentalApp",
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  salt: parseInt(process.env.SALT) || 10,
};
