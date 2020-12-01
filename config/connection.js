const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "Mickey19",
    database: "burger_db"
});

connection.connect(function(err) {
    if (err) {
        connsole.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;