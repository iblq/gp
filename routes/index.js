const express = require('express');
const router = express.Router();
const fs = require('fs');
const process = require('../service/process');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data/:type', function(req, res, next){

    res.send('data');
});



module.exports = router;
