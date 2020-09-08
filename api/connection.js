var mysql = require('mysql');

connectionInfo = {
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "salam"
}
const connection = mysql.createConnection(connectionInfo);

connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    
});

module.exports = connection;