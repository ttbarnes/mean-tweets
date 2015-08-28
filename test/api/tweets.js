var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');
var _        = require('lodash-node');

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
            .end(function (err){
              if (err) {
                throw err;
              }
            })
            request(url)
            .post('api/tweets')
              .send(mockTweets.c)
              .end(function (err){
                if (err) {
                  throw err;
                }
              })
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


    describe('timeline', function(){ 

      describe('GET success', function(){
        var ufStart = '?userFollowing=';
        var uf = '&userFollowing=';
        var queryFollowing = ufStart + mockUsername.tweeterA + 
                             uf      + mockUsername.tweeterB + 
                             uf      + mockUsername.tweeterC;

        it('should aquire a query with a list of usernames', function (done){
          request(url)
          .get('api/timeline' + queryFollowing)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request.qs.should.have.property('userFollowing');
            res.request.qs.userFollowing.should.be.an.Array();
            res.request.qs.userFollowing.length.should.be.above(2);
            res.request.url.should.equal(url + 'api/timeline' + queryFollowing);
            done();
          });
        });

        it('should only return tweets containing the requested usernames', function (done){
          request(url)
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
          request(url)
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
          request(url)
          .get('api/search/' + searchString)
          .end(function (err, res){
            res.should.have.property('status', 200);
            res.body.should.not.be.empty();
            done();
          });
        });

        it('should only return relevant tweet data', function (done){
          request(url)
          .get('api/search/' + searchString)
          .end(function (err, res){
            var resCopy = _.uniq(_.pluck(res.body, 'copy'));
            mockTweets.post.copy.should.containDeep(resCopy);
            done();
          });
        });

      });

      describe('GET failure', function(){
        var searchString = 'asdf';

        it('should throw a 404 and not return any data', function(){
          request(url)
          .get('api/search/'+ searchString)
          .expect(404)
          .end(function (err, res){
            res.should.have.property('status', 404);
            res.body.should.be.empty();
            res.body.should.have.property('message', 'No tweets found with your search criteria. Please try something else.');
            done();
          });
        });

      });

    });

  });

};

exports = testTweets();