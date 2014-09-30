var express = require('express');
var router = express.Router();
var store = require('../store');
var User = require('../models').User;
var Tweet = require('../models').Tweet;

//  =================Twitter.JS with MySQL===========================
router.get('/:name', function(req, res) {
  var renderScope = {
    title: 'All Tweets by ' + req.params.name,
    tweets: [],
    name: req.params.name,
    show_form: true
  };

  User.find({
    where: { name: req.params.name },
    include: [Tweet]
  }).complete(function(err, user) {
    if (err) throw err;

    for (var i = 0; i < user.Tweets.length; i++) {
      var tweetObj = {
        name: user.dataValues.name,
        id: user.Tweets[i].dataValues.id,
        text: user.Tweets[i].dataValues.tweet
      };

      renderScope.tweets.push(tweetObj);
    }

    res.render('index', renderScope);
  });
});

router.get('/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var id = req.params.id;

  var renderScope = {
    title: 'Tweeted by ' + name + ' || ' + 'Tweet ID: ' + id,
    tweets: [],
    show_form: false
  };

  Tweet.find({
    where: { id: id },
    include: [User]
  }).complete(function(err, tweet) {
    var tweetObj = {
      name: tweet.dataValues.User.dataValues.name,
      id: tweet.dataValues.id,
      text: tweet.dataValues.tweet
    };

    renderScope.tweets.push(tweetObj);
    res.render('index', renderScope);
  });
});

// ==================Twitter.JS with temporary storage===============
/* GET users listing. */
// router.get('/:name', function(req, res) {
//   var name = req.params.name;
//   var list = store.find({ name: name});

//   console.log(list);
//   res.render('index', {
//     title: 'All Tweets by ' + name,
//     tweets: list,
//     name: name,
//     show_form: true
//   });
// });

// router.get('/:name/tweets/:id', function(req, res) {
//   var name = req.params.name;
//   var id = req.params.id;
//   var list = store.find({ name: name, id: id });
//   console.log(name);
//   console.log(id);
//   console.log(store.list());
//   console.log(list);
//   res.render('index', {
//     title: 'Tweeted by ' + name + ' || ' + 'Tweet ID: ' + id,
//     tweets: list,
//     show_form: false
//   });
// });


module.exports = router;
