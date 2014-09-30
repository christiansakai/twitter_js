#Twitter.js
A small version of twitter

###Update
* Added MySQL
* Added NPM modules:
  * mysql
  * sequelize

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

##How to use - updated using MySQL
1. Create Twitter Database in MySQL
  * Go to MySQL shell, by typing `$ mysql -u root`
  * Create the database by using
  ```shell
    mysql> CREATE DATABASE `twitterjs`;
    mysql> SHOW DATABASES;
    mysql> USE `twitterjs`;
  ```
2. Create the tables
  ```shell
    mysql> CREATE TABLE `Tweets` (
      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `UserId` int(11) DEFAULT NULL,
      `tweet` varchar(255) DEFAULT NULL,
      PRIMARY KEY (`id`)
    );

    mysql> CREATE TABLE `Users` (
      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `name` varchar(255) DEFAULT NULL,
      `pictureUrl` text,
      PRIMARY KEY (`id`)
    );
  ```
3. Populate using seed.sql.  To use the Seed Data, run `mysql -u root "twitterjs" < seed.sql`;

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
