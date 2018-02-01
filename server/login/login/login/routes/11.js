var fs = require('fs');
var mongoose = require('mongoose');
/*
var jsonSchemaGenerator = require('json-schema-generator');
    obj = { some: { object: true } },
        schemaObj;

schemaObj = jsonSchemaGenerator(json);
*/

var jsonFile = require('../app/models/index.json');
//CommonJS 规范
console.log(JSON.stringify(jsonFile));
/*fs.readFile('../app/models/index.json', 'utf8', function (err, data) {
    if(err){
        console.log('文件打开失败');
    }else {
        console.log('文件打开成功');
    }
    console.log(data);
    mongoose.collection("data").insert(json, function(err, doc){
        if(err)
            console.error(err);
        else
            console.log("OK!"+doc);
    });
});*/







//ueditor插件
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    //客户端上传文件设置
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = '/images/ueditor/';//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));

//2.对密码进行加密处理
var md5 = crypto.createHash('md5');
var password = md5.update(req.body.password).digest('hex');
/*var crypto = require('crypto');
var hash = crypto.createHash("md5");
hash.update(new Buffer("huangdanhua", "binary",'dsfjisjfdsdfsfsdf','sdfdsafa'));
var encode = hash.digest('hex');
console.log(encode);*/

var rebuildTree = function(categoryID, Lang, callback){
    var nodeTree = [];
    var recursiveTree = function(node, Lang){
        var id = node._id, bgi = node.LB, bdi = node.RB, nivi = node.Level;
        Categories.find({ LB: { $gt: bgi }, RB: { $lt: bdi }, Level: nivi + 1 }).lean().exec( function(err, Children){
            if (err){
                return callback(err);
            }
            if( Children.length === 0 ){
                return;
            }
            Children.forEach( function(item, key){
                return recursiveTree(item, Lang);
            });
            node.child = Children;
            nodeTree.push(node);

            // 这个会回调三次 nodeTree
            return callback(nodeTree);

        });
    };

    Categories.findOne('{ _id: categoryID }).lean().exec(function(err, res){
    recursiveTree(res, Lang, function(res){
        console.log(':::' + JSON.stringify(tree) );
    });
};
