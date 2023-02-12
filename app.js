var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;
var db = require("./config/database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./modules/Game");
var IssueLog = mongoose.model("issueLog");

//example routes
app.get("/", function(req, res){
    res.redirect("errorList.html");
})

app.post("/saveError", function(req, res){
    new IssueLog(req.body).save().then(function(){
        res.redirect("errorList.html");
    })
})

app.get("/errorLogs", function(req, res){
    IssueLog.find({}).then(function(log){
        res.json({log});
    })
})

app.post("/deleteLog", function(req, res){
    IssueLog.findByIdAndDelete(req.body.log).exec();
    res.redirect("errorList.html");
})

app.post("/updateLog", function(req, res){
    console.log(req.body);
    IssueLog.findByIdAndUpdate(req.body.id, {status:req.body.status}, function(){
        res.redirect("errorList.html");
    })
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
})
