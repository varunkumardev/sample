var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/aditya');
var collection = db.get('dept');
var collection1 = db.get('newdept');
var moment = require('moment');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/homepage', function (req, res, next) {
  if (req.session && req.session.user) {
    // console.log(req.session.user);
    res.locals.user = req.session.user
    res.render('home')
  } else {
    req.session.reset()
    res.redirect("/")
  }
})

router.get('/logout', function (req, res) {
  req.session.reset()
  res.redirect("/")
})

router.get('/form', function (req, res, next) {
  res.render('registeration');
});

router.get('/fetch', function (req, res, next) {
  res.render('fetch');
})

router.get('/verify', function (req, res, next) {
  res.render('verify');
});




//login
router.post('/login', function (req, res) {
  collection.findOne({
    $or: [{
      "Email": req.body.Email
    }, {
      "First_Name": req.body.Email
    }],
    "Password": req.body.Password
  }, function (err, docs1) {
    if (err || (docs1 == null)) {
      res.sendStatus(500)
    } else {
      req.session.user = docs1
      res.sendStatus(200)
    }
  })
})

//otp verification
router.post('/check', function (req, res) {
  var otp = randomstring.generate({
    length: 6,
    charset: 'numeric'
  });
  collection.findOne({
    $or: [{
      "Email": req.body.Email
    }, {
      "First_Name": req.body.Email
    }]
  }, function (err, docs1) {
    if (err || (docs1 == null)) {
      res.sendStatus(500)
    } else {
      console.log(otp)
      collection.update({
        $or: [{
          "Email": req.body.Email
        }, {
          "First_Name": req.body.Email
        }]
      }, {
        $set: {
          "otp": otp
        }
      });
      res.sendStatus(200)

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'fraudmailer@gmail.com',
          pass: 'Asdf@1234'
        }
      });

      var mailOptions = {
        from: 'fraudmailer@gmail.com',
        to: docs1.Email,
        subject: 'Your Account is hacked',
        text: otp
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  })
})

//changing password
router.post('/cpass', function (req, res) {
  collection.update({
    "Email": req.body.Email
  }, {
    $set: {
      "Password": req.body.pass,
      "Confirm_Password": req.body.cpass
    }
  }, function (err, docs1) {
    if (err || docs1 == null) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

//otp validation
router.post('/compare', function (req, res) {
  collection.findOne({
    "Email": req.body.Email,
    "otp": req.body.otp
  }, function (err, docs1) {
    if (err || (docs1 == null)) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})



//insert data
router.post('/inform', function (req, res) {
  collection.findOne({
    "Email": req.body.Email
  }, function (err, docs1) {
    if (err || (docs1 == null)) {
      req.body.Sumbit_Date_Time = moment().format("DD-MM-YYYY") + " " + moment().format("hh:mm");
      req.body.role = "user";
      collection.insert(req.body, function (error, docs) {
        if (error) {
          res.sendStatus(500)
        } else {
          console.log(docs)
          res.sendStatus(200)
        }
      })
    } else {
      res.sendStatus(500)
    }
  })
})

//==================================================home page=====================================================

//home insert data
router.post('/homes', function (req, res) {
  if (req.session && req.session.user) {
    req.body.user = req.session.user.First_Name;
    req.body.Status = "pending"
    collection1.insert(req.body, function (error, docs) {
      if (error) {
        res.sendStatus(500)
      } else {
        console.log(docs)
        res.sendStatus(200)
      }
    })
  }
})

//home fetch data
router.get('/gethome', function (req, res) {
  if (req.session && req.session.user) {
    if (req.session.user.role == "user") {
      collection1.find({
        "user": req.session.user.First_Name
      }, function (error, docs) {
        if (error) {
          res.sendStatus(500)
        } else {
          console.log(docs)
          res.send(docs)
        }
      })
    } else {
      collection1.find({}, function (error, docs) {
        if (error) {
          res.sendStatus(500)
        } else {
          res.send(docs)
        }
      })
    }
  }
})

//home update button status
router.post("/statusprocess", function (req, res) {
  collection1.update({
    "_id": req.body._id
  }, {
    $set: {
      "Status": "completed"
    }
  }, function (error, docs) {
    if (error) {
      res.sendStatus(500)
    } else {
      res.send(docs)
    }
  })
})
// ===============================================================================================================

//fetch data
router.get('/getdata', function (req, res) {
  collection.find({}, function (error, docs) {
    if (error) {
      res.sendStatus(500)
    } else {
      // console.log(docs)
      res.send(docs)
    }
  })

})

//delete data
router.post('/remove', function (req, res) {
  collection.remove({
    "_id": req.body._id
  }, function (error, docs) {
    if (error) {
      res.sendStatus(500)
    } else {
      res.send(docs)
    }
  })
})

//file upload
router.post('/profile',upload.single('file'),function (req,res) {
  console.log(req.file);
  req.body.file1=file;
  collection1.insert(req.body,function (error,docs) {
    if(error){
      res.sendStatus(500)
    }else{
      res.sendStatus(200)
    }
  })  
})

module.exports = router;