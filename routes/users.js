var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// // Date object initialized as per Indian Time zone. Returns a datetime string
// let date_india_string = new Date().toLocalString("en-US", { timeZone: "Indian Standard time" });

// // Date object initialized from the above datetime string
// let date_in = new Date(date_india_string);

// // year as (YYYY) format
// let year = date_in.getFullYear();

// // month as (MM) format
// let month = ("0" + (date_in.getMonth() + 1)).slice(-2);

// // date as (DD) format
// let date = ("0" + date_in.getDate()).slice(-2);

// // hours as (HH) format
// let hours = ("0" + date_in.getHours()).slice(-2);

// // minutes as (mm) format
// let minutes = ("0" + date_in.getMinutes()).slice(-2);

// // seconds as (ss) format
// let seconds = ("0" + date_in.getSeconds()).slice(-2);

// // date as DD-MM-YYYY format
// let date_yyyy_mm_dd = date + "-" + month + "-" + year;
// console.log("Date in DD-MM-YYYY format: " + date_yyyy_mm_dd);

// // time as hh:mm:ss format
// let time_hh_mm_ss = hours + ":" + minutes + ":" + seconds;
// console.log("Time in hh:mm:ss format: " + time_hh_mm_ss);

// // date and time as YYYY-MM-DD hh:mm:ss format
// let date_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
// console.log("Date and Time in YYYY-MM-DD hh:mm:ss format: " + date_time);

module.exports = router;
