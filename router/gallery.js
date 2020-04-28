var express = require('express');
var router = express.Router();
var fs = require('fs');
var imagelist = [];

fs.readdir(testFolder= './res/marujpg', function(error, filelist){
  console.log(filelist);
  imagelist = filelist
})


// router.get('/', function(req,res) {
//   res.render('home/welcome', {imagelist:imagelist})
// })
router.get('/', function(req,res) {
  res.render('home/maru', {imagelist:imagelist})
})

module.exports=router
