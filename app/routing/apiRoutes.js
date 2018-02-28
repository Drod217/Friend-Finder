
var friendsData = require("../data/friends");


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });



  app.post("/api/friends", function(req, res) {

   
    var newUserScore = req.body.scores;
    var results = [];
    var match = 0;
    var bff;
    
    
    for (var i=0; i<friendsData.length; i+=1) {
      var difference = 0;
      
      for (var j=0; j<newUserScore.length; j+=1) {
        console.log(friendsData[i].scores[j])
        difference += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(newUserScore[j])))
      };
    
      results.push(difference);
    }

    console.log(results);

   
    for (var i=0; i<results.length; i+=1) {
      console.log(results[i]);
      
      if(results[i] <= results[match]) {
        match = i
        console.log(match);
      }
    };

    
    bff = friendsData[match]; 
    console.log("*******************************************");
    console.log(bff);

    
    friendsData.push(req.body);
    res.json(bff);
  });

};