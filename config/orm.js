var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString(); 
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}
	return arr.toString();
}
  
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function(err, result) {
      if (err) {
        throw err;
      }
	  cb(result);
    });
  },

  insertOne: function(table, cols, vals, cb) {
    console.log("vals " + vals);
    // var queryString = "INSERT INTO burgers (burger_name, devoured) VALUES ('Okie Burger', false);";
    var queryString =  "INSERT INTO " + table + " (" + cols.toString() + ") VALUES " + "(" + printQuestionMarks(vals.length) + ");";
       connection.query(queryString, vals, function(err, result) {
       if (err) {
         throw err;
       }
         cb(result);
    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });  
  }
};

module.exports = orm;
