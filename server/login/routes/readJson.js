const express = require('express');
const router = express.Router();
//const Node = require('../app/models/Tree');
const config = require('../app/mock/config.js');
const HeaderData = require('../app/mock/HeaderData.json');
const index = require('../app/mock/index.json');
const bannerLeftData = require('../app/mock/bannerLeftData.json');
const login = require('../app/mock/login.json');
const logOut = require('../app/mock/logOut.json');
const test = require('../app/mock/test.json');
const testQuestion = require('../app/mock/testQuestion101.json');
const testQuestion02 = require('../app/mock/testQuestion102.json');
const testQuestion03 = require('../app/mock/testQuestion103.json');
const testQuestion04 = require('../app/mock/testQuestion104.json');
const testQuestion05 = require('../app/mock/testQuestion105.json');
const testQuestion06 = require('../app/mock/testQuestion106.json');
const testQuestion07 = require('../app/mock/testQuestion107.json');

//设置跨域请求
router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
        /让options请求快速返回/
    }
    else {
        next();
    }
});

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
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(index));
});
router.get('/bannerLeftData', function (req, res) {
    res.setHeader("Content-Type", "application/json");
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
router.get('/testQuestion101', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(testQuestion));
});
router.get('/testQuestion102', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(testQuestion02));
});
router.get('/testQuestion103', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(testQuestion03));
});
router.get('/testQuestion104', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(testQuestion04));
});
router.get('/testQuestion105', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(testQuestion05));
});
router.get('/testQuestion106', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(testQuestion06));
});
router.get('/testQuestion107', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(testQuestion07));
});

module.exports = router;
