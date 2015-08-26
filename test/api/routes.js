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

    it('should be successful and return a message', function (done){
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

  describe('tweet_id', function(){

    var tweetIdSuccess = '55dc55f1cbb2bb2c1bb7d241', //random tweet from test db
        tweetIdFailure = 'asdf1234wxyz';

    describe('GET success', function(){

      it('should return tweet data', function (done){
        request(url)
        .get('api/tweets/' + tweetIdSuccess)
        .end(function (err, res){
          if (err) {
            throw err;
          }
          res.should.have.property('status', 200);
          should.exist(res.body);
          done();
        })
      });

      it('should return correct properties', function (done){
        request(url)
        .get('api/tweets/' + tweetIdSuccess)
        .end(function (err, res){
          if (err) {
            throw err;
          }
          res.body.should.have.property('username', testTweet.username);
          res.body.should.have.property('copy', testTweet.copy);
          res.body.should.have.property('timestamp');
          res.body.should.have.propertyByPath('image', 'url').eql(testTweet.image.url);
          res.body.should.have.property('favourites');
          res.body.should.have.property('retweets');
          done();
        })
      });

      it('should return empty favourites and retweets arrays', function (done){
        request(url)
        .get('api/tweets/' + tweetIdSuccess)
        .end(function (err, res){
          if (err) {
            throw err;
          }
          res.body.favourites.should.have.length(0);
          res.body.retweets.should.have.length(0);
          done();
        })
      });

    });

    describe('GET failure', function(){

      it('should not return tweet data', function (done){
        request(url)
        .get('api/tweets/' + tweetIdFailure)
        .expect(404)
        .end(function (err, res){
          res.should.have.property('status', 404);
          res.should.have.property('text', 'tweet ID ' + tweetIdFailure + ' could not be found.');
          res.body.should.be.empty();
          done();
        })

      });

    });

  });

});
