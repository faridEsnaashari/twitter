const mysql = require('mysql');

connectionInfo = {
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "gardeshgari_db"
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