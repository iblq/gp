const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

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
      data = fs.readFileSync('./public/uploads/' + req.params.type);
      break;
  }

  res.send(data);
});




module.exports = router;
