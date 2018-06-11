const rd = require('rd');
const os=require('os');
// 异步列出目录下的所有文件
// 同步遍历目录下的所有js文件 D:\zbedu-webapp\resource\新能源汽车\混合动力汽车
/*rd.eachFileFilterSync('D:/zbedu-webapp/server/public/resource/11', /\.pdf$/, function (f, s) {
  console.log(f);
});*/
let type=os.type();
console.log(type);
