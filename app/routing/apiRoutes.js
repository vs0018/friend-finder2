// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");


module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

app.get("/api/friends", function(req, res) {
    return res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array

  // Create New Friend - takes in JSON input
app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var userInfo = req.body;
    var userScores = userInfo.scores;

    var matchName = "";
		var matchImage = "";
		var totalDifference = 10000;

    for (var j = 0; j < friendData.length; j++){

      var friendScores = friendData[j].scores;

      var sum = 0;
        for(var i=0; i< friendScores.length; i++) {
            sum += Math.abs(friendScores[i]-userScores[i]);
        };
      
        if (sum < totalDifference) {
          totalDifference = sum;
          matchName = friendData[j].name;
          matchImage = friendData[j].photo;
        };
      };

    // Add new user
    friendData.push(userInfo);

    // Send appropriate response
    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});

  });
  
};