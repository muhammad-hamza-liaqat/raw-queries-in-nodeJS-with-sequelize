const winston = require('winston');
const path = require('path');
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database/connection");

// model for Log 
const LogModel = sequelize.define('Log2', {
  timestamp: { type: DataTypes.DATE, defaultValue: Sequelize.fn('now') },
  level: DataTypes.STRING,
  message: DataTypes.STRING,
  meta: DataTypes.JSON,
  statusCode: DataTypes.INTEGER,
  separateStatusCode: DataTypes.INTEGER,
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

    // console.log('Input Object:', info);

    LogModel.create({
      timestamp: info.timestamp,
      level: info.level,
      message: info.message,
      meta: info.meta || {},
      statusCode: 200,
      separateStatusCode: 200,
      query: info.query,
    })
      .then((createdLog) => {
        console.log('Created Log Entry:', createdLog);

        callback(null, true);
      })
      .catch((error) => {
        // console.error('Error saving log entry to Sequelize:', error);
        callback(error);
      });
  }
}

// directory path
const logFilePath = path.join(__dirname, '..', 'api.log');

// insrance
const sequelizeTransport = new SequelizeTransport();


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: logFilePath }),
    sequelizeTransport,
  ],
});


module.exports = logger;
