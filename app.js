var express = require("express");
var app = express();
//var cookieparser=require("cookie-parser");
//for setting to specify path
var path = require("path");
var bodyparser = require("body-parser");
var routes = require("./routes/routers");
//mongodb connectivity
var mongoose = require("mongoose");
const url = "mongodb://localhost:27017/test";

//to assign native promise obj to mongoose
mongoose.Promise = global.Promise;
//To make connection asynchronously
mongoose.connect(url, {
    useMongoClient: true,
    connectTimeoutMS: 1000
},
    (err, res) => {
        if (err) {
            console.log("Error while connecting to mongodb");
        }
        else {
            console.log("Connection Successful");
        }
    });

//configure the application
app.set("views", path.join(__dirname, "views"));
app.set("view engine", 'jade');

//middleware
app.use(bodyparser.json()); //if url is in json convert it inoto javascript
app.use(bodyparser.urlencoded({ extended: false })); //stringquery to js
app.use(express.static(path.join(__dirname, "public")));//sets the css,js files at the time of loading
//app.use(cookieParser());

//Routing will be handle by router.js file
app.use('/', routes);

app.listen(3000);
console.log("server started at port 3000");

module.exports = app;

