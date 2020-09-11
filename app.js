var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todo");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var todoSchema = new mongoose.Schema({
	name: String
});

var Todo = mongoose.model("Todo", todoSchema);
// var todoList = [
//	"Get it!",
//	"Go for it!"
//]

app.get("/", function(req, res) {
	Todo.find({}, function(err, todoList) {
		if(err) console.log(err);
		else {
			res.render("index.ejs", {todoList: todoList});
		}
	})
});

app.post("/newtodo", function(req, res) {
	console.log("Submited!");
	var newItem = new Todo({
		name: req.body.item
	});
	Todo.create(newItem, function(err, Todo){
		if(err) console.log(err);
		else {
			console.log("Inserted: "+newItem);
		}
	})
	res.redirect("/");
});

app.get("*", function(req, res) {
        res.send("<h1>Invalid page</h1>");
});

//server on port 3000
app.listen(3000, function() {
	console.log("server started on p=3000");
});

var request = require("request");
var fs = require("fs");

request("https://github.com/favicon.ico").pipe(fs.createWriteStream('favicon.ico'));
module.exports = function() {
	return "todoList";
}
