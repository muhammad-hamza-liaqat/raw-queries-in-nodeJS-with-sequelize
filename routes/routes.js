const express = require("express");
const app = express();
const queryRoute = express.Router();
const {
  functionOne,
  functionTwo,
  functionThree,
  functionFour,
  functionSix,
  functionFive,
  functionSeven,
  functionEight,
  functionEleven,
  function13,
  function10,
  functionNine,
  function12,
  function14,
  funtion15,
} = require("../controller/queries");
module.exports = queryRoute;

queryRoute.route("/1").get(functionOne);
queryRoute.route("/2").get(functionTwo);
queryRoute.route("/3").get(functionThree);
queryRoute.route("/4").get(functionFour);
queryRoute.route("/6").get(functionSix);
queryRoute.route("/5").get(functionFive);
queryRoute.route("/7").get(functionSeven);
queryRoute.route("/8").get(functionEight);
queryRoute.route("/9").get(functionNine);
queryRoute.route("/10").get(function10);
queryRoute.route("/11").get(functionEleven);
queryRoute.route("/12").get(function12);
queryRoute.route("/13").get(function13);
queryRoute.route("/14").get(function14);
queryRoute.route("/15").get(funtion15)