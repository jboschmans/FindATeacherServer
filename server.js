var mongo = require('mongodb').MongoClient;
var app = require('express')();
var cors = require('cors');
var url = "mongodb://jorisboschmans:ITrules4565@ds029635.mlab.com:29635/jorisboschmans-mydb";
var col = "findateacherserver";

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Origin", "http://findateacher.atwebpages.com");
//  res.header("Access-Control-Allow-Headers", "*");
//  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/

app.use(cors());
app.options('*', cors());

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


app.get('/insert', function(req, res){
  //res.send(JSON.stringify(req.body));
  mongo.connect(url, function(err, db){
    if (err) res.send("1");

    db.collection(col).insert({
      id: req.params.id,
      plaats: req.params.plaats
    }, function(err, doc){
      if (err) res.send("2");

      res.send(JSON.stringify(doc));
    });
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Listening.....');
});
