var express = require('express');
var router = express.Router();
var store = require('../store');
var User = require('../models').User;
var Tweet = require('../models').Tweet;

//  =================Twitter.JS with MySQL===========================
/* GET home page. */
router.get('/', function(req, res) {
  var tweetAdded = req.query.tweetAdded;
  var renderScope = {
    title: 'All Tweets',
    tweets: [],
    show_form: true
  };

  if(tweetAdded === 'true') { // using quotes because tweetAdded type will be a String from query
    renderScope.alertMessage = "Tweet just added!";
  }

  Tweet.findAll({include: [User]}).complete(function(err, tweets) {
    tweets.forEach(function(tweet) {
      var tweetObj = {
        name: tweet.dataValues.User.dataValues.name,
        text: tweet.dataValues.tweet,
        id: tweet.dataValues.id
      };
      renderScope.tweets.push(tweetObj);
    });
    res.render('index', renderScope);
  });
});

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;

  // store.push(name, text);
  User.create({ name: name }).complete(function(err, user) {
    var userId = user.dataValues.id;
    Tweet.create({ tweet: text, UserId: userId }).complete(function(err, tweet) {

      // this will emit an event called "new_tweet".
      // the browsing user will receive this "new_tweet" event and it will trigger a function
      io.sockets.emit("new_tweet", [tweet])

      // this will redirect the submitting user to index, and showing alert message "Tweet just added"
      res.redirect('/?tweetAdded=true');
    });
  });

});



// ==================Twitter.JS with temporary storage===============
/* GET home page. */
// router.get('/', function(req, res) {
//   var tweetAdded = req.query.tweetAdded;
//   var tweets = store.list();
//   var renderScope = {
//     title: 'All Tweets',
//     tweets: tweets,
//     show_form: true
//   };

//   if(tweetAdded === 'true') { // using quotes because tweetAdded type will be a String from query
//     renderScope.alertMessage = "Tweet just added!";
//   }
//   res.render('index', renderScope);
// });

// router.post('/submit', function(req, res) {
//   var name = req.body.name;
//   var text = req.body.text;

//   store.push(name, text);

//   var list = store.find({ name: name, text: text });

//   // this will emit an event called "new_tweet".
//   // the browsing user will receive this "new_tweet" event and it will trigger a function
//   io.sockets.emit("new_tweet", list)

//   // this will redirect the submitting user to index, and showing alert message "Tweet just added"
//   res.redirect('/?tweetAdded=true');
// });

module.exports = router;
