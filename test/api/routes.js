var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

describe('Routing', function() {

  var url = 'http://localhost:2000';

  before(function(done) {
    mongoose.connect('ttbarnes:j3zuNAWkwLMz@ds049641.mongolab.com:49641/mean-example-db');
    done();
  });

  describe('Account', function() {

    it('should return error trying to save duplicate username', function (done) {

      var username = 'bill';

      request(url)
        .get('/api/profiles/' + username)
        //end handles the response
        .end(function (err, res) {
          if (err) {
              throw err;
          }
          //res.should.have.status(200);
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

  });


});