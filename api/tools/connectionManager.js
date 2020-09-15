const mysql = require('mysql');
const env = require('../../config');

connectionInfo = {
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  port: env.MYSQL_PORT,
  database: env.MYSQL_DATABASE
}
const connection = mysql.createConnection(connectionInfo);

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

function query(conn, queryStatement) {
  return new Promise((resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    }
    conn.query(queryStatement, handler);
  });
}

module.exports.connection = connection;
module.exports.executeQuery = query;