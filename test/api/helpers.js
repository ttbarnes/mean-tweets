var should   = require('should');
var assert   = require('assert');
var request  = require('supertest');
var mongoose = require('mongoose');

var url      = 'http://localhost:2000/',
    imageUrl = 'http://random.org/someimage.jpg',
    newDate  = new Date().toISOString(),
    mockUsernames = {
      tweeterA  : 'bill',
      tweeterB  : 'ben',
      tweeterC  : 'boris',
      favouriter: 'james',
      retweeter : 'john'
    },
    mockTweets = {
      post: {
        username: mockUsernames.tweeterA,
        copy: 'api test tweet!',
        image:{ url: imageUrl },
        timestamp: newDate
      },
      put: {
        username: mockUsernames.tweeterA,
        copy: 'some new text - I did not like my previous version.',
        image:{ url: imageUrl },
        timestamp: newDate
      },
      a: {
        username: mockUsernames.tweeterA,
        copy: 'hi guys',
        timestamp: newDate
      },
      b: {
        username: mockUsernames.tweeterB,
        copy: 'hello world',
        timestamp: newDate
      },
      c: {
        username: mockUsernames.tweeterC,
        copy: 'whats up',
        timestamp: newDate
      }
    },
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

exports.url = url;
exports.imageUrl = imageUrl;
exports.mockUsernames = mockUsernames;
exports.mockTweets = mockTweets;
exports.mockProfiles = mockProfiles;


//how to do bulk post/import with mongoose?
exports.postProfiles = function(data){
  request(url)
  .post('api/profiles/' + mockProfiles.bill.username)
    .send(mockProfiles.bill)
    .end(function (err){
      if (err) {
        throw err;
      }
      request(url)
      .post('api/profiles/' + mockProfiles.ben.username)
      .send(mockProfiles.ben)
        .end(function (err){
          if (err) {
            throw err;
          }
        })
    })
};

//how to do bulk post/import with mongoose?
exports.postAndGetTweets = function(data){
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
      request(url)
      .get('api/test/tweets/all')
      .end(function (err, res){
        if (err) {
          data(err);
        }
        data(res.body);
      })
    })
  })
};

exports.deleteProfiles = function(){
  request(url)
  .delete('api/test/profiles/all')
  .end(function (err){
    if (err) {
      throw err;
    }
  })
};


exports.deleteTweets = function(){
  request(url)
  .delete('api/test/tweets/all')
  .end(function (err){
    if (err) {
      throw err;
    }
  })
};
