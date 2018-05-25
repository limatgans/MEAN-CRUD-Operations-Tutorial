var express = require('express');
var findemailrouter = express.Router();
findemailrouter.post('/', function (req, res, next) {

    
    var db = req.db;
    var coll =db.collection('userdata');
    
    if(!db || !db.collection) {
        console.log("db object was not found");
        res.json({});
        return;
    }

    //console.dir(req.body.email);

    coll.find({'email': req.body.email})
    .then((docs) => {
        // docs contains the documents inserted with added **_id** fields
        // Getting documents
        let emailExists = false;
        console.log('email found');
        //console.dir(docs);
        if(docs.length)
        {
            emailExists = true;
        }
        res.json(emailExists)
        // res.status(200).json({'Employee': 'Employee retrived successfully'});
        // res.end();


    }).catch((err) => {
        // An error happened while retriving
        console.log("Error in retriving into DB "+ err);
        // res.status(500).send("unable to retrive to database");
    }).then(() => db.close())
 

});
module.exports = findemailrouter;