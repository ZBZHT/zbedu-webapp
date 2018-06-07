const path = require('path');
const fs = require('fs');
const pdf = require('pdf-poppler');
const rd = require('rd');

//let file = 'D:/zbedu-webapp/resource/新能源汽车/纯电动汽车/高压安全操作与保养维护/总体结构认知/EV系列-1-2-纯电动汽车总体结构认知-教材/纯电动汽车总体结构认知教材.pdf';
// 同步遍历目录下的所有js文件
rd.eachFileFilterSync('D:/zbedu-webapp/server/public/resource/11', /\.pdf$/, function (f, s) {
  //console.log(f);

  let opts = {
    format: 'png',
    out_dir: path.dirname(f),
    out_prefix: 'pdf',
    page: null
  };

  pdf.convert(f, opts)
    .then(res => {
      let path_dir = path.dirname(f);
      fs.readdir(path_dir, function (err, stats) {
        //console.log(path_dir);
        //console.log(stats);
        for (let i=0; i<=stats.length-1; i++) {
          let arr1 = stats[i].split(".");
          if (arr1[arr1.length-1] === 'png') {
            let arr2 = arr1[0].split("-");
            let name1 = Number(arr2[arr2.length-1]);
            let oldPath = path_dir + '/' + stats[i];
            let newPath = path_dir + '/' + arr2[0] + '-' + name1 + '.' + arr1[arr1.length-1];
            //console.log(oldPath);
            //console.log(newPath);
            fs.rename(oldPath, newPath, function (err) {
              if (err) {
                console.log(err);
              }
            })
          }
        }
        fs.unlink(f, function (err) {
              if (err) return console.log(err);
          console.log('文件删除成功');
        });
        console.log('Successfully converted');
      });
    })
    .catch(error => {
      console.error(error);
    });
});




