var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');

var testTweets = function(){

  var url                         = 'http://localhost:2000/',
      tweetIdFailure              = 'asdf1234qwer', //random, hardcoded tweet ID that would never be generated
      mockUsernameTweeter         = 'bill',
      mockUsernameFavouriter      = 'james',
      mockUsernameRetweeter       = 'john',
      mockTweets = {
        compose : {
          username: mockUsernameTweeter,
          copy: 'api test tweet!',
          image:{
            url: 'http://random.org/someimage.jpg'
          },
          timestamp: new Date().toISOString()
        },
        update: {
          username: mockUsernameTweeter,
          copy: 'some new text - I did not like my previous version.',
          image:{
            url: 'http://random.org/someimage.jpg'
          },
          timestamp: new Date().toISOString()
        }
      };

  describe('tweets', function() {

    before(function(){

      //delete all tweets
      request(url)
        .delete('api/test/tweets/all')
        .end(function (err){
          if (err) {
            throw err;
          }
        })

      //post some tweets
      request(url)
      .post('api/tweets')
        .send(mockTweets.compose)
        .send(mockTweets.compose)
        .end(function (err){
          if (err) {
            throw err;
          }

        })

    });

    beforeEach(function(){
      //get some tweets
      request(url)
        .get('api/profiles/' + mockTweets.compose.username + '/tweets')
          .end(function (err, res){
            if (err) {
              throw err;
            }
            tweetIdSuccess        = res.body[0]._id;
            tweetIdToUpdate       = tweetIdSuccess;
            tweetIdToFavRetweet   = res.body[1]._id;
          })
    });


    describe('POST', function(){

      it('should be successful and return a message', function (done){
        request(url)
          .post('api/tweets')
          .send(mockTweets.compose)
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
          .send(mockTweets.compose)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.request._data.should.have.property('username', mockTweets.compose.username);
            res.request._data.should.have.property('copy', mockTweets.compose.copy);
            res.request._data.should.have.property('timestamp');
            res.request._data.should.have.propertyByPath('image', 'url').eql(mockTweets.compose.image.url);
            done();
          })
      });

    });

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
            res.body.should.have.property('username', mockTweets.compose.username);
            res.body.should.have.property('copy', mockTweets.compose.copy);
            res.body.should.have.property('timestamp');
            res.body.should.have.propertyByPath('image', 'url').eql(mockTweets.compose.image.url);
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
          .send(mockTweets.update)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request._data.copy.should.equal(mockTweets.update.copy);
            res.body.should.have.property('message', 'Tweet updated!');
            done();
          });
        });

      });

      describe('favourites', function(){

        describe('PUT success', function(){

          it('should successfully put a username in the tweet\'s favourites array', function (done){
            var mockNewFavourite = {
              username: mockUsernameFavouriter
            };
            request(url)
            .put('api/tweets/' + tweetIdToFavRetweet + '/favourites')
            .send(mockNewFavourite)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.should.have.property('status', 200);
              res.body.should.have.property('username', mockUsernameTweeter);

              request(url)
                .get('api/tweets/' + tweetIdToFavRetweet)
                .end(function (err, res){
                  if (err) {
                    throw err;
                  }
                  res.body.favourites[0].should.have.property('username', mockUsernameFavouriter);
                  done()
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
              username: mockUsernameRetweeter
            };
            request(url)
            .put('api/tweets/' + tweetIdToFavRetweet + '/retweets')
            .send(mockNewRetweet)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.should.have.property('status', 200);
              res.body.should.have.property('username', mockUsernameTweeter);
              
              request(url)
                .get('api/tweets/' + tweetIdToFavRetweet)
                .end(function (err, res){
                  if (err) {
                    throw err;
                  }
                  res.body.retweets[0].should.have.property('username', mockUsernameRetweeter);
                  done()
                })

            });
          });

        });

        //todo:test delete retweet id

      });

    });

    //todo: timeline tests (require initial db data tasks)
    //describe('timeline', function(){ });

    //todo: search tests (require initial db data tasks)
    //describe('search', function(){ });

  });

};

exports = testTweets();