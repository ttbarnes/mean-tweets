var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');

var testTweet = {
  username: 'bill',
  copy: 'api test tweet!',
  image:{
    url: 'http://random.org/someimage.jpg'
  },
  timestamp: new Date().toISOString()
};

describe('tweets', function() {

  var url = 'http://localhost:2000/';

  describe('POST', function(){

    it('should be successful have return a message', function (done){
      request(url)
        .post('api/tweets')
        .send(testTweet)
        .end(function (err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('status', 200);
          res.body.should.have.property('message', 'Tweet created!');
          done();
        })
    });

    it('should have with the correct properties', function (done){
      request(url)
        .post('api/tweets')
        .send(testTweet)
        .end(function (err, res){
          if (err) {
            throw err;
          }
          res.request._data.should.have.property('username', testTweet.username);
          res.request._data.should.have.property('copy', testTweet.copy);
          res.request._data.should.have.property('timestamp');
          res.request._data.should.have.propertyByPath('image', 'url').eql(testTweet.image.url);
          done();
        })
    });

  });

});