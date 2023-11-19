import { connect } from "mongoose";
import 'dotenv/config';
const DB_URI = process.env.DB_URI;

const dbConnection = async () => {
  try {
    await connect(DB_URI);
    console.log("🔗 DB successfully connected");
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting to DB");
  }
};

export {
    dbConnection,
};