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

    




  });

};

exports = testProfiles();