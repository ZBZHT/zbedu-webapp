const express = require('express');
const router = express.Router();
const _ = require('lodash');

//设置跨域请求
// 判断origin是否在域名白名单列表中
function isOriginAllowed(origin, allowedOrigin) {
  if (_.isArray(allowedOrigin)) {
    for(let i = 0; i < allowedOrigin.length; i++) {
      if(isOriginAllowed(origin, allowedOrigin[i])) {
        return true;
      }
    }
    return false;
  } else if (_.isString(allowedOrigin)) {
    return origin === allowedOrigin;
  } else if (allowedOrigin instanceof RegExp) {
    return allowedOrigin.test(origin);
  } else {
    return !!allowedOrigin;
  }
}
const ALLOW_ORIGIN = [ // 域名白名单
  'http://192.168.2.251:8080',
  'http://192.168.2.251:8000',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:8000',
];
router.all('*', function (req, res, next) {
  let reqOrigin =req.headers.origin ; // request响应头的origin属性
  // 判断请求是否在域名白名单内
  if(isOriginAllowed(reqOrigin, ALLOW_ORIGIN)) {
    // 设置CORS为请求的Origin值
    res.header("Access-Control-Allow-Origin", reqOrigin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1');
    /*if (req.method == "OPTIONS") res.sendStatus(204);// 让options请求快速返回
    else next();*/
  } else { res.send({ code: -2, msg: '非法请求' });}
    next()
});


module.exports = router;
