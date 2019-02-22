// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");

// HTML Routes
// =============================================================

module.exports = function(app) {
  // route to the survey page
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
  
  // default route to home Page
  app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};