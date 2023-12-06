const express = require("express");
const app = express();
const queryRoute = express.Router();
const {functionOne, functionTwo, functionThree, functionFour, functionSix, functionFive, functionSeven, functionEight, functionEleven, function13} = require("../controller/queries")
module.exports = queryRoute

queryRoute.route('/1')
.get(functionOne);
queryRoute.route('/2')
.get(functionTwo);
queryRoute.route('/3')
.get(functionThree);
queryRoute.route('/4')
.get(functionFour);
queryRoute.route('/6')
.get(functionSix);
queryRoute.route('/5')
.get(functionFive);
queryRoute.route('/7')
.get(functionSeven);
queryRoute.route('/8')
.get(functionEight);
queryRoute.route('/9')
.get();
queryRoute.route('/10')
.get();
queryRoute.route('/11')
.get(functionEleven);
queryRoute.route('/12')
.get();

queryRoute.route('/13')
.get(function13);