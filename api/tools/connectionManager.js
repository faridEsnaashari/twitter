const mysql = require('mysql');

connectionInfo = {
  host: global.env.MYSQL.HOST,
  user: global.env.MYSQL.USER,
  password: global.env.MYSQL.PASSWORD,
  port: global.env.MYSQL.PORT,
  database: global.env.MYSQL.DATABASE
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