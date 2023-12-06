const winston = require('winston');
const path = require('path');


const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);


const logFilePath = path.join(__dirname, '..', 'api.log'); 


const transports = [
  new winston.transports.Console({ format: logFormat }),
  new winston.transports.File({ filename: logFilePath, format: logFormat })
];

const logger = winston.createLogger({
  transports: transports,
  exitOnError: false, 
});

module.exports = logger;
