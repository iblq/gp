const express = require('express');
const router = express.Router();
const fs = require('fs');
const yuliangData = require('../model/yuliang.js');
var model = {
    yuliang: yuliangData,
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data/:type', function(req, res, next){
  var r = [];

  try {
    var type = req.query.type;
    var year = req.query.year;
    var month = req.query.month;
    var data = model[type];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var time = item[0];
      var arr = time.split('-');

      if (arr[0] === year) {
        if (month) {
          if (Number(arr[1]) == Number(month)) {
            r.push(item);
          }
        }
        else {
          r.push(item);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
   
    res.send({data: r});
});



module.exports = router;
