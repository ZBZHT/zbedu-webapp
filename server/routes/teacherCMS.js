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
const CmsLabelTree = require('../app/models/CmsLabelTree');
const xlsx2j = require('xlsx-2-json');
const md5 = require('js-md5');
const uploadCoursePath = "../public/resource/我的课堂/";
const core = require('../utils/core');
const moment = require('moment');
const ppt2png = require('ppt2png');
const pdf = require('pdf-poppler');
const os = require('os');

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

    if (reqBody.userType === 'S' || reqBody.userType === 'O') {
      CmsLabelTree.findOne({
        name: 'cmsLabelTree'
      }).then(function (tree) {
        let labelTree = tree.children;
        labelTree = removeNode(labelTree, 100);  //传入要删除的Node id
        labelTree = removeNode(labelTree, 300);  //传入要删除的Node id
        labelTree = removeNode(labelTree, 500);  //传入要删除的Node id
          res.status(200).send({ result: labelTree });
      });
    } else if (reqBody.userType === 'T') {
      CmsLabelTree.findOne({
        name: 'cmsLabelTree'
      }).then(function (tree) {
        let labelTree = tree.children;
        let childrenE = labelTree[1].children;
        let children1 = labelTree[2].children;
        children = removeChildren(childrenE, 101);  //传入要删除的Children id
        children2 = removeChildren(children1, 302);  //传入要删除的Children id
        labelTree[1].children = children;
        labelTree[2].children = children2;
        res.status(200).send({ result: labelTree });
      });
    } else if (reqBody.userType === 'SA' || reqBody.userType === 'EA') {
      CmsLabelTree.findOne({
        name: 'cmsLabelTree'
      }).then(function (tree) {
        res.status(200).send({ result: tree.children });
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
      if (userType.userType == 'SA' || userType.userType == 'EA') {
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
    if (reqData.userType == 'SA' || reqData.userType == 'EA') {
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

//添加学生
router.post('/addStu', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    let addUsers = reqData.stuForm;
    console.log(addUsers);
    if (reqData.userType == 'SA' || reqData.userType == 'EA') {
      let student = new Student({
        user: addUsers.user,
        pwd: addUsers.pwd,
        userID: addUsers.userID,
        IDNo: addUsers.IDNo,
        MoNo: addUsers.MoNo,
        userType: addUsers.userType,
        gender: addUsers.gender,
        time: addUsers.time,
        major: addUsers.major,
        classGrade: addUsers.classGrade
      });
      student.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Save success');
          res.status(200).send({ code: 0, msg: '学生信息保存成功'});
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
//添加教师
router.post('/addTeach', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    let addUsers = reqData.teachForm;
    let EE = [];
    let ID = '';
    //console.log(addUsers);
    if (reqData.userType == 'SA' || reqData.userType == 'EA') {
      Teacher.find().then(function (idArr) {
        if (idArr.length !== 0) {
          for (let i=0; i<idArr.length; i++) {
            EE.push(idArr[i].userID)
          }
          ID = (Math.max.apply(null, EE)) + 1;
        } else {
          ID = 1;
        }

        let teacher = new Teacher({
          user: addUsers.user,
          pwd: addUsers.pwd,
          userID: ID,
          IDNo: addUsers.IDNo,
          MoNo: addUsers.MoNo,
          userType: addUsers.userType,
          //gender: addUsers.gender,
          //time: addUsers.time,
        });
        teacher.save(function (err) {
          if (err) {
            console.log(err)
          } else {
            console.log('Save success');
            res.status(200).send({ code: 0, msg: '教师信息保存成功'});
          }
        });
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
            //console.log(result);
            if (result) {
              //格式化数据
              for (let i = 0; i < result.length; i++) {
                function start() {
                  return new Promise((resolve, reject) => {
                    resolve('start');
                  });
                }

                start()
                  .then(data => {
                    if (result[i].gender === '男') {
                      result[i].gender = 1;
                    } else if (result[i].gender === '女') {
                      result[i].gender = 2;
                    }

                    if (result[i].userType === '学生') {
                      result[i].userType = 'S';
                    } else if (result[i].userType === '老师') {
                      result[i].userType = 'T';
                    }else if (result[i].userType === '教务管理') {
                      result[i].userType = 'EA';
                    }

                    if (result[i].pwd) {
                      if (result[i].pwd === '') {
                        result[i].pwd = md5('111111');
                        //result[i].pwd = md5(result[i].IDNo.substring(result[i].IDNo.length-6));
                      } else {
                        result[i].pwd = md5(result[i].pwd);
                      }
                    } else {
                      result[i].pwd = md5('111111');
                    }
                    result[i].time = moment(result[i].time).format("YYYY-MM-DD");
                  })

                  .then(data => {
                    //console.log(result);
                    if (result[i].userType === 'S' || result[i].userType === 'O') {
                      let addStuData = new Student({
                        user: result[i].user,
                        pwd: result[i].pwd,
                        userID: result[i].userID,
                        IDNo: result[i].IDNo,
                        MoNo: result[i].MoNo,
                        userType: result[i].userType,
                        gender: result[i].gender,
                        time: result[i].time,
                        department: result[i].department,
                        major: result[i].major,
                        classGrade: result[i].classGrade,
                        email: result[i].email
                      });
                      addStuData.save(function (err) {
                        if (err) {
                          console.log(err)
                        } else {
                          console.log('student Save success');
                        }
                      });
                    } else if (result[i].userType === 'T' || result[i].userType === 'EA') {
                      let teacherData = new Teacher({
                        user: result[i].user,
                        pwd: result[i].pwd,
                        userID: result[i].userID,
                        IDNo: result[i].IDNo,
                        MoNo: result[i].MoNo,
                        userType: result[i].userType,
                        gender: result[i].gender,
                        time: result[i].time,
                        //major: result[i].major,
                      });
                      teacherData.save(function (err) {
                        if (err) {
                          console.log(err)
                        } else {
                          console.log('teacher Save success');
                        }
                      });
                    }
                  })

                  .then(data => {
                    res.status(200).send({ code: 0, msg: '学生信息保存成功' });
                  });

              }
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
    if (reqData.userType == 'SA' || reqData.userType == 'EA') {
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
    } else if (reqData.userType == 'EA' || reqData.userType == 'T' || reqData.userType == 'SA') {
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
    } else if (reqData.userType == 'EA' || reqData.userType == 'T' || reqData.userType == 'SA') {
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
    } else if (reqD.userType === 'T' || reqD.userType === 'EA' || reqD.userType === 'SA') {
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
  if (reqQ == 'T' || reqQ == 'EA' || reqQ == 'SA') {
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
    if (reqData.userType == 'SA' || reqData.userType == 'EA') {
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

  let form = new formidable.IncomingForm();
  form.uploadDir = addTestPath;//设置文件上传存放地址
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

                  if (jsonResult[i].options0 !== '' && jsonResult[i].options0 !== undefined) {
                    arrSingle.options.push(jsonResult[i].options0);
                    arrSingle.value.push('A');
                  } else {
                    arrSingle.options.push(jsonResult[0].options0);
                    arrSingle.value.push('A');
                  }
                  if (jsonResult[i].options1 !== '' && jsonResult[i].options1 !== undefined) {
                    arrSingle.options.push(jsonResult[i].options1);
                    arrSingle.value.push('B');
                  } else {
                    arrSingle.options.push(jsonResult[0].options1);
                    arrSingle.value.push('B');
                  }
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
});

//教师, 获取自定义课程
router.post('/getTeacherCustomCourse', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    let username = req.session.users.username;
    if (reqData.userType == 'SA' || reqData.userType == 'EA' || reqData.userType == 'T') {
      if (!fs.existsSync(uploadCoursePath + username)) {
        fs.mkdirSync(uploadCoursePath + username);
      }
      TechCosCou.find({
        userID : reqData.userID,
      }).then(function (techCosCou) {

        if (techCosCou.length !==0) {
          let lab = techCosCou[0].tab;
          //console.log(techCosCou[0].tab);
          if (lab !== 0) {
            for (let i = 0; i < lab.length; i++) {
              let path = uploadCoursePath + username + '/' + lab[i].label;
              //console.log(path);
              if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
              }
            }
          }

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
    let username = req.session.users.username;
    if (reqData.userType == 'SA' || reqData.userType == 'EA' || reqData.userType == 'T') {
      //console.log(reqData.tab);
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
          for (i = 0; i < reqData.tab.length; i++) {
            if (reqData.tab[i].label !== '') {
              let path = uploadCoursePath + username + '/' + reqData.tab[i].label;
              if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
              }
            }
          }
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
  let username = req.session.users.username;
  if (reqUserType === 'T' || reqUserType === 'EA' || reqUserType === 'SA') {

    let form = new formidable.IncomingForm();
    form.uploadDir = uploadCoursePath;//设置文件上传存放地址
    form.maxFieldsSize = 500 * 1024 * 1024; //设置最大500M
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
      //旧名字
      if (files.file.name !== undefined) {
        let fileName = files.file.name;
        //console.log(fileName);
        //新名字
        let oldPath = files.file.path;
        let newPath = '';
        arr = fileName.split(".");
        if (arr[arr.length-1] === 'pdf' || arr[arr.length-1] === 'ppt') {
          //pdf/ppt的处理
          newPath = uploadCoursePath + username +'/' + fileName;
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              console.log('改名失败');
              res.status(404).send({ Msg : '改名失败', code : 1, });
            }
            fs.stat(newPath, function(err,stats){  //获取文件信息
              if(err){
                return err;
              }
              res.status(200).send({ Msg : '上传成功', code : 0, });
            });
          });
        //是pdf的处理
        } else {
          newPath = uploadCoursePath + username +'/' + fileName;
          //console.log(newPath);
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              console.log('改名失败');
              res.status(404).send({ Msg : '改名失败', code : 1, });
            }
            fs.stat(newPath, function(err,stats){  //获取文件信息
              if(err){
                return err;
              }
              res.status(200).send({ Msg : '上传成功', code : 0, });
            });
          });
        }

      } else {
        res.status(404).send({ Msg : '上传的文件名为空', code : 1, });
      }
    });
  } else {
    res.status(404).send({ Msg : '用户无权限或未登录', code : 1, });
  }
});

//教师上传课件--成功后处理文件
router.post('/uploadCourseSec', function(req, res) {
  let newFileName1 = req.body.data.newFileName1;
  let newFileName2 = req.body.data.newFileName2;
  let fileName = req.body.data.fileName;
  let reqUserType = req.session.users.userType;
  let username = req.session.users.username;
  let sysType=os.type();
  let newPath = '';
  if (reqUserType === 'T' || reqUserType === 'EA' || reqUserType === 'SA') {

    let arr = fileName.split(".");
    newPath = uploadCoursePath + username +'/';
    //console.log(newPath);
    if (!fs.existsSync(newPath + newFileName1)) {
      fs.mkdirSync(newPath + newFileName1);
    }
    if (!fs.existsSync(newPath + newFileName1 +'/' + newFileName2 )) {
      fs.mkdirSync(newPath + newFileName1 +'/' + newFileName2);
    }
    let pdfPath = newPath + fileName;
    let coursePath = newPath + newFileName1 +'/' + newFileName2 +'/' + arr[0] + '-课件';
    //console.log(pdfPath);
    //console.log(coursePath);
    //pdf||ppt转png
    let p1 = new Promise((resolve, reject) => {
      if (!fs.existsSync(coursePath)) {
        fs.mkdirSync(coursePath);
        resolve('目录创建成功')
      }
      resolve('目录已存在')
    });

    let p2 = new Promise((resolve, reject) => {
      if (sysType !== 'linux') {
        let opts = {
          format: 'png',
          out_dir: coursePath,
          out_prefix: 'pdf',
          page: null
        };
        pdf.convert(pdfPath, opts)
          .then(res => {
            let path_dir = coursePath;
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
                    resolve('Windows_NT下convert successful')
                  })
                }
              }
             /* fs.unlink(f, function (err) {
                if (err) return console.log(err);
                console.log('文件删除成功');
              });*/
            });
          })
          .catch(error => {
            console.error(error);
          });

      } else if (sysType === 'linux') {
        ppt2png(coursePath, path + '/pdf', function (err) {
          if (err) {
            console.log(err);
          } else {
            resolve('linux下convert successful')
          }
        });
      }
    });

    Promise.all([p1, p2]).then((msg) => {
      res.status(200).send({ code: 0, msg: msg});
      console.log(msg)
    }).catch((error) => {
      console.log(error)
    });

  }
});
//获取课程树
router.post('/getCenterTree', function(req, res) {
  let reqUserType = req.session.users.userType;
  if (reqUserType === 'EA' || reqUserType === 'SA') {

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
  if (reqUserType === 'EA' || reqUserType === 'SA') {

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
    } else if (reqS.userType === 'T' || reqS.userType === 'EA' || reqS.userType === 'SA') {
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

//获取班级和专业
router.post('/getClass', function (req, res) {
  //console.log('jdsfjawnejkfnaef');
  Student.find({
  }).then(function (student) {
    let classMsg = [];
    let majorMsg = [];
    let CC = [];
    let MM = [];
    if (student) {
      for (let i=0; i<student.length; i++) {
        classMsg.push(student[i].classGrade);
        majorMsg.push(student[i].major);
      }
      classMsg = core.unique(classMsg);
      for (let i=0; i<classMsg.length; i++) {
        CC.push({label: classMsg[i]});
      }
      majorMsg = core.unique(majorMsg);
      for (let i=0; i<majorMsg.length; i++) {
        MM.push({label: majorMsg[i]});
      }
      res.status(200).send({
        classMsg: CC,
        majorMsg: MM
      });
    } else {
      res.status(404).send({ code: 0 });
    }
  });
});





module.exports = router;
