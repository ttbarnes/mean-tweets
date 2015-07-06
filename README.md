# mean-example


WIP - soon there will be a real readme file, for the time being here are some notes.

<img src="http://g.recordit.co/Kx3mKhrPrU.gif" />

##quick start

1) Install the dependencies: `npm install && bower install`

2) Run the server: `grunt` or `node server.js` (port 2000)


##tech

- MEAN stack: MongoDB, Express, Angular, Node.js
- Angular services/modules
  - ui-router
  - restangular
  - angular-moment
  - ui-router-title
- MongoDB, Mongoose
- Auth0
- Grunt
- Karma
- Jasmine
- ngDialog
- Font awesome


##quick notes

- Run unit tests: `grunt karma` or `karma start public/karma.conf.js`

###test credentials

- test1@test.com

- test2@test.com

Password is the obvious.


###api routes

GET    `/api/tweets` - returns all tweets.

POST   `/api/tweets` - post a single tweet. Accepts: copy, username, image.url. Timestamp is automatically generated by the server.


GET    `/api/search`

GET    `/api/search/someString` - searches and returns tweets containing someString.


GET    `/api/profiles/username` - return a single user with the provided username param.

POST   `/api/profiles/username` - post a new user object: username: String, following: `[{ username: String }], followers: [{ username: String }]`

PUT    `/api/profiles/username/following` - post a new following with username param.

PUT    `/api/profiles/username/followers` - post a new follower with username param.



GET    `/api/tweets/username` - return all tweets by username.

GET    `/api/tweets/tweet_id` - return a single tweet with the tweet_id param.

PUT    `/api/tweets/tweet_id` - update a tweet with the tweet_id param.

DELETE `/api/tweets/tweet_id` - delete a tweet with the tweet_id param.


