import bcrypt, { compareSync } from "bcrypt";
import { config } from "../config/config.js";

export const hashPassword = (plainText) => {
  const encryptedText = bcrypt.hashSync(plainText, config.salt);
  return encryptedText;
};

export const comaparePassword = (plainText, compareData) => {
  const compare = bcrypt.compareSync(plainText, compareData);
  return compare;
};
