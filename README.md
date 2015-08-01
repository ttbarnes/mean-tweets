# mean-tweets

[Demo](http://mean-tweets.herokuapp.com)

WIP :-)

##quick start

1) Install the dependencies: `npm install && bower install`

2) Start the server: `grunt` (port 2000)

If you have your own mongo db, update the url in `server.js` or use [dotenv](https://github.com/motdotla/dotenv).

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
- Heroku


##grunt tasks

- start server: `grunt` (runs tests, watches for changes). Without grunt: `node server.js`

- run tests:`grunt test`


##test credentials

- test1@test.com
- test2@test.com
- bill@test.com
- ben@test.com

password is the obvious.


##api

####tweets

POST   `/api/tweets` - post a single tweet. Accepts: copy, username, image.url. Timestamp is generated in back-end.

GET    `/api/tweets/username` - return all tweets by username.

GET    `/api/tweets/tweet_id` - return a single tweet with the tweet_id param.

PUT    `/api/tweets/tweet_id` - update a tweet with the tweet_id param.

DELETE `/api/tweets/tweet_id` - delete a tweet with the tweet_id param.

PUT    `/api/tweets/:tweet_id/favourites`

DELETE `/api/tweets/:tweet_id/favourites/fav_tweet_id` 

PUT    `/api/tweets/:tweet_id/retweets`

DELETE `/api/tweets/:tweet_id/retweets/retweet_id`

####timeline


GET    `/api/timeline` - searches and returns tweets with usernames from a query: `?userFollowing=bill&userFollowing=ben`

####search


GET    `/api/search/someString` - searches and returns tweets containing someString.


####profiles

GET    `/api/profiles/username` - return a single user with the provided username param.

POST   `/api/profiles/username` - post a new user object: username: String, following: `[{ username: String }], followers: [{ username: String }]`

POST   `/api/profiles/username/details` - public profile details

PUT    `/api/profiles/username/following` - post a new following with username param.

PUT    `/api/profiles/username/followers` - post a new follower with username param.

PUT    `/api/profiles/username/tweets/favourites/tweet_id`

DELETE `/api/profiles/username/tweets/favourites/tweet_id`

PUT    `/api/profiles/username/tweets/retweets/tweet_id`


