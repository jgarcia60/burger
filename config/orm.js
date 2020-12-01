const connection = require('../config/connection.js');

const orm = {
    selectAll: function(whatToSelect, tableInput) {
        const queryString = "SELECT ?? FROM ??";
        connection.query(queryString, [whatToSelect, tableInput], function(err, res) {
            if (err) throw err;
            console.log(res);
        });
    },
    insertOne: function(whatToInsert) {
        const queryString = "INSERT INTO burgers(burger_name, devoured) VALUES(??, false)";
        connection.query(queryString, [whatToInsert], function(err, res) {
            if (err) throw err;
            console.log(res);
        });
    },
    updateOne: function(updatedValue, whatToUpdate) {
        const queryString = "UPDATE burgers SET devoured = ?? WHERE burger_name = ??";
        connection.query(queryString, [updatedValue, whatToUpdate], function(err, res) {
            if (err) throw err;
            console.log(res);
        });
    }
}

module.exports = orm;