var express = require('express');
var router = express.Router();
var store = require('../store');

/* GET users listing. */
router.get('/:name', function(req, res) {
  var name = req.params.name;
  var list = store.find({ name: name});

  res.render('index', {
    title: 'All Tweets by ' + name,
    tweets: list,
    name: name,
    show_form: true
  });
});

router.get('/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var id = req.params.id;
  var list = store.find({ name: name, id: id });
  console.log(name);
  console.log(id);
  console.log(store.list());
  console.log(list);
  res.render('index', {
    title: 'Tweeted by ' + name + ' || ' + 'Tweet ID: ' + id,
    tweets: list,
    show_form: false
  });
});
module.exports = router;
