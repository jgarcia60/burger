const connection = require('../config/connection.js');

function printQuestionMarks(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax. 
  function objToSql(ob) {
    const arr = [];
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
          // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }



const orm = {
    selectAll: function(table, cb) {
        const queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, res) {
            if (err) throw err;
            console.log(res);
            cb(res);
        });
    },
    // insertOne: function(burger_name, cb) {
    insertOne: function(table, cols, vals, cb) {
        // const queryString = "INSERT INTO burgers(burger_name, devoured) VALUES(?, false)";
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log(queryString);
        // connection.query(queryString, vals, (err, res) => {
        connection.query(queryString, vals, (err, res) => {
        if (err) {
            throw err;
        }
        cb(res);
        });
    },
    updateOne: (table, objColVals, condition, cb) => {
    // updateOne: (id, cb) => {
        // const queryString = "UPDATE burgers SET devoured = true WHERE id = ?";
        let queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        console.log(queryString);
        connection.query(queryString, (err, res) => {
        if (err) {
            throw err;
        }
        cb(res);
        });
    },
}

module.exports = orm;