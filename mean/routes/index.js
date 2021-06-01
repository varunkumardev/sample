var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/aditya');
var collection = db.get('dept');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/register', function (req, res, next) {
  res.render('registration')
});

router.post('/varun', function (req, res) {
  console.log(req.body);
  collection.insert(req.body,function (error,docs) {
    if(error){
      res.sendStatus(500)
    }else{
      res.sendStatus(200)
    }
  })
})

module.exports = router;