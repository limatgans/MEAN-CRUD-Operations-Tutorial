var express = require('express');
var formrouter = express.Router();
formrouter.post('/', function(req, res, next) {

    try{
        console.log("connected ");
        var db = req.db;
        var collection = db.collection('userdata');

        collection.insert(
            {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mobile: req.body.mobile,
                email: req.body.email,
                dob: req.body.dob,
                doj: req.body.doj,

            }
        )
        .then((docs) => {
          // docs contains the documents inserted with added **_id** fields
          // Inserted 1 documents into the document collection
          
            res.status(200).json({'Employee': 'Employee added successfully'});
            
        }).catch((err) => {
          // An error happened while inserting
          console.log("Error in inserting into DB "+ err);
          res.status(400).send("unable to save to database");
        }).then(() => {
            db.close();
        })
    }
    catch(ex)
{
	console.log("Exception "+ex);
    res.send(JSON.stringify([]));
    res.end();
}

});
module.exports = formrouter;