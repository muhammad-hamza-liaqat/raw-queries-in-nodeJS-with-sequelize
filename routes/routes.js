const express = require("express");
const app = express();
const queryRoute = express.Router();
const {functionOne, functionTwo} = require("../controller/queries")
module.exports = queryRoute

queryRoute.route('/1')
.get(functionOne);
queryRoute.route('/2')
.get(functionTwo);