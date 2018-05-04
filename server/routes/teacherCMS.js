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
const TechCosCou = require('../app/models/TechCosCou');
const xlsx2j = require('xlsx-2-json');
const md5 = require('js-md5');
const uploadCoursePath = "../app/uploads/pdf/";
const uploadVideoPath = "../app/uploads/video/";

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
          labelTree = removeNode(labelTree, 300);  //传入要删除的Node id
          //console.log(labelTree);
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
          let children1 = labelTree[2].children;
          children = removeChildren(childrenE, 101);  //传入要删除的Children id
          children2 = removeChildren(children1, 302);  //传入要删除的Children id
          labelTree[1].children = children;
          labelTree[2].children = children2;
          //console.log(labelTree[2]);
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
router.post('/delUserData', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    if (reqData.userType == 'admin' || reqData.userType == 'E') {
      if (reqData.studentSelection.length != 0) {
        for (let i = 0; i < reqData.studentSelection.length; i++) {
          Student.remove({userID: reqData.studentSelection[i].userID}, function (err) {
            if (err) {
              return res.status(404).send({err: err,});
            } else {
              console.log('删除数据成功');
              res.status(200).send({
                code: 0,
              });
            }
          })
        }
      } else if (reqData.teacherSelection.length != 0) {
        for (let i = 0; i < reqData.teacherSelection.length; i++) {
          Teacher.remove({userID: reqData.teacherSelection[i].userID}, function (err) {
            if (err) {
              return res.status(404).send({err: err,});
            } else {
              console.log('删除数据成功');
              res.status(200).send({
                code: 0,
              });
            }
          })
        }
      }
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
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    let addUsers = reqData.addUser;
    if (reqData.userType == 'admin' || reqData.userType == 'E') {
      let addUserData = new Student({
        user: addUsers.user,
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

                userInfo = result;
                let addUserData = new Student({
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
//修改密码
router.post('/updatePass', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    if (reqData.userType == 'O' || reqData.userType == 'S') {
      Student.findOneAndUpdate({
        userID: reqData.userID
      }, {
        pwd: reqData.form.checkPass,
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(404).send({ code: 1, Msg: '更新失败', });
        } else {
          console.log('密码更新成功');
          res.status(200).send({ code: 0, Msg: '更新成功', });
        }
      });
    } else if (reqData.userType == 'E' || reqData.userType == 'T' || reqData.userType == 'admin') {
      Teacher.findOneAndUpdate({
        userID: reqData.userID
      }, {
        pwd: reqData.form.checkPass,
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(404).send({ code: 1, Msg: '更新失败', });
        } else {
          console.log('密码更新成功');
          res.status(200).send({ code: 0, Msg: '更新成功', });
        }
      });
    }
  } else {
    res.status(404).send({
      Msg: '该用户无权限',
      code: 1,
    });
  }
});
//修改手机号
router.post('/updateMoNo', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    if (reqData.userType == 'O' || reqData.userType == 'S') {
      Student.findOneAndUpdate({
        userID: reqData.userID
      }, {
        MoNo: reqData.form.newMoNo,
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(404).send({ code: 1, Msg: '更新失败', });
        } else {
          console.log('手机号更新成功');
          res.status(200).send({ code: 0, Msg: '更新成功', });
        }
      });
    } else if (reqData.userType == 'E' || reqData.userType == 'T' || reqData.userType == 'admin') {
      Teacher.findOneAndUpdate({
        userID: reqData.userID
      }, {
        MoNo: reqData.form.newMoNo,
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(404).send({ code: 1, Msg: '更新失败', });
        } else {
          console.log('手机号更新成功');
          res.status(200).send({ code: 0, Msg: '更新成功', });
        }
      });
    }
  } else {
    res.status(404).send({
      Msg: '该用户无权限',
      code: 1,
    });
  }
});

