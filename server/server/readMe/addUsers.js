//添加公司内部用户信息
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db');

const db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

//学生模型
let studentSchema = new mongoose.Schema({
    user: String,
    pwd: String,
    admin: String,
    userID: String,
    IDNo: String,
    MoNo: String,
    userType: String
});
let users = mongoose.model("users",studentSchema);

//实例化几个学生
let a = new users({
    user: '孙骏',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13813998181',
    userType: 'T'
  });
let b = new users({
    user: '侯妍妍',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13605185010',
    userType: 'T'
  });
let c = new users({
    user: '彭滨川',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13913983690',
    userType: 'T'
  });
let d = new users({
    user: '李伟',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15996292456',
    userType: 'T'
  });
let e = new users({
    user: '江海洁',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15952018058',
    userType: 'T'
  });
let f = new users({
    user: '吴正林',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13186412838',
    userType: 'T'
  });
let g = new users({
    user: '杜伟',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18652051306',
    userType: 'T'
  });
let h = new users({
    user: '陈景',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15161158321',
    userType: 'T'
  });
let i = new users({
    user: '侯为东',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13771521142',
    userType: 'T'
  });
let j = new users({
    user: '刘志勇',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15755377635',
    userType: 'T'
  });
let k = new users({
    user: '程叔亮',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18668053375',
    userType: 'T'
  });
let l = new users({
    user: '何宗军',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18255050632',
    userType: 'T'
  });
let m = new users({
    user: '万林伟',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18020152414',
    userType: 'T'
  });
let n = new users({
    user: '马凌',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15651782650',
    userType: 'T'
  });
let o = new users({
    user: '续向阳',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13770690912',
    userType: 'T'
  });
let p = new users({
    user: '陈香琴',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15850585691',
    userType: 'T'
  });
let q = new users({
    user: '徐冰瑶',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18651546721',
    userType: 'T'
  });
let r = new users({
    user: '曹岚',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13851994583',
    userType: 'T'
  });
let s = new users({
    user: '黄青蓝',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18851057155',
    userType: 'T'
  });
let t = new users({
    user: '杨暕',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13770739865',
    userType: 'T'
  });
let u = new users({
    user: '金建永',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18651891811',
    userType: 'T'
  });
let v = new users({
    user: '于帆',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18262622357',
    userType: 'T'
  });
let w = new users({
    user: '王骏',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13775704925',
    userType: 'T'
  });
let x = new users({
    user: '徐瑞',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '17625909530',
    userType: 'T'
  });
let y = new users({
    user: '尹东阳',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15695299151',
    userType: 'T'
  });
let z = new users({
    user: '朱鸿飞',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15251805492',
    userType: 'T'
  });
let a1 = new users({
    user: '吕浩',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13914788247',
    userType: 'T'
  });
let a2 = new users({
    user: '姜琳晖',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18061726931',
    userType: 'T'
  });
let a3 = new users({
    user: '王莹莹',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13598602056',
    userType: 'T'
  });
let a4 = new users({
    user: '李佳',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18179158578',
    userType: 'T'
  });
let a5 = new users({
    user: '贺林',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18112340525',
    userType: 'T'
  });
let a6 = new users({
    user: '谢佳芯',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18362826594',
    userType: 'S'
  });
let a7 = new users({
    user: '马聪',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '13605158120',
    userType: 'T'
  });
let a8 = new users({
    user: '路晓东',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '18537228775',
    userType: 'O'
  });
let a9 = new users({
    user: '毛耀辉',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '17761665836',
    userType: 'T'
  });
let a10 = new users({
    user: '李俊',
    pwd: '698d51a19d8a121ce581499d7b701668',
    admin: false,
    userID: '00000001',
    IDNo: '410521000000000001',
    MoNo: '15800014600',
    userType: 'T'
  });

a.save();
b.save();
c.save();
d.save();
e.save();
f.save();
g.save();
h.save();
i.save();
j.save();
l.save();
m.save();
n.save();
o.save();
p.save();
q.save();
r.save();
s.save();
t.save();
u.save();
v.save();
w.save();
x.save();
y.save();
z.save();
a1.save();
a2.save();
a3.save();
a4.save();
a5.save();
a6.save();
a7.save();
a8.save();
a9.save();
a10.save();
