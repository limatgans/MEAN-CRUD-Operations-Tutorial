var express = require('express');
var viewrouter = express.Router();
viewrouter.get('/', function (req, res, next) {

    
    var db = req.db;
    var coll =db.collection('userdata');
    
    if(!db || !db.collection) {
        console.log("db object was not found");
        res.json({});
        return;
    }

    coll.find({})
    .then((docs) => {
        // docs contains the documents inserted with added **_id** fields
        // Getting documents
        console.log('Got the values');
        res.json(docs);
        // res.status(200).json({'Employee': 'Employee retrived successfully'});
        // res.end();


    }).catch((err) => {
        // An error happened while retriving
        console.log("Error in retriving into DB "+ err);
        // res.status(500).send("unable to retrive to database");
    }).then(() => db.close())
 

});
module.exports = viewrouter;


   // coll.find(function (err, data) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         res.JSON(data);
        //         res.end();

        //     }
        // });