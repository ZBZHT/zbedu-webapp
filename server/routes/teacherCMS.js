const express = require('express');
const router = express.Router();
const _ = require('lodash');
const fs = require("fs");
const path = require('path');
const glob = require('glob');
const formidable = require('formidable');
const uploadsPath = "../app/uploads/addUser/";
const addTestPath = "../app/uploads/addTest/";
const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const Question = require('../app/models/Question');
const xlsx2j = require('xlsx-2-json');
const md5 = require('js-md5');

//删除数组中指定元素  方法
  function removeChildren(arr, id) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      //console.log(arr[i].id);
      if (arr[i].id != id) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  function removeNode(arr, id) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      //console.log(arr[i].id);
      if (arr[i].id != id) {
        result.push(arr[i]);
      }
    }
    return result;
  }

/* 获取目录tree */
router.post('/labelTree', function (req, res) {
  if (req.body.data) {
    let reqBody = req.body.data;
    res.setHeader("Content-Type", "application/json");
    console.log('11');
    console.log(reqBody.userType);

    if (reqBody.userType == 'S' || reqBody.userType == 'O') {
      fs.readFile("../app/mock/CMSlabelTree.json", 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          let labelTree = JSON.parse(data);
          labelTree = removeNode(labelTree, 100);  //传入要删除的Node id
          console.log(labelTree);
          res.status(200).send({
            result: labelTree
          });
        }
      });
    } else if (reqBody.userType == 'T') {
      //console.log('T');
      fs.readFile("../app/mock/CMSlabelTree.json", 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          let labelTree = JSON.parse(data);
          let childrenE = labelTree[1].children;
          children = removeChildren(childrenE, 101);  //传入要删除的Children id
          labelTree[1].children = children;
          res.status(200).send({
            result: labelTree
          });
        }
      });
    } else if (reqBody.userType == 'admin' || reqBody.userType == 'E') {
      fs.readFile("../app/mock/CMSlabelTree.json", 'utf-8', function (err, data) {
        if (err) {
          console.log(err);
        } else {
          let labelTree = JSON.parse(data);
          //console.log(labelTree);
          res.status(200).send({
            result: labelTree
          });
        }
      });
    } else {
      res.status(404).send({
        Msg: '输入权限错误',
        success: 1,
      });
    }
  } else {
    res.status(404).send({
      Msg: '权限数据为null',
      success: 1,
    });
  }
});

/* 获取所有教师数据 */
router.post('/getUserData', function (req, res) {

  if (req.body.data.username) {
    let username = req.body.data.username;
    Teacher.findOne({
      user: username,
    }).then(function (userType) {
      //console.log(userType);
      if (userType.userType == 'admin' || userType.userType == 'E') {
        Teacher.find().then(function (teacher) {
          if (teacher) {
            Student.find().then(function (student) {
              if (student) {
                res.status(200).send({
                  teacher: teacher,
                  student: student,
                });
              }
            });
          }
        });
      } else {
        res.status(404).send({
          Msg: '该用户无权限',
          success: 1,
        });
      }
    });
  } else {
    res.status(404).send({
      Msg: '未获取到用户名',
      success: 1,
    });
  }
});

/*删除所选用户*/
router.post('/delChecked', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    if (reqData.userType == 'admin' || reqData.userType == 'E') {
      for (let i = 0; i < reqData.msg.length; i++) {
        Student.remove({userID: reqData.msg[i].userID}, function (err) {
          if (err) {
            return res.status(404).send({err: err,});
          } else {
            console.log('删除数据成功');
          }
        })
      }
      res.status(200).send({
        success: 0,
      });
    }else {
      res.status(404).send({
        Msg: '该用户无权限',
      });
    }
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});

//添加用户
router.post('/addUser', function (req, res) {
  console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    let addUsers = reqData.addUser;
    if (reqData.userType == 'admin' || reqData.userType == 'E') {
      let addUserData = new Student({
        user: addUsers.user,
        n_name: addUsers.n_name,
        pwd: addUsers.pwd,
        userID: addUsers.userID,
        IDNo: addUsers.IDNo,
        MoNo: addUsers.MoNo,
        userType: addUsers.userType,
        gender: addUsers.gender,
        AdmDate: addUsers.AdmDate,
        major: addUsers.major,
        classGrade: addUsers.classGrade
      });
      addUserData.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Save success');
          res.status(200).send({
            userInfo: addUsers,
            success: 0,
          });
        }
      });
    }else {
      res.status(404).send({
        Msg: '用户无添加权限',
        success: 1,
      });
    }
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});

