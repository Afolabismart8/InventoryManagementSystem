require("dotenv").config();
const express = require ("express");
const app = express();
app.use(express.json());   //middlewares
const connectDB = require ("../inventoryManagemnt/configs/database");
connectDB() //Database

const ProductRoute = require ("../inventoryManagemnt/routes/productRoute");
const userRoute = require ("../inventoryManagemnt/routes/userRoute");

//EndRoutes
app.use("/api",ProductRoute);
app.use ("/api", userRoute);

const PORT = process.env.PORT || 2000
app.listen (PORT, ()=> (
    console.log(`Server is Live ${PORT}`)
))