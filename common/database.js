const { header } = require('express-validator');
const mysql = require('mysql2');
var utils = require('../common/utils');

exports.getMySQLConnection = () => {
  const DATABASE = utils.getConfigByConfigName('database');
  const HOST = utils.getConfigByConfigName('host');
  const USER = utils.getConfigByConfigName('user');
  const PASSWORD = utils.getConfigByConfigName('password');

  // Check if any of the required configuration values is missing or empty
  if (
    DATABASE == null || DATABASE == '' || DATABASE == undefined ||
    HOST == null || HOST == '' || HOST == undefined ||
    USER == null || USER == '' || USER == undefined ||
    PASSWORD == null || PASSWORD == '' || PASSWORD == undefined
  ) {
    console.log("Please provide database connection details.");
    return; // Return early if configuration is incomplete
  }

  // Create and return a MySQL connection object
  return mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
  });
}
