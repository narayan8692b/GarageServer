var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mosambeeDb";
var urlParser = require('url');

app.get('/', function (req, res) {
  res.send('Mosambee Mongo Database Service');

})

app.get('/insert', function (req, res) {
//res.send('Mosambee Mongo Database Service');

  var q = urlParser.parse(req.url, true);

  var qdata = q.query;

  if (qdata.userId == null){
    return;
  }

  if (qdata.deviceId == null){
    return;
  }

  if (qdata.deviceToken == null){
    return;
  }

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");

    dbo.collection("devices").update(
       {userId: qdata.userId, deviceId: qdata.deviceId},
       {$set:{userId: qdata.userId, deviceId: qdata.deviceId, deviceToken: qdata.deviceToken}},
       { upsert: true}
       , function(err, result) {
         if (err) throw err;
         console.log("1 record inserted");
          res.send(result);
         db.close();
       });


  });

})



app.get('/select', function (req, res) {

  //res.send('Mosambee Mongo Database Service');

  var q = urlParser.parse(req.url, true);

  var qdata = q.query;

  if (qdata.userId == null){
    return;
  }

  if (qdata.deviceId == null){
    return;
  }



  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { userId: qdata.userId, deviceId: qdata.deviceId};

    dbo.collection("devices").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);

      db.close();
    });

  });

})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

 