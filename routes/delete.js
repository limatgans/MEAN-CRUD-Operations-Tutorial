var express = require('express');
var deleterouter = express.Router();
deleterouter.post('/', function (req, res, next) {

    
    var db = req.db;
    var coll =db.collection('userdata');
    
    if(!db || !db.collection) {
        console.log("db object was not found");
        res.json({});
        return;
    }

    coll.remove({email: req.body.email})
    .then((docs) => {
        // docs contains the documents inserted with added **_id** fields
        // Getting documents
        console.log('DELETED');
        console.dir('Inside Delete from delete.js \n' + docs);
        res.json(docs);
        // res.status(200).json({'Employee': 'Employee retrived successfully'});
        // res.end();


    }).catch((err) => {
        // An error happened while retriving
        console.log("Error in deleting the document in DB "+ err);
        // res.status(500).send("unable to retrive to database");
    }).then(() => db.close())
 

});
module.exports = deleterouter;