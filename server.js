var mongo = require('mongodb').MongoClient;
var app = require('express')();
var cors = require('cors');
var url = "mongodb://jorisboschmans:ITrules4565@ds029635.mlab.com:29635/jorisboschmans-mydb";
var col = "findateacherserver";

app.use(cors());

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

app.get('/id/:id', function(req, res){
  var _id = req.params.id;
  mongo.connect(url, function(err, db){
    if (err) throw err;
    db.collection(col).find({
      id: _id
    }).toArray(function(err, docs){
      if (err) throw err;
      res.send(JSON.stringify(docs));
    });
  });
});

app.get('/login/:email', function (req, res){
  var _email = req.params.email;
  mongo.connect(url, function (err, db){
    if (err) throw err;
    db.collection(col).find()
      .toArray(function(err, docs){
        if (err) return next(err);
        var doc = {};
        for (var i = 0; i < docs.length; i++){
          if (docs[i].email === _email){
            doc = docs[i];
            break;
          }
        }
        if (!doc.email){
          res.send(JSON.stringify({email: null}));
        } else {
          res.send(JSON.stringify({
            email: doc.email,
            wachtwoord: doc.wachtwoord
          }));
        }
    });
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Listening.....');
});
