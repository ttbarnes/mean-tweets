//usage eg:
//
//userProfileService.user('support2').getList().then(function (user){ ... });
//

angular.module('meanExampleApp').factory('userProfileService', function (Restangular){

    return {
      user: function(username) {
        return Restangular.all('api/profiles/' + username );
      }
    }

  });