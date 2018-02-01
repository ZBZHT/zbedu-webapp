
var fs = require("fs");

module.exports = {
	upload_file: function(req,res,next) {
		for(var i = 0; i < req.files.length; i++) {
			console.log(req.files[i]);  // 上传的文件信息        request.ip属性用于获得HTTP请求的IP地址   request.files用于获取上传的文件

            var des_file ="public/images/" + req.files[i].originalname;
			 fs.createReadStream(req.files[i].path)                 //用流来传输文件
             .pipe(fs.createWriteStream(des_file)); 
			 }
		//	 res.end("OK");
		res.redirect('/admin/admin_products');
		
	},
	delete_file: function(req, res, next) {
		for(var i = 1; i <= 4; i++) {//只有四张图片
		  var des_file ="public"+req[0]['product_path' + i];         
		  fs.unlinkSync(des_file, function(err) {
			if (err) {
				return console.error(err);
				}
				console.log(product_path+"文件删除成功！");
			});	
		  console.log('delete file' + i + '\n');
		}
		res.redirect('/admin/admin_products');
	}
};