//获取个人信息请求
router.post('/getMyMsg', function (req, res) {
  if (req.body.data) {
    let reqD = req.body.data;
    if (reqD.userType === 'S' || reqD.userType === 'O') {
      Student.findOne({
        userID: reqD.userID,
      }).then(function (users) {
        if (users) {
          res.status(200).send({
            userInfo: users
          });
        } else {
          res.status(404).send({ code: 0 });
        }
      });
    } else if (reqD.userType === 'T' || reqD.userType === 'E' || reqD.userType === 'admin') {
      Teacher.findOne({
        userID: reqD.userID,
      }).then(function (users) {
        if (users) {
          res.status(200).send({
            userInfo: users
          });
        } else {
          res.status(404).send({ code: 0 });
        }
      });
    }
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
              let numID = '';
              let result = [];
              let arrSingle = {
                num: '',
                desc: '',
                options: [],
                value: [],
                answer: '',
                type: '',
                genre: '',
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
              Question.find().sort({num:-1}).then(function (ques) {
                if (ques.length != 0) {
                  numID = Number(ques[0].num);
                } else {
                  numID = 1;
                }
              }).then(function () {
                for (let i=0; i<jsonResult.length; i++) {
                  if (jsonResult[i].desc != '') {
                    numID = Number(numID) + 1;
                    arrSingle.num = numID;
                    arrSingle.desc = jsonResult[i].desc;
                    arrSingle.options.push(jsonResult[i].options0);
                    arrSingle.options.push(jsonResult[i].options1);
                    arrSingle.value.push('A');
                    arrSingle.value.push('B');
                    if (jsonResult[i].options2 !== '' && jsonResult[i].options2 !== undefined) {
                      arrSingle.options.push(jsonResult[i].options2);
                      arrSingle.value.push('C');
                    }
                    if (jsonResult[i].options3 !== '' && jsonResult[i].options3 !== undefined) {
                      arrSingle.options.push(jsonResult[i].options3);
                      arrSingle.value.push('D');
                    }
                    arrSingle.answer = jsonResult[i].answer;
                    if (jsonResult[i].difficulty !== '') {
                      arrSingle.difficulty = jsonResult[i].difficulty;
                    } else {
                      arrSingle.difficulty = '低';
                    }
                    if (jsonResult[i].major === '') {
                      arrSingle.major = jsonResult[0].major;
                    } else {
                      arrSingle.major = jsonResult[i].major;
                    }
                    if (jsonResult[i].title1 === '') {
                      arrSingle.title1 = jsonResult[0].title1;
                    } else {
                      arrSingle.title1 = jsonResult[i].title1;
                    }
                    if (jsonResult[i].title2 === '') {
                      arrSingle.title2 = jsonResult[0].title2;
                    } else {
                      arrSingle.title2 = jsonResult[i].title2;
                    }
                    if (jsonResult[i].title3 === '') {
                      arrSingle.title3 = jsonResult[0].title3;
                    } else {
                      arrSingle.title3 = jsonResult[i].title3;

                    }
                    if (jsonResult[i].title4 === '') {
                      arrSingle.title4 = jsonResult[0].title4;
                    } else {
                      arrSingle.title4 = jsonResult[i].title4;
                    }
                    if (jsonResult[i].title5 === '') {
                      arrSingle.title5 = jsonResult[0].title5;
                    } else {
                      arrSingle.title5 = jsonResult[i].title5;
                    }
                    if (jsonResult[i].title6 === '') {
                      arrSingle.title6 = jsonResult[0].title6;
                    } else {
                      arrSingle.title6 = jsonResult[i].title6;
                    }
                    arrSingle.forId.push('A' + numID);
                    arrSingle.forId.push('B' + numID);
                    if (jsonResult[i].options2 !== '' && jsonResult[i].options2 !== undefined) {
                      arrSingle.forId.push('C' + numID);
                    }
                    if (jsonResult[i].options3 !== '' && jsonResult[i].options3 !== undefined) {
                      arrSingle.forId.push('D' + numID);
                    }
                    arrSingle.type = 'radio';
                    if ((jsonResult[i].options2 === '' || jsonResult[i].options2 === undefined) && (jsonResult[i].options3 === '' || jsonResult[i].options3 === undefined)) {
                      arrSingle.genre = 'judge';
                    }
                    if (jsonResult[i].answer.length >= 2) {
                      arrSingle.genre = 'MultiSelect';
                    } else {
                      arrSingle.genre = 'select';
                    }
                    result.push(arrSingle);

                    arrSingle = {
                      num: '',
                      desc: '',
                      options: [],
                      value: [],
                      answer: '',
                      type: '',
                      genre: '',
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
                }
              }).then(function () {
                //console.log(result);
                for (let i=0; i<result.length; i++) {
                  if (result[i].desc !== '') {
                    let question = new Question({
                      num: result[i].num,
                      desc: result[i].desc,
                      options: result[i].options,
                      value:result[i].value,
                      name:result[i].name,
                      forId:result[i].forId,
                      answer: result[i].answer,
                      genre: result[i].genre,
                      difficulty: result[0].difficulty,
                      type: result[i].type,
                      major: result[0].major,
                      title1: result[i].title1,
                      title2: result[i].title2,
                      title3: result[i].title3,
                      title4: result[i].title4,
                      title5: result[i].title5,
                      title6: result[i].title6,
                    });
                    //保存到数据库
                    question.save(function (err) {
                       if (err) {
                       console.log(err);
                       } else {
                       console.log('question Save success');
                       }
                    });
                  }
                }
              }).then(function () {
                res.status(200).send({ code: 0 });
                console.log('question Save success all')
              })
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

//教师, 获取自定义课程
router.post('/getTeacherCustomCourse', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    console.log(reqData);
    if (reqData.userType == 'admin' || reqData.userType == 'E' || reqData.userType == 'T') {
      TechCosCou.find({
        userID : reqData.userID,
      }).then(function (techCosCou) {
        console.log(techCosCou.length);
        if (techCosCou.length !=0) {
          res.status(200).send({ techCosCou: techCosCou, });
        } else if (techCosCou.length === 0) {
          let techCosCou = new TechCosCou({
            userID: reqData.userID,
            newTime: new Date(),
            tab: []
          });
          techCosCou.save(function (err) {
            if (err) {
              console.log(err)
            } else {
              console.log('Save success');
              TechCosCou.find({
                userID : reqData.userID,
              }).then(function (techCosCou) {
                res.status(200).send({ techCosCou: techCosCou, });
              });

            }
          });
        } else {
          res.status(404).send({ Msg: '无法获取请求数据', code: 1, });
        }

      });
    }else {
      res.status(404).send({
        Msg: '用户无添加权限',
        code: 1,
      });
    }
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      code: 1,
    });
  }
});

//教师, 添加自定义课程
router.post('/addCustomCourse', function (req, res) {
  //console.log(req.body.data.tab);
  if (req.body.data) {
    let reqData = req.body.data;
    if (reqData.userType == 'admin' || reqData.userType == 'E' || reqData.userType == 'T') {
      TechCosCou.findOneAndUpdate({
        userID : reqData.userID,
      }, {
        tab: reqData.tab,
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(404).send({ Msg: '更新失败', code: 1, });
        } else {
          console.log('修改成功course');
          res.status(200).send({ Msg: '更新成功', code: 0, });
        }
      });
    } else {
      res.status(404).send({
        Msg: '用户无添加权限',
        code: 1,
      });
    }
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      code: 1,
    });
  }
});

