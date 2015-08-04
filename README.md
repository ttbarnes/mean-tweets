#Mean tweets

Mini Twitter with MEAN. [Demo](https://mean-tweets.herokuapp.com)

I built this app in order to learn more about Node, Express and MongoDB. I hope it helps others do the same :-)

##Prerequisites

- [ruby](https://www.ruby-lang.org/en/documentation/installation/)
- [node.js](http://nodejs.org/)
- [bower](http://bower.io/)


##Quick start

1) Install the dependencies: `npm install`

2) Start the server: `grunt` (port 2000)

If you have your own mongo db, update the url in `server.js` or use [dotenv](https://github.com/motdotla/dotenv).


##Tech

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
- Angular elastic
- Font awesome


##Grunt tasks

- start server: `grunt` (runs tests, watches for changes).

- run tests:`grunt test`

##Notes

- Currently for v1, authentication is done with [auth0](https://auth0.com/). It would be great to use [Passport](http://passportjs.org/) instead.

- Currently no e2e tests, only unit tests.

- Ruby, grunt and grunt-cli are included as dependencies for heroku deployment.


##Test credentials

- test1@test.com
- test2@test.com
- bill@test.com
- ben@test.com

password is the obvious.


##API

####tweets

- post a single tweet
  - POST `/api/tweets`

- get all tweets by username
  - GET `/api/tweets/:username`
  - eg: [/api/tweets/whereswally](/api/tweets/whereswally)

- get a single tweet by tweet_id
  - GET `/api/tweets/:tweet_id`

- update a tweet by tweet_id
  - PUT `/api/tweets/:tweet_id`

- delete a tweet by tweet_id
  - DELETE `/api/tweets/:tweet_id`

- add a username to a tweet's favourites array
  - PUT `/api/tweets/:tweet_id/favourites`

- delete a favourite from a tweet
  - DELETE `/api/tweets/:tweet_id/favourites/:fav_tweet_id` 
  - eg: [/api/tweets/1a2b3c4d/favourites/q5w6e7r8](/api/tweets/1a2b3c4d/favourites/q5w6e7r8) 

- add a username to a tweet's retweets array
  - PUT `/api/tweets/:tweet_id/retweets`

- delete a retweet from a tweet
  - DELETE `/api/tweets/:tweet_id/retweets/:retweet_id`


####timeline

- search and return tweets with usernames from a query
  - GET `/api/timeline`
  - eg: [/api/timeline?userFollowing=bill&userFollowing=ben](/api/timeline?userFollowing=bill&userFollowing=ben)


####search
- search and return tweets containing someString
  - GET `/api/search/:someString`
  - eg: [/api/search/hotWeather](/api/search/hotWeather)


####profiles

- get a single user
  - GET `/api/profiles/:username`
  - eg: [/api/profiles/whereswally](/api/profiles/whereswally)

- add a single new username
  - POST `/api/profiles/:username`
  - eg: `{ username: String }`

- add public profile details
  - POST `/api/profiles/:username/:details` 

- add a new following username to a user's profile
  - PUT `/api/profiles/:username/following` 

- add a new follower username to a user's profile
  - PUT `/api/profiles/:username/followers` 

- add a username to a user's favourites array
  - PUT `/api/profiles/:username/tweets/favourites/:tweet_id`

- delete a username from a user's favourites array
  - DELETE `/api/profiles/:username/tweets/favourites/:tweet_id`

- add a username to a user's retweets array
  - PUT `/api/profiles/:username/tweets/retweets/:tweet_id`



##Contributions

Always welcome, please submit a PR :-)
