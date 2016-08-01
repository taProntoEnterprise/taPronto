var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');

var db_config = {};

var data = fs.readFileSync(path.join(__dirname, "database.cfg"), "utf-8");

var conf_set = data.split("\n");
conf_set.forEach(function(data_row){
    var conf_row = data_row.split("=");
        db_config[conf_row[0]] = conf_row[1];
});

//heroku dp: mongodb://heroku_j0825v7g:9uh22o76bckinmmkpu741embk6@ds019678.mlab.com:19678/heroku_j0825v7g
var connection = mongoose.createConnection("mongodb://heroku_j0825v7g:9uh22o76bckinmmkpu741embk6@ds019678.mlab.com:19678/heroku_j0825v7g");
autoIncrement.initialize(connection);

module.exports = mongoose.connect("mongodb://heroku_j0825v7g:9uh22o76bckinmmkpu741embk6@ds019678.mlab.com:19678/heroku_j0825v7g");