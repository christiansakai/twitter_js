var express = require('express');
var router = express.Router();
var store = require('../store');
var User = require('../models').User;

// User.findAll().complete(function() {
//   console.log("success");
// });
// User.find(123).complete(function(err,user) {
// user.getTweets().complete(function(err,tweets) {
// console.log(tweets);
//   })
// });
//  =================Twitter.JS with MySQL===========================
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










// ==================Twitter.JS with temporary storage===============
/* GET home page. */
router.get('/', function(req, res) {
  var tweetAdded = req.query.tweetAdded;
  var tweets = store.list();
  var renderScope = {
    title: 'All Tweets',
    tweets: tweets,
    show_form: true
  };

  if(tweetAdded === 'true') { // using quotes because tweetAdded type will be a String from query
    renderScope.alertMessage = "Tweet just added!";
  }
  res.render('index', renderScope);
});

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;

  store.push(name, text);

  var list = store.find({ name: name, text: text });

  // this will emit an event called "new_tweet".
  // the browsing user will receive this "new_tweet" event and it will trigger a function
  io.sockets.emit("new_tweet", list)

  // this will redirect the submitting user to index, and showing alert message "Tweet just added"
  res.redirect('/?tweetAdded=true');
});
module.exports = router;