//Excel导入用户
router.post('/addExcelUsers', function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.uploadDir = uploadsPath;//设置文件上传存放地址
    form.maxFieldsSize = 10 * 1024 * 1024; //设置最大10M
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
      //旧名字
      let fileName = files.file.name;
      //console.log(fileName);
      //新名字
      let oldPath = files.file.path;
      let newPath = uploadsPath + fileName;
      //改名
      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          throw  Error("改名失败");
        }
        //xlsx转换为json
        xlsx2j({
          input: newPath,
          output: newPath + "-output.json"
        }, function(err, result) {
          if(err) {
            console(err);
          }else {
            if (result) {
              let userInfo = [];
              //格式化数据
              for (let i = 0; i < result.length; i++) {
                if (result[i].pwd == '') {
                  result[i].pwd = md5(result[i].IDNo.substring(result[i].IDNo.length-6));
                } else {
                  result[i].pwd = md5(result[i].pwd);
                }
                if (result[i].n_name == '') {
                  result[i].n_name = result[i].user
                }

                userInfo = result;
                let addUserData = new Student({
                  n_name: result[i].n_name,
                  user: result[i].user,
                  pwd: result[i].pwd,
                  userID: result[i].userID,
                  IDNo: result[i].IDNo,
                  MoNo: result[i].MoNo,
                  userType: result[i].userType,
                  gender: result[i].gender,
                  AdmDate: result[i].AdmDate,
                  major: result[i].major,
                  classGrade: result[i].classGrade
                });
                let teacherData = new Teacher({
                  n_name: result[i].n_name,
                  user: result[i].user,
                  pwd: result[i].pwd,
                  userID: result[i].userID,
                  IDNo: result[i].IDNo,
                  MoNo: result[i].MoNo,
                  userType: result[i].userType,
                  gender: result[i].gender,
                  entryTime: result[i].entryTime,
                  major: result[i].major,
                });

                //保存到数据库
                if (fileName == 'student.xlsx') {
                  addUserData.save(function (err) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log('student Save success');
                    }
                  });
                } else if (fileName == 'teacher.xlsx') {
                  teacherData.save(function (err) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log('teacher Save success');
                    }
                  });
                }

              }
              res.status(200).send({
                userInfo: userInfo,
              });
            } else {
              console.log('文件读取错误');
            }
          }
        });
      });
    });
  }
  catch (e) {
    res.status(404).send({
      err: 1,
      msg: e,
    });
  }
});

//更新用户信息
router.post('/updateUser', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    let reqUser = reqData.addUser;
    if (reqData.userType == 'admin' || reqData.userType == 'E') {
      console.log(reqUser);
      //查找userID来更新数据
      Student.findOneAndUpdate({
        userID: reqUser.userID
      }, {
        n_name: reqUser.n_name,
        user: reqUser.user,
        pwd: reqUser.pwd,
        IDNo: reqUser.IDNo,
        MoNo: reqUser.MoNo,
        userType: reqUser.userType,
        gender: reqUser.gender,
        AdmDate: reqUser.AdmDate,
        major: reqUser.major,
        classGrade: reqUser.classGrade
      }, function (err) {
        if (err) {
          console.log(err);
          //查找IDNo来更新数据
          Student.findOneAndUpdate({
            IDNo: reqUser.IDNo
          }, {
            n_name: reqUser.n_name,
            user: reqUser.user,
            pwd: reqUser.pwd,
            userID: reqUser.userID,
            MoNo: reqUser.MoNo,
            userType: reqUser.userType,
            gender: reqUser.gender,
            AdmDate: reqUser.AdmDate,
            major: reqUser.major,
            classGrade: reqUser.classGrade
          }, function (err) {
            if (err) {
              console.log(err);
              res.status(404).send({
                Msg: '更新失败',
              });
            } else {
              console.log('修改成功IDNo');
              res.status(200).send({
                Msg: '更新成功',
              });
            }
          });
        } else {
          console.log('修改成功userID');
          res.status(200).send({
            Msg: '更新成功',
          });
        }
      });
    }
  } else {
    res.status(404).send({
      Msg: '该用户无权限',
      success: 1,
    });
  }
});

//个人信息请求
router.post('/myDataMst', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    //let username = req.body.data.username;
    Student.find().then(function (users) {
      res.status(200).send({
        userInfo: users
      });
    });
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});

