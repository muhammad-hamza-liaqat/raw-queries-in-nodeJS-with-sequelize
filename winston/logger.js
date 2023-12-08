const winston = require('winston');
const path = require('path');
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database/connection");

// model for Log 
const LogModel = sequelize.define('Log', {
  timestamp: { type: DataTypes.DATE, defaultValue: Sequelize.fn('now') },
  level: DataTypes.STRING,
  message: DataTypes.STRING,
  meta: DataTypes.JSON,
  statusCode: DataTypes.INTEGER,
});

// Sync the model with the database
LogModel.sync();

// Custom transport for Sequelize
class SequelizeTransport extends winston.Transport {
  constructor(options) {
    super(options);
    this.name = 'SequelizeTransport';
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });


    LogModel.create({
      timestamp: info.timestamp,
      level: info.level,
      message: info.message,
      meta: info.meta,
      statusCode: info.statusCode,
    })
      .then(() => {
        callback(null, true);
      })
      .catch((error) => {
        console.error('Error saving log entry to Sequelize:', error);
        callback(error);
      });
  }
}

// Define the path for the log file
const logFilePath = path.join(__dirname, '..', 'api.log');

// Create an instance of the custom Sequelize transport
const sequelizeTransport = new SequelizeTransport();

// Create the Winston logger with Console, File, and Sequelize transports
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: logFilePath }),
    sequelizeTransport,
  ],
});

// Export the logger for use in other modules
module.exports = logger;
