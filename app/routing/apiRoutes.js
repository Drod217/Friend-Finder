// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests

  app.post("/api/friends", function(req, res) {

    // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    var newUserScore = req.body.scores;
    var results = [];
    var match = 0;
    var bff;
    
    //Goes through friendsArray, compares scores, and pushes the difference of each comparison to results array
    for (var i=0; i<friendsData.length; i+=1) {
      var difference = 0;
      //Goes through newUserScore array and compares each score with each individual user in the array
      for (var j=0; j<newUserScore.length; j+=1) {
        console.log(friendsData[i].scores[j])
        difference += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newUserScore[j])))
      };
      //pushes to results array
      results.push(difference);
    }

    console.log(results);

    //Goes through the results array
    for (var i=0; i<results.length; i+=1) {
      console.log(results[i]);
      //Compares if the difference is less than or equal to the first result index, if less or equal match gets reassigned and compared again until loop is complete
      if(results[i] <= results[match]) {
        match = i
        console.log(match);
      }
    };

    //new variable get assigned the best match and gets sent out
    bff = friendsData[match]; 
    console.log("*******************************************");
    console.log(bff);

    //pushes user to friendsArray
    friendsData.push(req.body);
    res.json(bff);
  });

};