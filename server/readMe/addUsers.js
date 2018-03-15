//添加公司内部用户信息
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/db');

const db = mongoose.connection;
db.once('open', function (callback) {
  console.log("数据库成功打开");
});

//学生模型
let studentSchema = new mongoose.Schema({
  n_name: {
    type: String,
    unique: true,  //索引值唯一
  },
  user: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  pwd: {
    type: String,
    required: true, //设定是否必填
  },
  userID: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  IDNo: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  MoNo: {
    type: String,
    unique: true,  //索引值唯一
    required: true, //设定是否必填
  },
  userType: {
    type: String,
    required: true, //设定是否必填
  },
  gender: {
    type: Number,
    required: true, //设定是否必填
  },
  AdmDate: {  //入学时间
    type: Date,
    required: true, //设定是否必填
  },
  major: {  //专业
    type: String,
    required: true, //设定是否必填
  },
  classGrade: {  //班级
    type: String,
    required: true, //设定是否必填
  }
});
let users = mongoose.model("users", studentSchema);

//实例化几个学生
let a8 = new users({
  user: '路晓东',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000001',
  IDNo: '410521000000000001',
  MoNo: '18537228775',
  userType: 'admin',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'

});
let a6 = new users({
  user: '谢佳芯',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000002',
  IDNo: '410521000000000002',
  MoNo: '18362826594',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let g = new users({
  user: '杜伟',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000009',
  IDNo: '410521000000000009',
  MoNo: '18652051306',
  userType: 'T',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let t = new users({
  user: '杨暕',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000022',
  IDNo: '410521000000000022',
  MoNo: '13770739865',
  userType: 'S',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a3 = new users({
  user: '王莹莹',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000030',
  IDNo: '410521000000000030',
  MoNo: '13598602056',
  userType: 'O',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a = new users({
  user: '孙骏',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000003',
  IDNo: '410521000000000003',
  MoNo: '13813998181',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'

});
let b = new users({
  user: '侯妍妍',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000004',
  IDNo: '410521000000000004',
  MoNo: '13605185010',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let c = new users({
  user: '彭滨川',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000005',
  IDNo: '410521000000000005',
  MoNo: '13913983690',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let d = new users({
  user: '李伟',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000006',
  IDNo: '410521000000000006',
  MoNo: '15996292456',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let e = new users({
  user: '江海洁',
  pwd: '698d51a19d8a121ce581499d7b701668',
  admin: false,
  userID: '00000007',
  IDNo: '410521000000000007',
  MoNo: '15952018058',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let f = new users({
  user: '吴正林',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000008',
  IDNo: '410521000000000008',
  MoNo: '13186412838',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let h = new users({
  user: '陈景',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000010',
  IDNo: '410521000000000010',
  MoNo: '15161158321',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let i = new users({
  user: '侯为东',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000011',
  IDNo: '410521000000000011',
  MoNo: '13771521142',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let j = new users({
  user: '刘志勇',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000012',
  IDNo: '410521000000000012',
  MoNo: '15755377635',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let k = new users({
  user: '程叔亮',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000013',
  IDNo: '410521000000000013',
  MoNo: '18668053375',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let l = new users({
  user: '何宗军',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000014',
  IDNo: '410521000000000014',
  MoNo: '18255050632',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let m = new users({
  user: '万林伟',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000015',
  IDNo: '410521000000000015',
  MoNo: '18020152414',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let n = new users({
  user: '马凌',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000016',
  IDNo: '410521000000000016',
  MoNo: '15651782650',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let o = new users({
  user: '续向阳',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000017',
  IDNo: '410521000000000017',
  MoNo: '13770690912',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let p = new users({
  user: '陈香琴',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000018',
  IDNo: '410521000000000018',
  MoNo: '15850585691',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let q = new users({
  user: '徐冰瑶',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000019',
  IDNo: '410521000000000019',
  MoNo: '18651546721',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let r = new users({
  user: '曹岚',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000020',
  IDNo: '410521000000000020',
  MoNo: '13851994583',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let s = new users({
  user: '黄青蓝',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000021',
  IDNo: '410521000000000021',
  MoNo: '18851057155',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let u = new users({
  user: '金建永',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000023',
  IDNo: '410521000000000023',
  MoNo: '18651891811',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let v = new users({
  user: '于帆',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000024',
  IDNo: '410521000000000024',
  MoNo: '18262622357',
  userType: 'E',
  gender: 2,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let w = new users({
  user: '王骏',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000025',
  IDNo: '410521000000000025',
  MoNo: '13775704925',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let y = new users({
  user: '尹东阳',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000026',
  IDNo: '410521000000000026',
  MoNo: '15695299151',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let z = new users({
  user: '朱鸿飞',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000027',
  IDNo: '410521000000000027',
  MoNo: '15251805492',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a1 = new users({
  user: '吕浩',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000028',
  IDNo: '410521000000000028',
  MoNo: '13914788247',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a2 = new users({
  user: '姜琳晖',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000029',
  IDNo: '410521000000000029',
  MoNo: '18061726931',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a4 = new users({
  user: '李佳',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000031',
  IDNo: '410521000000000031',
  MoNo: '18179158578',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a5 = new users({
  user: '贺林',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000032',
  IDNo: '410521000000000032',
  MoNo: '18112340525',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a7 = new users({
  user: '马聪',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000033',
  IDNo: '410521000000000033',
  MoNo: '13605158120',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a9 = new users({
  user: '毛耀辉',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000034',
  IDNo: '410521000000000034',
  MoNo: '17761665836',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
});
let a10 = new users({
  user: '李俊',
  pwd: '698d51a19d8a121ce581499d7b701668',
  userID: '00000035',
  IDNo: '410521000000000035',
  MoNo: '15800014600',
  userType: 'E',
  gender: 1,
  AdmDate: 2018 - 1 - 10,
  major: '汽车维修',
  classGrade: '03'
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
k.save();
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
//x.save();
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
