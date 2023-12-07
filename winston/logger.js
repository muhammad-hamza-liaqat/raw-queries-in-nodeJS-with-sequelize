const winston = require('winston');
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require("../database/connection");

// model for Log 
const LogModel = sequelize.define('Log', {
  timestamp: { type: DataTypes.DATE, defaultValue: Sequelize.fn('now') },
  level: DataTypes.STRING,
  message: DataTypes.STRING,
  meta: DataTypes.JSON,
  // createdAt: {
  //   type: DataTypes.DATE,
  //   allowNull: true
  // },
}
// ,{
//   timestamps: false
// }
);

// Sync the model with the database
LogModel.sync();

// 
class SequelizeTransport extends winston.Transport {
  constructor(options) {
    super(options);
    this.name = 'SequelizeTransport';
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // 
    LogModel.create({
      level: info.level,
      message: info.message,
      meta: info.meta,
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

// Create an instance of the custom transport
const sequelizeTransport = new SequelizeTransport();

// Create the Winston logger with both console and Sequelize transports
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    sequelizeTransport,
  ],
});

// Export the logger for use in other modules
module.exports = logger;