//教师上传课件
router.post('/uploadCourse', function(req, res) {
  let reqUserType = req.session.users.userType;
  if (reqUserType === 'T' || reqUserType === 'E' || reqUserType === 'admin') {

    let form = new formidable.IncomingForm();
    form.uploadDir = "../app/uploads/";//设置文件上传存放地址
    form.maxFieldsSize = 1000 * 1024 * 1024; //设置最大1000M
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
      //旧名字
      let fileName = files.file.name;
      console.log(fileName);
      //新名字
      let oldPath = files.file.path;
      let newPath = '';
      arr = fileName.split(".");
      if (arr[arr.length-1] === 'pdf') {
        newPath = uploadCoursePath + fileName;
      } else {
        newPath = uploadVideoPath + fileName;
      }
      fs.rename(oldPath, newPath, function (err) {
        if (err) {
          throw  Error("改名失败");
        }
        fs.stat(newPath, function(err,stats){  //获取文件信息
          if(err){
            return err;
          }
          res.status(200).send({
            Msg : '上传成功',
            code : 0,
          });
        });
      });
    });
  } else {
    res.status(404).send({
      Msg : '用户无权限或未登录',
      code : 1,
    });
  }
});

//获取课程树
router.post('/getCenterTree', function(req, res) {
  let reqUserType = req.session.users.userType;
  if (reqUserType === 'E' || reqUserType === 'admin') {

  } else {
    res.status(404).send({
      Msg : '用户无权限或未登录',
      code : 1,
    });
  }
});
//更新课程树
router.post('/updateCenterTree', function(req, res) {
  let reqUserType = req.session.users.userType;
  if (reqUserType === 'E' || reqUserType === 'admin') {

  } else {
    res.status(404).send({
      Msg : '用户无权限或未登录',
      code : 1,
    });
  }
});

//上传头像
router.post('/uploadAvatar', function(req, res) {
  let form = new formidable.IncomingForm();
  form.uploadDir = "../public/resource/myAvatar";//设置头像上传存放地址
  form.maxFieldsSize = 2 * 1024 * 1024; //设置最大2M
  form.keepExtensions = true;
  let reqS = req.session.users;

  form.parse(req, function (err, fields, files) {
    let arr = files.file.path.split('\\');
    fs.writeFileSync("../../resource/myAvatar/" + arr[arr.length-1], fs.readFileSync("../public/resource/myAvatar/" + arr[arr.length-1],'utf8'));
    //console.log(arr[arr.length-1]);
    if (reqS.userType === 'S' || reqS.userType === 'O') {
      Student.findOneAndUpdate({
        userID: reqS.userID
      },{
        avatar: arr[arr.length-1]
      },function (err) {
        if (err) {
          res.status(404).send({ Msg : '上传成功', code : 0, });
          console.log(err);
        }else {
          res.status(200).send({ Msg : '上传成功', code : 0, });
        }
      })
    } else if (reqS.userType === 'T' || reqS.userType === 'E' || reqS.userType === 'admin') {
      Teacher.findOneAndUpdate({
        userID: reqS.userID
      },{
        avatar: arr[arr.length-1]
      },function (err) {
        if (err) {
          res.status(404).send({ Msg : '上传成功', code : 0, });
          console.log(err);
        }else {
          res.status(200).send({ Msg : '上传成功', code : 0, });
        }
      })
    }
  });
});

module.exports = router;
