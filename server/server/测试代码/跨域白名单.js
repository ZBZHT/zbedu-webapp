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
  '*.233.666.com',
  'hello.world.com',
  'hello..*.com'
];

app.post('a/b', function (req, res, next) {
  let reqOrigin = req.headers.origin; // request响应头的origin属性

  // 判断请求是否在域名白名单内
  if(isOriginAllowed(reqOrigin, ALLOW_ORIGIN)) {
    // 设置CORS为请求的Origin值
    res.header("Access-Control-Allow-Origin", reqOrigin);
    res.header('Access-Control-Allow-Credentials', 'true');

    // 你的业务代码逻辑代码 ...
    // ...
  } else {
    res.send({ code: -2, msg: '非法请求' });
  }
});
