module.exports = function(app) {

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {

    // @ifdef DEVELOPMENT
    res.sendfile('./public/src/index.html');
    // @endif

    // @ifdef PRODUCTION
    res.sendfile('./public/src/dist/index.html');
    // @endif

  });

};