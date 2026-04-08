const express = require ("express");
const route = express.Router();
const userRoute = require ("../controllers/userController");

route.post("/createUser", userRoute.createUser);
route.post("/login", userRoute.login);
console.log(userRoute);
module.exports = route;
