const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/connection");

const logModel = sequelize.define("Log", {
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn("now"),
  },
  level: DataTypes.STRING,
  message: DataTypes.STRING,
  meta: DataTypes.JSON
});
logModel.sync();

module.exports = logModel
