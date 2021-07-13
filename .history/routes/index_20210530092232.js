var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

/* GET About page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Projects page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Services page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Contact page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
