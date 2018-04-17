//往数据库中添加comments记录
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/zbt');
const Question = require('../app/models/Question');

const zbt = mongoose.connection;
zbt.once('open', function (callback) {
  console.log("数据库成功打开");
});

//实例化
let testQuestionSingle1 = new Question(
  {
    "num": 1,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que1",
    "forId":["que1A","que1B","que1C","que1D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle2 = new Question(
  {
    "num": 2,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que2",
    "forId":["que2A","que2B","que2C","que2D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle3 = new Question(
  {
    "num": 3,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que3",
    "forId":["que3A","que3B","que3C","que3D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle4 = new Question(
  {
    "num": 4,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que4",
    "forId":["que4A","que4B","que4C","que4D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle5 = new Question(
  {
    "num": 5,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que5",
    "forId":["que5A","que5B","que5C","que5D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle6 = new Question(
  {
    "num": 6,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que6",
    "forId":["que6A","que6B","que6C","que6D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle7 = new Question(
  {
    "num": 7,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que7",
    "forId":["que7A","que7B","que7C","que7D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle8 = new Question(
  {
    "num": 8,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que8",
    "forId":["que8A","que8B","que8C","que8D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle9 = new Question(
  {
    "num": 9,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que9",
    "forId":["que9A","que9B","que9C","que9D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle10 = new Question(
  {
    "num": 10,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que10",
    "forId":["que10A","que10B","que10C","que10D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle11 = new Question(
  {
    "num": 11,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que11",
    "forId":["que11A","que11B","que11C","que11D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle12 = new Question(
  {
    "num": 12,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que12",
    "forId":["que12A","que12B","que12C","que12D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle13 = new Question(
  {
    "num": 13,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que13",
    "forId":["que13A","que13B","que13C","que13D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle14 = new Question(
  {
    "num": 14,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que14",
    "forId":["que14A","que14B","que14C","que14D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle15 = new Question(
  {
    "num": 15,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que15",
    "forId":["que15A","que15B","que15C","que15D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle16 = new Question(
  {
    "num": 16,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que16",
    "forId":["que16A","que16B","que16C","que16D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle17 = new Question(
  {
    "num": 17,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que17",
    "forId":["que17A","que17B","que17C","que17D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle18 = new Question(
  {
    "num": 18,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que18",
    "forId":["que18A","que18B","que18C","que18D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle19 = new Question(
  {
    "num": 19,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que19",
    "forId":["que19A","que19B","que19C","que19D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);
let testQuestionSingle20 = new Question(
  {
    "num": 20,
    "desc": "大部分自动变速器N-D换挡延时时间小于(   )s。",
    "options": ["A、1.0～1.2", "B、0.6～0.8", "C、1.2～1.5", "D、1.5～2.0"],
    "value":["A","B","C","D"],
    "name":"que20",
    "forId":["que20A","que20B","que20C","que20D"],
    "answer": "A",
    "type": "radio",
    "major": "汽车专业",
    "title1": '新能源汽车',
    "title2": '纯电动汽车',
    "title3": '纯电动汽车高压安全操作与保养维护',
    "title4": '纯电动汽车基本信息收集与介绍',
    "title5": '',
  }
);


testQuestionSingle1.save();
testQuestionSingle2.save();
testQuestionSingle3.save();
testQuestionSingle4.save();
testQuestionSingle5.save();
testQuestionSingle6.save();
testQuestionSingle7.save();
testQuestionSingle8.save();
testQuestionSingle9.save();
testQuestionSingle10.save();
testQuestionSingle11.save();
testQuestionSingle12.save();
testQuestionSingle13.save();
testQuestionSingle14.save();
testQuestionSingle15.save();
testQuestionSingle16.save();
testQuestionSingle17.save();
testQuestionSingle18.save();
testQuestionSingle19.save();
testQuestionSingle20.save();

