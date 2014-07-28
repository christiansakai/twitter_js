#Twitter.js
A small version of twitter

###Technologies
####JavaScript
* jQuery
* Socket.io ==> to push realtime update

#####Node
#####Express app generator
* Express
* Static Favicon
* Morgan
* Body Parser
* Cookie Parser
* Debug
* Jade (removed)

* Socket.io
* Swig (replaced Jade)
* Underscore

####HTML 5

####CSS 3
* Bootstrap

##How to use
1. Clone this repo
2. `cd` into root directory and do `npm install`
3. To run, use `npm start`
4. Open two browser window (localhost:3000), one as you, the other window for other user
5. In index page, you can tweet. When you tweet, there will be a small alert saying "Tweet just added" in your browser while on the other user's browser, that new tweet will be displayed
6. If you click at a user's name, you will be redirected to a page where it lists all of that user's tweets.  On this page, you can tweet as that user
7. If you click at a tweet id, you will be redirected to a page where it lists that particular tweet

#####Some notes
* Using express app generator
* Using Swig instead of Jade as its viewing engine.
* Use socket.io for realtime update
* Using fake data generator to generate data
* Data temporarily stored in an array.  It persists as long as the server is up
* New tweet is updated on the other user's browser by manually adding html string and appending it using jQuery.

#####Known bugs
* New tweet will be added at the top of tweet list on the other user's browser.  However, on your own browser, it will be added at the bottom of tweet list.
* Cannot find by ID