//题库管理--显示全部题
router.get('/getAllTest', function (req, res) {
  let reqQ = req.query.userType;
  console.log(reqQ);
  if (reqQ == 'T' || reqQ == 'E' || reqQ == 'admin') {
    Question.find({
    }).then(function (result) {
      res.status(200).send(result);
    });
  }
});

//题库管理--删除选中题
router.post('/delCheckedQ', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    if (reqData.userType == 'admin' || reqData.userType == 'E') {
      for (let i = 0; i < reqData.msg.length; i++) {
        Student.remove({userID: reqData.msg[i].userID}, function (err) {
          if (err) {
            return res.status(404).send({err: err,});
          } else {
            console.log('删除数据成功');
          }
        })
      }
      res.status(200).send({
        success: 0,
      });
    }else {
      res.status(404).send({
        Msg: '该用户无权限',
      });
    }
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});

//Excel导入考试题
router.post('/addExcelTest', function(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.uploadDir = uploadsPath;//设置文件上传存放地址
    form.maxFieldsSize = 10 * 1024 * 1024; //设置最大10M
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
      //旧名字
      let fileName = files.file.name;
      //console.log(fileName);
      //新名字
      let oldPath = files.file.path;
      let newPath = uploadsPath + fileName;
      //改名
      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          throw  Error("改名失败");
        }
        //xlsx转换为json
        xlsx2j({
          input: newPath,
          output: newPath + "-output.json"
        }, function(err, jsonResult) {
          if(err) {
            console(err);
          }else {
            if (jsonResult) {
              //格式化数据
              let fJson = formatExcel(jsonResult);
              //console.log(fJson);
              let numID = '';
              //查找数据库中
              Question.find().sort({id:-1}).then(function (ques) {

                if (ques.length != 0) {
                  numID = Number(ques[0].num);
                } else {
                  numID = 1;
                }
                for (let i=0; i<fJson.length; i++) {
                  numID = Number(numID) + 1;
                  //console.log(numID);

                  let question = new Question({
                    num: numID,
                    desc: fJson[i].desc,
                    options: fJson[i].options,
                    value:fJson[i].value,
                    name:fJson[i].name,
                    forId:fJson[i].forId,
                    answer: fJson[i].answer,
                    type: fJson[i].type,
                    major: fJson[i].major,
                    title1: fJson[i].title1,
                    title2: fJson[i].title2,
                    title3: fJson[i].title3,
                    title4: fJson[i].title4,
                    title5: fJson[i].title5,
                    title6: fJson[i].title6,
                  });

                  //保存到数据库
                  //if (fileName == '发动机考试题.xlsx') {
                  question.save(function (err) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log('question Save success');
                    }
                  });
                  //}
                }
              });

              res.status(200).send({ code: 0 });
            } else {
              res.status(404).send({ code: 1 });
              console.log('文件读取错误');
            }
          }
        });
      });
    });
  }
  catch (e) {
    res.status(404).send({
      code: 1,
      msg: e,
    });
  }
});

//格式化Excel里的数组为json
function formatExcel(arr) {
  let result = [];
  let arrSingle = {
    num: '',
    desc: '',
    options: [],
    answer: '',
    difficulty: '',
    major: '',
    title1: '',
    title2: '',
    title3: '',
    title4: '',
    title5: '',
    title6: '',
    forId: [],
  };
  for (let i=0; i<arr.length; i++) {
      arrSingle.num = arr[i].num;
      arrSingle.desc = arr[i].desc;
      arrSingle.options.push(arr[i].options0);
      arrSingle.options.push(arr[i].options1);
      arrSingle.options.push(arr[i].options2);
      arrSingle.options.push(arr[i].options3);
      arrSingle.answer = arr[i].answer;
      arrSingle.difficulty = arr[i].difficulty;
      arrSingle.major = arr[i].major;
      arrSingle.title1 = arr[i].title1;
      arrSingle.title2 = arr[i].title2;
      arrSingle.title3 = arr[i].title3;
      arrSingle.title4 = arr[i].title4;
      arrSingle.title5 = arr[i].title5;
      arrSingle.title6 = arr[i].title6;
      arrSingle.forId.push(arr[i].forId0);
      arrSingle.forId.push(arr[i].forId1);
      arrSingle.forId.push(arr[i].forId2);
      arrSingle.forId.push(arr[i].forId3);

      result.push(arrSingle);

      arrSingle = {
        num: '',
        desc: '',
        options: [],
        answer: '',
        difficulty: '',
        major: '',
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: '',
        title6: '',
        forId: [],
      };
  }
  return result
}

module.exports = router;
