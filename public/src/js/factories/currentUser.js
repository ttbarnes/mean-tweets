'use strict';

//usage eg:
//
//currentUserFactory.username
//

angular.module('meanTweetsApp').factory('currentUserFactory', function (auth){

    var isAuth = false; //jshint ignore:line
    var user = false;

    if(auth.isAuthenticated === true) {

      var authUsername = auth.profile.nickname;

      console.info('currentUser: ' + authUsername);

      user = {
        isAuth : true,
        username : authUsername
      };

    }

    return user;

  });