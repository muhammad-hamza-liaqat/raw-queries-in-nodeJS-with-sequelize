const express = require("express");
const app = express();
const port=3000;
// database connection with mysql
const connection = require("./database/connection");
const queryRoute = require("./routes/routes");
require("./models/association");



// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes 
app.use("/raw", queryRoute);


// server port
app.listen(port, ()=>{
    console.log(`server running at localhost:/${port}`);
})