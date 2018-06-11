var spawn = require('child_process').spawn;
var ppt2png = require('ppt2png');

var fs = require('fs');


/*ppt2png('/zbedu-webapp/server/public/resource/新能源汽车/纯电动汽车/高压安全操作与保养维护/总体结构认知/EV系列-1-2-纯电动汽车总体结构认知-教材/纯电动汽车总体结构认知教材.pdf', '/zbedu-webapp/server/public/resource/新能源汽车/纯电动汽车/高压安全操作与保养维护/总体结构认知/EV系列-1-2-纯电动汽车总体结构认知-教材/pdf', function( err ){
  if(err) {
    console.log(err);
  } else {
    console.log('convert successful.');
  }
});*/

/*fs.mkdirSync ('../public/resource/我的课堂/234/123/', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('创建目录成功');
  ppt2png('/home/lxd/下载/学习任务二更换动力电池内部组件.pdf', '/home/lxd/下载/学习任务二更换动力电池内部组件/pdf', function( err ){
    if(err) {
      console.log(err);
    } else {
      console.log('convert successful.');
    }
  });
});*/


/*fs.mkdir ('/55', function (err) {
  if (err) {
    console.log(err)
  }
    console.log('创建目录成功');
    var toPDF = spawn("/usr/bin/unoconv", '/55.pptx');
    toPDF.on('exit', function (code) {
      console.log("the toPDF code: ", code);

      var toJPG = spawn("/usr/bin/convert", '/55.pdf', '/55/幻灯片.jpg');
      toJPG.on('exit', function (code) {
        console.log("the toJPG code: ", code);
      });
    });

});*/

/*var toPDF = spawn("/usr/bin/unoconv", '/55.pptx');
toPDF.on('exit', function (code) {
  console.log("the toPDF code: ", code);

  var toJPG = spawn("/usr/bin/convert", '/55.pdf', '/55/幻灯片.jpg');
  toJPG.on('exit', function (code) {
    console.log("the toJPG code: ", code);
  });
});*/


