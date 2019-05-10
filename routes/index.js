const express = require('express');
const router = express.Router();
const fs = require('fs');
const yuliangData = require('../model/yuliang.js');
const liuliangData = require('../model/liuliang');
var model = {
  yuliang: yuliangData,
  liuliang: liuliangData
};

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 定义服务端api接口
router.get('/data/:type', function(req, res, next) {
  var data;
  var r = [];
  if (req.query && req.query.type) {
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
          } else {
            r.push(item);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    switch (req.params.type) {
      case 'ylz':
        data = fs.readFileSync('./public/js/geojson/ylz_3857.geojson');
        break;
      case 'node':
        data = fs.readFileSync('./public/js/geojson/node.geojson');
        break;
      case 'swz':
        data = fs.readFileSync('./public/js/geojson/swz.geojson');
        break;
      case 'yuliang':
        data = fs.readFileSync('./public/js/geojson/yuliang_chart.geojson');
        break;
      default:
        // 获取uploads目录下文件的数据
        data = fs.readFileSync('./public/uploads/' + req.params.type);
        break;
    }
  }

  res.send(req.query && req.query.type ? { data: r } : data);
});

module.exports = router;
