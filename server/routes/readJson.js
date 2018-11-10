const express = require('express');
const router = express.Router();
const _ = require('lodash');
const config = require('../app/mock/config.js');
const HeaderData = require('../app/mock/HeaderData.json');
const index = require('../app/mock/index.json');
const bannerLeftData = require('../app/mock/bannerLeftData.json');

const login = require('../app/mock/login.json');
const logOut = require('../app/mock/logOut.json');
const test = require('../app/mock/test.json');
const CenterTree = require('../app/models/CenterTree');

/* GET index.json */
router.get('/config', function (req, res) {
    res.setHeader("Content-Type", "application/js");
    res.end(JSON.stringify(config));
});
router.get('/HeaderData', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(HeaderData));
});
router.get('/index', function (req, res) {
  console.log('index');
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(index));
});
router.get('/bannerLeftData', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    CenterTree.findOneAndUpdate({
      name: 'centerTree'
    }, {
      newTime: new Date(),
      children: bannerLeftData,
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(404).send({
          Msg: '更新失败',
        });
      } else {
        console.log('更新centerTree成功');
      }
    });
    res.end(JSON.stringify(bannerLeftData));
});
router.get('/login', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(login));
});
router.get('/logOut', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(logOut));
});
router.get('/test', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(test));
});

module.exports = router;
