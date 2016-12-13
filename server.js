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
//app.options('*', cors());

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


app.get('/insert/:id/:naam/:wachtwoord/:plaats/:titel/:uitleg/:prijs/:aleerkrachtThuis/:aleerlingThuis/:avideochat/:cemail/:ctelefoon/:cwebsite', function(req, res){

  mongo.connect(url, function(err, db){
    if (err) throw err;
    db.collection(col).insert({
      id: this.params.id,
      naam: this.params.naam,
      wachtwoord: this.params.wachtwoord,
      plaats: this.params.plaats,
      titel: this.params.titel,
      uitleg: this.params.uitleg,
      prijs: this.params.prijs,
      afspraakManieren: {
        leerkrachtThuis: this.params.leerkrachtThuis,
        leerlingThuis: this.params.leerlingThuis,
        videochat: this.params.videochat
      },
      contact: {
        email: this.params.email,
        telefoon: this.params.telefoon,
        website: this.params.website
      }
    }, function(err, doc){
      if (err) throw err;
      res.send(JSON.stringify(doc));
    });
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Listening.....');
});
