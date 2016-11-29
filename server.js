var mongo = require('mongodb').MongoClient;
var app = require('express')();
var url = "mongodb://jorisboschmans:ITrules4565@ds029635.mlab.com:29635/jorisboschmans-mydb";
var col = "findateacherserver";

app.get('/search/:plaats/:titel', function(req, res){
  var _plaats = req.params.plaats;
  var _titel = req.params.titel;
  mongo.connect(url, function(err, db){
    if (err) throw err;
    var plaatsRegex = new RegExp(["^", _plaats, "$"].join(""), "i");
    var titelRegex = new RegExp(_titel, "i");
    db.collection(col).find({
      plaats: plaatsRegex,
      titel: titelRegex
    }).toArray(function(err, docs){
      if (err) throw err;
      res.send(JSON.stringify(docs));
    });
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Example app listening on port 3000');
});
