var express = require('express');
var updaterouter = express.Router();
updaterouter.post('/', function(req, res, next) {

    try{
        console.log("connected ");
        var db = req.db;
        var collection = db.collection('userdata');
        collection.update(
            {
                email: req.body.email
            },
            {
                $set: 
                    {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        mobile: req.body.mobile,
                        dob: req.body.dob,
                        doj: req.body.doj,

                    }
            }
        )
        .then((docs) => {
          // docs contains the documents inserted with added **_id** fields
          // Inserted 1 documents into the document collection
          
            res.status(200).json({'Employee': 'Updated Successfully'});
            
        }).catch((err) => {
          // An error happened while inserting
          console.log("Error in Updating DB "+ err);
          res.status(400).send("unable to update the database");
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
module.exports = updaterouter;