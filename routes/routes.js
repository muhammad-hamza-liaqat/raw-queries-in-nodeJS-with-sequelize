const express = require("express");
const app = express();
const queryRoute = express.Router();
module.exports = queryRoute

queryRoute.route('/1')
.get((req,res)=>{
    res.end("hello from routes")
});