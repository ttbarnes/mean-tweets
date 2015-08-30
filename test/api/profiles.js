var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');
var _        = require('lodash-node');
var helpers  = require('./helpers');

var testProfiles = function(){

  var url = 'http://localhost:2000/',
      mockProfiles = {
        bill: {
          username: 'bill'
        },
        ben: {
          username: 'ben'
        },
        boris: {
          username: 'boris'
        },
        put:{
          details: {
            about: 'I do not like flower pots',
            location: 'Various gardens',
            websiteUrl: 'http://billnotben.com'
          }
        }
      },
      profileToUpdate = mockProfiles.bill.username;

  describe('profiles', function() {

    before(function(){
      //post some profiles - how to do bulk post/import with mongoose?
      request(url)
      .post('api/profiles/bill')
        .send(mockProfiles.bill)
        .end(function (err){
          if (err) {
            throw err;
          }
          request(url)
          .post('api/profiles/ben')
          .send(mockProfiles.ben)
            .end(function (err){
              if (err) {
                throw err;
              }
            })
        })
    });

    after(function(){
      //delete all profiles
      request(url)
        .delete('api/test/profiles/all')
        .end(function (err){
          if (err) {
            throw err;
          }
        })
    });

    //todo: test GET 

    describe('POST success', function(){

      var mockNewUser = {
        username: 'boris'
      }

      it('should be successful', function (done){
        request(url)
          .post('api/profiles/' + mockNewUser.username)
          .send(mockNewUser)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request._data.should.have.property('username', mockNewUser.username);
            done();
          })
      });

    });

    describe('POST failure', function(){
      
      var mockNewUser = {
        username: 'boris'
      }


      it('should throw a 404', function (done){
        request(url)
          .post('api/profiles/' + mockNewUser.username)
          .expect(404)
          .send(mockNewUser)
          .end(function (err, res){
            res.should.have.property('status', 404);
            res.request._data.should.have.property('username', mockNewUser.username);
            done();
          })
      });

    });

    describe('details', function(){

      describe('PUT success', function(){

        it('should be successful', function (done){
          request(url)
          .put('api/profiles/' + mockProfiles.bill.username + '/details')
          .send(mockProfiles.put.details)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            res.request._data.should.have.properties('about', 'location', 'websiteUrl');
            res.request._data.should.have.property('about', mockProfiles.put.details.about);
            res.request._data.should.have.property('location', mockProfiles.put.details.location);
            res.request._data.should.have.property('websiteUrl', mockProfiles.put.details.websiteUrl);
            done();
          });
        });

      });

    });

    describe('following, followers', function(){

      var newFollowings = {
        userFollower: mockProfiles.bill.username,
        userFollowing: mockProfiles.ben.username
      };

      describe('following PUT success', function(){

        it('should be successful', function (done){
          request(url)
          .put('api/profiles/' + newFollowings.userFollower + '/following')
          .send(newFollowings)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            request(url)
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
            userFollower: mockProfiles.bill.username,
            userFollowing: mockProfiles.ben.username
          };

          request(url)
          .put('api/profiles/' + newFollowings.userFollowing + '/followers')
          .send(newFollowings)
          .end(function (err, res){
            if (err) {
              throw err;
            }
            res.should.have.property('status', 200);
            request(url)
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

    //describe('username tweets', function(){ });

  });

};

exports = testProfiles();