var fs = require("fs");
var path = require("path");
var mongoose = require("mongoose");

var db_config = {};

var data = fs.readFileSync(path.join(__dirname, "database.cfg"), "utf-8");

var conf_set = data.split("\n");
conf_set.forEach(function(data_row){
    var conf_row = data_row.split("=");
        db_config[conf_row[0]] = conf_row[1];
});

module.exports = mongoose.connect("mongodb://localhost:27017/taPronto");