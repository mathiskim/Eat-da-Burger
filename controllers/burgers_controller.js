var express = require("express");
var router = express.Router();
// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//when page is first hit, redirect to /index to select all the burgers and 
//display them using index.handlebars
router.get("/", function(req, res) {
  res.redirect('/index');
});

// select all the burgers and display them using index.handlebars
router.get("/index", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// insert the user's burger name and set the devoured flag to false and go back to the home page
router.post("/burgers/insertOne", function(req, res) {
  console.log(req);

  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.name, false],
    function(result) {
      res.redirect('/index');
    }
  );
});

// update the devoured flag for the burger the user clicked on and go back to the home page
 router.put("/burgers/updateOne/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {    
       res.redirect("/index");
  });
});

// Export routes for server.js to use.
module.exports = router;
