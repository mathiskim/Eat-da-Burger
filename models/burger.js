// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");
console.log("in models/burger.js");

var burger = {
  all: function(cb) {
        console.log("before all orm: " );

    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  }  
};  

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
