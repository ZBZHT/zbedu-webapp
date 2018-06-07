var spawn = require('child_process').spawn;
var ppt2png = require('ppt2png');
var fs = require('fs');
var path = require('path');
//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve('C:/zbedu-webapp/resource');

//调用文件遍历方法

let rr = [];
function start() {
  return new Promise((resolve, reject) => {
    resolve('1');
  });
}

start()
  .then(data => {
    fileDisplay(filePath);

    //根据文件路径读取文件，返回文件列表
    function fileDisplay(filePath){
      //根据文件路径读取文件，返回文件列表
      fs.readdir(filePath,function(err,files){
        if(err){
          console.warn(err)
        }else{
          //遍历读取到的文件列表
          files.forEach(function(filename, i){
            //获取当前文件的绝对路径
            var filedir = path.join(filePath,filename);
            //根据文件路径获取文件信息，返回一个fs.Stats对象
            fs.stat(filedir,function(eror,stats){
              if(eror){
                console.warn('获取文件stats失败');
              }else{
                var isFile = stats.isFile();//是文件
                var isDir = stats.isDirectory();//是文件夹
                if(isFile){
                  //console.log(files.length);
                  //console.log(filedir);

                  rr.push(filedir);
                  if (i === files.length-1) {
                    console.log(i);
                    return data;
                  }
                }
                if(isDir){
                  fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
              }
            })
          });
        }
      });
    }
  })
  .then(data => {
    //console.log(rr);
    return data
  });
