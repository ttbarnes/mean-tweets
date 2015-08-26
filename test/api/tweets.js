var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');

var testTweets = function(){

  var url                         = 'http://localhost:2000/',
      tweetIdSuccess              = '55dc55f1cbb2bb2c1bb7d240',    //random tweet ID from test db
      tweetIdFailure              = 'asdf1234wxyz',                //random, hardcoded tweet ID that would never be generated
      tweetIdToUpdate             = '55dc55f1cbb2bb2c1bb7d241',   //random tweet ID from test db that will be used for testing updates
      mockUsernameTweeter         = 'bill',
      mockUsernameFavouriter      = 'james',
      mockUsernameRetweeter       = 'john';

  var testTweet = {
    username: mockUsernameTweeter,
    copy: 'api test tweet!',
    image:{
      url: 'http://random.org/someimage.jpg'
    },
    timestamp: new Date().toISOString()
  };

  var testTweetPutCopy = {
    username: mockUsernameTweeter,
    copy: 'some new text - I did not like my previous version.',
    image:{
      url: 'http://random.org/someimage.jpg'
    },
    timestamp: new Date().toISOString()
  };


  describe('tweets', function() {

    before(function(){
      //delete all tweets
      request(url)
      .delete('api/tweets/all/delete')
      .end(function (err, res){
        if (err) {
          throw err;
        }
      })
    });

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

      it('should have the correct properties', function (done){
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
/*
    describe('tweet_id', function(){

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

      describe('PUT success', function(){

        it('should successfully update a tweets copy and return a message', function (done){
          request(url)
          .put('api/tweets/' + tweetIdToUpdate)
          .send(testTweetPutCopy)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request._data.copy.should.equal(testTweetPutCopy.copy);
            res.body.should.have.property('message', 'Tweet updated!');
            done();
          });
        });

      });

      //todo: test delete tweet
      //how to handle tweet ids for such a scenario?
      //I think we want to add some pre test functions/methods or helpers here:
      //eg create 4 new tweets for: POST success and failure, PUT, DELETE
      //otherwise, if we delete tweet id X, next time the tests run tweet id X will 404.
      //test functions would also need tweets from different usernames, and follower/following data, especially for the timeline.
      //maybe this should be done with shell script


      describe('favourites', function(){

        describe('PUT success', function(){

          it('should successfully put a username in the tweet\'s favourites array', function (done){
            var mockNewFavourite = {
              username: mockUsernameFavouriter
            };
            request(url)
            .put('api/tweets/' + tweetIdToUpdate + '/favourites')
            .send(mockNewFavourite)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.should.have.property('status', 200);
              res.body.should.have.property('username', mockUsernameTweeter);
              res.body.favourites[0].should.have.property('username', mockUsernameFavouriter);
              done();
            });
          });

        });

        //todo:test delete favourite id

      });

      describe('retweets', function(){

        describe('PUT success', function(){

          it('should successfully put a username in the tweet\'s retweets array', function (done){
            var mockNewRetweet = {
              username: mockUsernameRetweeter
            };
            request(url)
            .put('api/tweets/' + tweetIdToUpdate + '/retweets')
            .send(mockNewRetweet)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.should.have.property('status', 200);
              res.body.should.have.property('username', mockUsernameTweeter);
              res.body.retweets[0].should.have.property('username', mockUsernameRetweeter);
              done();
            });
          });

        });

        //todo:test delete retweet id

      });

    });
  */
    //todo: timeline tests (require initial db data tasks)
    //describe('timeline', function(){ });

    //todo: search tests (require initial db data tasks)
    //describe('search', function(){ });

  });

};

exports = testTweets();