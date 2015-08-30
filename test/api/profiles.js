var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');
var _        = require('lodash-node');
var helpers  = require('./helpers');

var testProfiles = function(){

  var tweetIdToFavRetweet;

  describe('profiles', function() {

    before(function (done){
      helpers.postProfiles();
      done();
    });

    after(function (done){
      helpers.deleteProfiles();
      helpers.deleteTweets();
      done();
    });

    //todo: test GET 

    describe('POST success', function(){

      it('should be successful', function (done){
        request(helpers.url)
          .post('api/profiles/' + helpers.mockProfiles.boris.username)
          .send(helpers.mockProfiles.boris)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request._data.should.have.property('username', helpers.mockProfiles.boris.username);
            done();
          })
      });

    });

    describe('POST failure', function(){

      it('should throw a 404', function (done){
        request(helpers.url)
          .post('api/profiles/' + helpers.mockProfiles.boris.username)
          .expect(404)
          .send(helpers.mockProfiles.boris)
          .end(function (err, res){
            res.should.have.property('status', 404);
            res.request._data.should.have.property('username', helpers.mockProfiles.boris.username);
            done();
          })
      });

    });

    describe('details', function(){

      describe('PUT success', function(){

        it('should be successful', function (done){
          request(helpers.url)
          .put('api/profiles/' + helpers.mockProfiles.bill.username + '/details')
          .send(helpers.mockProfiles.put.details)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request._data.should.have.properties('about', 'location', 'websiteUrl');
            res.request._data.should.have.property('about', helpers.mockProfiles.put.details.about);
            res.request._data.should.have.property('location', helpers.mockProfiles.put.details.location);
            res.request._data.should.have.property('websiteUrl', helpers.mockProfiles.put.details.websiteUrl);
            done();
          });
        });

      });

    });

    describe('following, followers', function(){

      var newFollowings = {
        userFollower: helpers.mockProfiles.bill.username,
        userFollowing: helpers.mockProfiles.ben.username
      };

      describe('following PUT success', function(){

        it('should be successful', function (done){
          request(helpers.url)
          .put('api/profiles/' + newFollowings.userFollower + '/following')
          .send(newFollowings)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            request(helpers.url)
            .get('api/profiles/' + newFollowings.userFollower)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.body[0].following[0].should.have.property('username', newFollowings.userFollowing);
              done();
            })

          });
        });

      });

      describe('followers PUT success', function(){

        it('should be successful', function (done){

          var newFollowings = {
            userFollower: helpers.mockProfiles.bill.username,
            userFollowing: helpers.mockProfiles.ben.username
          };

          request(helpers.url)
          .put('api/profiles/' + newFollowings.userFollowing + '/followers')
          .send(newFollowings)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            request(helpers.url)
            .get('api/profiles/' + newFollowings.userFollowing)
            .end(function (err, res){
              if (err) {
                throw err;
              }
              res.body[0].followers[0].should.have.property('username', newFollowings.userFollower);
              done();
            })
          });
        });

      });

    });

    describe('username tweets', function(){

      before(function (done){
        helpers.postAndGetTweets(function (data) {
          tweetIdToFavRetweet = data[1]._id;
          done();
        });
      });

      describe('GET success', function(){

        it('should be successful', function (done){
          request(helpers.url)
          .get('api/profiles/' + helpers.mockUsernames.tweeterC + '/tweets')
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.body.should.not.be.empty();
            res.body.should.be.an.Array();
            res.body[0].should.be.an.Object();
            var resUsernames = _.uniq(_.pluck(res.body, 'username'));
            helpers.mockUsernames.tweeterC.should.containDeep(resUsernames);
            done();
          })

        });

      });

      describe('GET failure', function(){

        it('should throw a 404', function (done){
          request(helpers.url)
          .get('api/profiles/' + helpers.mockUsernames.fail + '/tweets')
          .expect(404)
          .end(function (err, res){
            res.should.have.property('status', 404);
            res.body.should.have.property('message', helpers.mockUsernames.fail + ' hasn\'t tweeted yet.' );
            done();
          })

        });

      });

      describe('favourites', function(){

        describe('PUT success', function(){

          it('should successfully put a tweet\'s id in a user\'s favourites array', function (done){
            request(helpers.url)
            .put('api/profiles/' + helpers.mockUsernames.tweeterC + '/tweets/favourites/' + tweetIdToFavRetweet)
            .end(function (err, res){
              res.should.have.property('status', 200);
              request(helpers.url)
              .get('api/profiles/' + helpers.mockUsernames.tweeterC)
              .end(function (err, res){
                if(err) {
                  throw err;
                }
                res.body[0].favourites[0].should.have.property('tweetId', tweetIdToFavRetweet);
                done();
              })
            })

          });

        });

        //todo: test delete


      });

    });

  });

};

exports = testProfiles();