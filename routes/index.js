const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 定义服务端api接口
router.get('/data/:type', function (req, res, next) {
  let data;
  switch (req.params.type) {
    case "ylz":
      data = fs.readFileSync('./public/js/geojson/ylz_3857.geojson');
      break;
    case "node":
      data = fs.readFileSync('./public/js/geojson/node.geojson');
      break;
    case "swz":
      data = fs.readFileSync('./public/js/geojson/swz.geojson');
      break;
    default:
      // 获取uploads目录下文件的数据
      data = fs.readFileSync('./public/uploads/' + req.params.type);
      break;
  }

  res.send(data);
});




module.exports = router;
