var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');

var testTweets = function(){

  var url = 'http://localhost:2000/',
      tweetIdFailure = 'asdf1234qwer', //random, hardcoded tweet ID that would never be generated
      mockImageUrl = 'http://random.org/someimage.jpg',
      mockUsername = {
        tweeterA  : 'bill',
        tweeterB  : 'ben',
        tweeterC  : 'boris',
        favouriter: 'james',
        retweeter : 'john'
      },
      mockTweets = {
        post: {
          username: mockUsername.tweeterA,
          copy: 'api test tweet!',
          image:{
            url: mockImageUrl
          },
          timestamp: new Date().toISOString()
        },
        put: {
          username: mockUsername.tweeterA,
          copy: 'some new text - I did not like my previous version.',
          image:{
            url: mockImageUrl
          },
          timestamp: new Date().toISOString()
        },
        a: {
          username: mockUsername.tweeterA,
          copy: 'hi guys',
          timestamp: new Date().toISOString()
        },
        b: {
          username: mockUsername.tweeterB,
          copy: 'hello world',
          timestamp: new Date().toISOString()
        },
        c: {
          username: mockUsername.tweeterC,
          copy: 'whats up',
          timestamp: new Date().toISOString()
        }
      };

  describe('tweets', function() {

    before(function(){
      //post some tweets - how to do bulk post/import with mongoose?
      request(url)
      .post('api/tweets')
        .send(mockTweets.post)
        .send(mockTweets.post)
        .end(function (err){
          if (err) {
            throw err;
          }
          request(url)
          .post('api/tweets')
            .send(mockTweets.a)
            .send(mockTweets.b)
            .send(mockTweets.c)
            .end(function (err){
              if (err) {
                throw err;
              }
            })
        })
    });

    beforeEach(function(){
      //get some tweets
      request(url)
        .get('api/profiles/' + mockTweets.post.username + '/tweets')
          .end(function (err, res){
            if (err) {
              throw err;
            }
            tweetIdSuccess        = res.body[0]._id;
            tweetIdToFavRetweet   = res.body[1]._id;
            if(res.body[2]){
              tweetIdToUpdate     = res.body[2]._id;
            }
          })
    });

    after(function(){
      //delete all tweets
      request(url)
        .delete('api/test/tweets/all')
        .end(function (err){
          if (err) {
            throw err;
          }
        })
    });

    describe('POST', function(){

      it('should be successful and return a message', function (done){
        request(url)
          .post('api/tweets')
          .send(mockTweets.post)
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
          .send(mockTweets.post)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.request._data.should.have.property('username', mockTweets.post.username);
            res.request._data.should.have.property('copy', mockTweets.post.copy);
            res.request._data.should.have.property('timestamp');
            res.request._data.should.have.propertyByPath('image', 'url').eql(mockTweets.post.image.url);
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
            res.body.should.have.property('username', mockTweets.post.username);
            res.body.should.have.property('copy', mockTweets.post.copy);
            res.body.should.have.property('timestamp');
            res.body.should.have.propertyByPath('image', 'url').eql(mockTweets.post.image.url);
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
          .send(mockTweets.put)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request._data.copy.should.equal(mockTweets.put.copy);
            res.body.should.have.property('message', 'Tweet updated!');
            done();
          });
        });

      });

      describe('favourites', function(){

        describe('PUT success', function(){

          it('should successfully put a username in the tweet\'s favourites array', function (done){
            var mockNewFavourite = {
              username: mockUsername.favouriter
            };
            request(url)
            .put('api/tweets/' + tweetIdToFavRetweet + '/favourites')
            .send(mockNewFavourite)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.should.have.property('status', 200);
              res.body.should.have.property('username', mockUsername.tweeterA);

              request(url)
                .get('api/tweets/' + tweetIdToFavRetweet)
                .end(function (err, res){
                  if (err) {
                    throw err;
                  }
                  res.body.favourites[0].should.have.property('username', mockUsername.favouriter);
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
              username: mockUsername.retweeter
            };
            request(url)
            .put('api/tweets/' + tweetIdToFavRetweet + '/retweets')
            .send(mockNewRetweet)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.should.have.property('status', 200);
              res.body.should.have.property('username', mockUsername.tweeterA);
              
              request(url)
                .get('api/tweets/' + tweetIdToFavRetweet)
                .end(function (err, res){
                  if (err) {
                    throw err;
                  }
                  res.body.retweets[0].should.have.property('username', mockUsername.retweeter);
                  done();
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