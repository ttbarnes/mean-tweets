var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');
var _        = require('lodash-node');
var helpers  = require('./helpers');

var testTweets = function(){

  var tweetIdFailure = 'asdf1234qwer', //random, hardcoded tweet ID that would never be generated
      tweetIdSuccess,
      tweetIdToFavRetweet,
      tweetIdToUpdate;

  describe('tweets', function() {

    before(function (done){
      helpers.postAndGetTweets(function (data) {
        tweetIdSuccess      = data[0]._id;
        tweetIdToFavRetweet = data[1]._id;
        tweetIdToUpdate     = data[2]._id;
        done();
      });
    });

    after(function (done){
      helpers.deleteTweets();
      done();
    });

    describe('tweet_id', function(){

      describe('GET success', function(){

        it('should return tweet data', function (done){
          request(helpers.url)
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
          request(helpers.url)
          .get('api/tweets/' + tweetIdSuccess)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.body.should.have.property('username', helpers.mockTweets.post.username);
            res.body.should.have.property('copy', helpers.mockTweets.post.copy);
            res.body.should.have.property('timestamp');
            res.body.should.have.propertyByPath('image', 'url').eql(helpers.mockTweets.post.image.url);
            res.body.should.have.property('favourites');
            res.body.should.have.property('retweets');
            done();
          })
        });

        it('should return empty favourites and retweets arrays', function (done){
          request(helpers.url)
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
          request(helpers.url)
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
          request(helpers.url)
          .put('api/tweets/' + tweetIdToUpdate)
          .send(helpers.mockTweets.put)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request._data.copy.should.equal(helpers.mockTweets.put.copy);
            res.body.should.have.property('message', 'Tweet updated!');
            done();
          });
        });

      });

      describe('favourites', function(){

        describe('PUT success', function(){

          it('should successfully put a username in the tweet\'s favourites array', function (done){
            var mockNewFavourite = {
              username: helpers.mockUsernames.favouriter
            };
            request(helpers.url)
            .put('api/tweets/' + tweetIdToFavRetweet + '/favourites')
            .send(mockNewFavourite)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.should.have.property('status', 200);
              request(helpers.url)
              .get('api/tweets/' + tweetIdToFavRetweet)
              .end(function (err, res){
                if (err) {
                  throw err;
                }
                res.body.favourites[0].should.have.property('username', helpers.mockUsernames.favouriter);
                done();
              })

            });
          });

        });

        //todo:test delete favourite id

      });

      describe('retweets', function(){

        describe('PUT success', function(){

          it('should successfully put a username in the tweet\'s retweets array', function (done){
            var mockNewRetweet = {
              username: helpers.mockUsernames.retweeter
            };
            request(helpers.url)
            .put('api/tweets/' + tweetIdToFavRetweet + '/retweets')
            .send(mockNewRetweet)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.should.have.property('status', 200);
              request(helpers.url)
              .get('api/tweets/' + tweetIdToFavRetweet)
              .end(function (err, res){
                if (err) {
                  throw err;
                }
                res.body.retweets[0].should.have.property('username', helpers.mockUsernames.retweeter);
                done();
              })

            });
          });

        });

        //todo:test delete retweet id

      });

    });

    //we test POST after the previous endpoints to avoid
    //having to re-assign tweet ids (from helper)
    describe('POST', function(){

      it('should be successful and return a message', function (done){

        request(helpers.url)
          .post('api/tweets')
          .send(helpers.mockTweets.post)
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
        request(helpers.url)
          .post('api/tweets')
          .send(helpers.mockTweets.post)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.request._data.should.have.property('username', helpers.mockTweets.post.username);
            res.request._data.should.have.property('copy', helpers.mockTweets.post.copy);
            res.request._data.should.have.property('timestamp');
            res.request._data.should.have.propertyByPath('image', 'url').eql(helpers.mockTweets.post.image.url);
            done();
          })
      });

    });

    describe('timeline', function(){ 

      describe('GET success', function(){
        var ufStart = '?userFollowing=';
        var uf = '&userFollowing=';
        var queryFollowing = ufStart + helpers.mockUsernames.tweeterA + 
                             uf      + helpers.mockUsernames.tweeterB + 
                             uf      + helpers.mockUsernames.tweeterC;

        it('should aquire a query with a list of usernames', function (done){
          request(helpers.url)
          .get('api/timeline' + queryFollowing)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request.qs.should.have.property('userFollowing');
            res.request.qs.userFollowing.should.be.an.Array();
            res.request.qs.userFollowing.length.should.be.above(2);
            res.request.url.should.equal(helpers.url + 'api/timeline' + queryFollowing);
            done();
          });
        });

        it('should only return tweets containing the requested usernames', function (done){
          request(helpers.url)
          .get('api/timeline' + queryFollowing)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            //todo: cleanup: DRY
            var tempMockUsers = [
              'bill',
              'ben',
              'boris'
            ];
            res.body.should.not.be.empty();
            var names = _.uniq(_.pluck(res.body, 'username'));
            tempMockUsers.should.containDeep(names);
            //todo: test for nested usernames in favourites/retweets.
            done();
          });

        });

      });


      describe('GET failure', function(){

        it('should throw a 404', function (done){
          request(helpers.url)
          .get('api/timeline')
          .expect(404)
          .end(function (err, res){
            res.should.have.property('status', 404);
            res.body.should.be.empty();
            done();
          });
        });

      });

    });

    describe('search', function(){ 

      describe('GET success', function(){
        var searchString = 'test tweet';

        it('should return tweet data', function (done){
          request(helpers.url)
          .get('api/search/' + searchString)
          .end(function (err, res){
            res.should.have.property('status', 200);
            res.body.should.not.be.empty();
            done();
          });
        });

        it('should only return relevant tweet data', function (done){
          request(helpers.url)
          .get('api/search/' + searchString)
          .end(function (err, res){
            var resCopy = _.uniq(_.pluck(res.body, 'copy'));
            helpers.mockTweets.post.copy.should.containDeep(resCopy);
            done();
          });
        });

      });

      describe('GET failure', function(){
        var searchString = 'asdf';

        it('should throw a 404 and not return any data', function (done){
          request(helpers.url)
          .get('api/search/'+ searchString)
          .expect(404)
          .end(function (err, res){
            res.should.have.property('status', 404);
            res.body.should.have.property('message', 'No tweets found with your search criteria. Please try something else.');
            done();
          });
        });

      });

    });

  });

};

exports = testTweets();