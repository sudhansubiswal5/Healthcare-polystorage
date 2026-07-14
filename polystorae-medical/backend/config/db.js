import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export const connectMySQL = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Automatically fixes table columns
    console.log("✅ MySQL Connected & Synced");
  } catch (error) {
    console.error("❌ MySQL Error:", error.message);
  }
};