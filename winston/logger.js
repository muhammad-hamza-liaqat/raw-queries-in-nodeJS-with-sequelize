const winston = require('winston');
const path = require('path');
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database/connection");

// Model for Log 
const LogModel = sequelize.define('Log23', {
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userAgent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accept: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  postmanToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  host: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  acceptEncoding: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  connection: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  statusCode: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
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
      meta: info.meta || {},
      statusCode: info.statusCode,
      query: info.query,
    })
      .then((createdLog) => {
        console.log('Created Log Entry:', createdLog);
        callback(null, true);
      })
      .catch((error) => {
        console.error('Error saving log entry to Sequelize:', error);
        callback(error);
      });
  }
}

// Directory path for the log file
const logFilePath = path.join(__dirname, '..', 'api.log');

// Custom transport for File
const fileTransport = new winston.transports.File({
  filename: logFilePath,
  level: 'info', // Log info level and below to the file
});

// Instantiate the Sequelize transport
const sequelizeTransport = new SequelizeTransport();

// Create a logger with both transports
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    fileTransport,
    sequelizeTransport,
  ],
});

// Log an initial message to verify if the log file is being created
logger.info('Initial log message');

module.exports = { logger, LogModel };
