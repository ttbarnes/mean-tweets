var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');
var _        = require('lodash-node');

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
        }
      };

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

      it('should throw a 404', function (done){
        var mockUsername = 'bill'; //username already exists
        request(url)
          .post('api/profiles/' + mockUsername)
          .expect(404)
          .send(mockProfiles.bill)
          .end(function (err, res){
            res.should.have.property('status', 404);
            //res.body.should.be.empty();
            res.request._data.should.have.property('username', mockUsername);
            done();
          })
      });

    });

  });

};

exports = testProfiles();