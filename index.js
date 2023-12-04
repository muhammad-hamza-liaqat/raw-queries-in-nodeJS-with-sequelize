const express = require("express");
const app = express();
const port=3000;
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));






// server port
app.listen(port, ()=>{
    console.log(`server running at localhost:/${port}`);
})