
var expect = require('chai').expect;
var request = require('request');

describe('Find A Teacher Server', function(){

  describe('get search per plaats en titel', function(){

    var url = "http://localhost:3000/search/gent/e";

    it('status code 200', function(done){
      request(url, function(err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('status message OK', function(done){
      request(url, function(err, res, body){
        expect(res.statusMessage).to.equal("OK");
        done();
      });
    });

    it('content-type text/html', function(done){
      request(url, function(err, res, body){
        expect(res.headers['content-type'].substring(0,9)).to.equal("text/html");
        done();
      });
    });
  });



  describe('get id per id', function(){

    var url = "http://localhost:3000/id/qdbfvdvqfdqb";

    it('status code 200', function(done){
      request(url, function(err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('status message OK', function(done){
      request(url, function(err, res, body){
        expect(res.statusMessage).to.equal("OK");
        done();
      });
    });

    it('content-type text/html', function(done){
      request(url, function(err, res, body){
        expect(res.headers['content-type'].substring(0,9)).to.equal("text/html");
        done();
      });
    });
  });




  describe('get login per email', function(){

    var url = "http://localhost:3000/login/jorisboschmans@gmail.com";

    it('status code 200', function(done){
      request(url, function(err, res, body){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it('status message OK', function(done){
      request(url, function(err, res, body){
        expect(res.statusMessage).to.equal("OK");
        done();
      });
    });

    it('content-type text/html', function(done){
      request(url, function(err, res, body){
        expect(res.headers['content-type'].substring(0,9)).to.equal("text/html");
        done();
      });
    });
  });

});




//


/*
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Find A Teacher Server', function(){
  it('get search per plaats en titel', function(done){
    chai.request(server)
      .get('/search/gent/e')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
});
*/
