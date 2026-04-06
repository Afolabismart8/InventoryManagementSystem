require("dotenv").config();
const express = require ("express");
const app = express();
app.use(express.json());   //middlewares
const connectDB = require ("../inventoryManagemnt/configs/database");
connectDB() //Database

const Product = require ("../inventoryManagemnt/routes/productRoute");

//EndRoutes
app.use("/api",Product);

const PORT = process.env.PORT || 2000
app.listen (PORT, ()=> (
    console.log(`Server is Live ${PORT}`)
))