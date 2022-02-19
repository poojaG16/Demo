var express = require("express");
var mongoose = require("mongoose");

var schema = mongoose.Schema;
var router = express.Router();

var empschema = new schema({
    _id: Number,
    empid: Number,
    ename: String,
    // sal:{type:Number,validate:/[0-9]*/},
    sal: Number
});

//create obj of nm emp having schema of type empschema
var Emp = mongoose.model('emptab', empschema); //it use emptab collection

//To retrive all records from mongodb & display it in table format
router.get("/", (req, res) => {
    Emp.find().exec((err, data) => {
        if (err) {
            res.status(500).send("Data Not Found");
        }
        console.log(data);


        res.render("index", { title: "Employee Data", empdata: data });
    });
});

router.get("/create", function (req, res) {
    res.render("create", { title: "Add Employee" })
});

//update and delete
router.get("/edit/:id",(req,res)=>{
    Emp.findOne({empid:req.params.id}),(err,doc)=>{
        if(err){
            res.status(500).send()
        } 
        else{
            res.send("update",{title:"employee data",empobj});
        } 
       
    }
})

router.post("/create", (req, res) => {
    var emp = new Emp({ _id: req.body.keyid, empid: req.body.eid, ename: req.body.ename, sal: req.body.sal });
    emp.save((err) => {
        if (err) {
            res.status(500).send("Data Not Found");
        }
        res.redirect("/");
    });
});

module.exports = router;
