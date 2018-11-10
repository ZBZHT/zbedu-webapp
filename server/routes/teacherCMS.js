const express = require('express');
const router = express.Router();
const _ = require('lodash');
const fs = require("fs");
const path = require('path');
const glob = require('glob');
const formidable = require('formidable');
const bannerLeftData = require('../app/mock/bannerLeftData.json');
const uploadsPath = "../app/uploads/addUser/";
const addTestPath = "../app/uploads/addTest/";
const Student = require('../app/models/Student');
const Teacher = require('../app/models/Teacher');
const Question = require('../app/models/Question');
const TechCosCou = require('../app/models/TechCosCou');
const CmsLabelTree = require('../app/models/CmsLabelTree');
const CourseTable = require('../app/models/CourseTable');
const TimeSheet = require('../app/models/TimeSheet');
const StuLeave = require('../app/models/StuLeave');
const SetCourse = require('../app/models/SetCourse');
const CenterTree = require('../app/models/CenterTree');
const xlsx2j = require('xlsx-2-json');
const md5 = require('js-md5');
const uploadCoursePath = "../public/resource/我的课堂/";
const core = require('../utils/core');
const moment = require('moment');
const ppt2png = require('ppt2png');
const os = require('os');

let courseP;
router.use(function (req, res, next) {
  courseP = [{
    "newCourse": [
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      }
    ],
    "newCourse2": [
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      }
    ],
    "newCourse3": [
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      }
    ],
    "newCourse4": [
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      }
    ],
    "newCourse5": [
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      },
      {
        "courseTime": "",
        "teacher": "",
        "courseName": "",
        "courseAddress": ""
      }
    ]
  }];
  next();
});

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
        labelTree = removeNode(labelTree, 600);  //删除管理员的课堂管理
        labelTree = removeNode(labelTree, 700);  //删除教师的课堂管理
        let children3 = labelTree[2].children;
        childrenC = removeChildren(children3, 502);  //传入要删除的Children id资讯管理
        labelTree[2].children = childrenC;
        res.status(200).send({result: labelTree});
      });
    } else if (reqBody.userType === 'T') {
      CmsLabelTree.findOne({
        name: 'cmsLabelTree'
      }).then(function (tree) {
        let labelTree = tree.children;
        let childrenE = labelTree[1].children;
        let children1 = labelTree[2].children;
        let children3 = labelTree[4].children;
        children = removeChildren(childrenE, 101);  //传入要删除的Children id
        children2 = removeChildren(children1, 302);  //传入要删除的Children id
        childrenC = removeChildren(children3, 502);  //传入要删除的Children id资讯管理
        labelTree = removeNode(labelTree, 600);  //删除管理员的课堂管理
        labelTree = removeNode(labelTree, 800);  //删除学生的课堂管理
        labelTree[1].children = children;
        labelTree[2].children = children2;
        labelTree[4].children = childrenC;
        res.status(200).send({result: labelTree});
      });
    } else if (reqBody.userType === 'SA' || reqBody.userType === 'EA') {
      CmsLabelTree.findOne({
        name: 'cmsLabelTree'
      }).then(function (tree) {
        let labelTree = tree.children;
        labelTree = removeNode(labelTree, 800);  //删除学生的课堂管理
        labelTree = removeNode(labelTree, 700);  //删除教师的课堂管理

        res.status(200).send({result: labelTree});
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

/* 获取所有用户数据 */
router.post('/getUserData', function (req, res) {
  if (req.body.data.username) {
    let username = req.body.data.username;
    Teacher.findOne({
      user: username,
    }).then(function (userType) {
      //console.log(userType);
      if (userType !== null) {
        if (userType.userType == 'SA' || userType.userType == 'EA') {
          Teacher.find({
            userType: {"$in": ['EA', 'T']}
          }).then(function (teacher) {
            if (teacher) {
              Student.find().then(function (student) {
                //console.log(student);
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
    if (reqData.userType === 'SA' || reqData.userType === 'EA') {
      //console.log(reqData.studentSelection.length);
      //console.log(reqData.teacherSelection.length);
      if (reqData.studentSelection.length !== 0) {
        for (let i = 0; i < reqData.studentSelection.length; i++) {
          Student.remove({userID: reqData.studentSelection[i].userID}, function (err) {
            if (err) {
              console.log(err);
              res.status(200).send({code: 1, msg: '删除失败'});
            } else {
              //console.log('删除成功');
            }
          })
        }
        res.status(200).send({code: 0, msg: '删除成功'});
      } else if (reqData.teacherSelection.length !== 0) {
        for (let i = 0; i < reqData.teacherSelection.length; i++) {
          Teacher.remove({userID: reqData.teacherSelection[i].userID}, function (err) {
            if (err) {
              console.log(err);
              res.status(200).send({code: 1, msg: '删除失败'});
            } else {
              //console.log('删除成功');
            }
          })
        }
        res.status(200).send({code: 0, msg: '删除成功'});
      }
    } else {
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
    //console.log(addUsers);
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
          let errMsg = err.message;
          if ((errMsg.search(addUsers.userID) !== -1) === true) {
            res.status(200).send({code: 1, msg: '学号重复，请核对！'});
          }
          if ((errMsg.search(addUsers.IDNo) !== -1) === true) {
            res.status(200).send({code: 1, msg: '身份证号重复，请核对！'});
          }
          if ((errMsg.search(addUsers.MoNo) !== -1) === true) {
            res.status(200).send({code: 1, msg: '手机号码重复，请核对！'});
          }
        } else {
          console.log('Save success');
          res.status(200).send({code: 0, msg: '学生信息保存成功'});
        }
      });
    } else {
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
          for (let i = 0; i < idArr.length; i++) {
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
          gender: addUsers.gender,
          userType: addUsers.userType,
        });
        teacher.save(function (err) {
          if (err) {
            let errMsg = err.message;
            if ((errMsg.search(addUsers.IDNo) !== -1) === true) {
              res.status(200).send({code: 1, msg: '身份证号重复，请核对！'});
            }
            if ((errMsg.search(addUsers.MoNo) !== -1) === true) {
              res.status(200).send({code: 1, msg: '手机号码重复，请核对！'});
            }
          } else {
            //console.log('Save success');
            res.status(200).send({code: 0, msg: '教师信息保存成功'});
          }
        });
      });
    } else {
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
router.post('/addExcelUsers', function (req, res) {
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
        }, function (err, result) {
          if (err) {
            console(err);
          } else {
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
                    } else if (result[i].userType === '教务管理') {
                      result[i].userType = 'EA';
                    }

                    if (result[i].pwd) {
                      if (result[i].pwd === '') {
                        //result[i].pwd = md5('111111');
                        result[i].pwd = md5(result[i].MoNo.substring(result[i].MoNo.length-4));
                      } else {
                        result[i].pwd = md5(result[i].pwd);
                      }
                    } else {
                      result[i].pwd = md5(result[i].MoNo.substring(result[i].MoNo.length-4));
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
                    res.status(200).send({code: 0, msg: '学生信息保存成功'});
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
  let reqData = req.body.data;
  let reqUserType = reqData.userType;
  let reqUser = reqData.addUser;
  //console.log(reqUser);
  let p1 = new Promise((resolve, reject) => {
    if (reqUserType === 'SA' || reqUserType === 'EA') {
      resolve('成功了1')
    } else {
      res.status(200).send({code: 1, Msg: '未登录或者该用户无权限',});
    }
  });

  Promise.all([p1]).then((result) => {
    //console.log(result);
    //console.log(reqUser);
    if (reqUser.userType === 'S' || reqUser.userType === 'O') {
      Student.findOneAndUpdate({
        userID: reqUser.userID
      }, {
        user: reqUser.user,
        MoNo: reqUser.MoNo,
        IDNo: reqUser.IDNo,
        userType: reqUser.userType,
        gender: reqUser.gender,
        AdmDate: reqUser.AdmDate,
        major: reqUser.major,
        classGrade: reqUser.classGrade,
        pwd: reqUser.pwd,
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '更新失败',});
        } else {
          //console.log('修改成功IDNo');
          res.status(200).send({code: 0, Msg: '更新成功',});
        }
      });

    } else if (reqUser.userType === 'EA' || reqUser.userType === 'T') {
      //console.log(reqUser);
      Teacher.findOneAndUpdate({
        userID: reqUser.userID
      }, {
        user: reqUser.user,
        pwd: reqUser.pwd,
        IDNo: reqUser.IDNo,
        MoNo: reqUser.MoNo,
        userType: reqUser.userType,
        gender: reqUser.gender,
      }, function (err) {
        if (err) {
          console.log(err);
          //查找IDNo来更新数据
        } else {
          //console.log('修改成功userID');
          res.status(200).send({code: 0, Msg: '更新成功',});
        }
      });
    }
  }).catch((error) => {
    console.log(error);
    res.status(200).send({code: 0, Msg: '修改出错',});
  });
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
          res.status(404).send({code: 1, Msg: '更新失败',});
        } else {
          console.log('密码更新成功');
          res.status(200).send({code: 0, Msg: '更新成功',});
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
          res.status(404).send({code: 1, Msg: '更新失败',});
        } else {
          console.log('密码更新成功');
          res.status(200).send({code: 0, Msg: '更新成功',});
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
          res.status(200).send({code: 1, Msg: '更新失败',});
        } else {
          console.log('手机号更新成功');
          res.status(200).send({code: 0, Msg: '更新成功',});
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
          res.status(404).send({code: 1, Msg: '更新失败',});
        } else {
          console.log('手机号更新成功');
          res.status(200).send({code: 0, Msg: '更新成功',});
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
          res.status(404).send({code: 0});
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
          res.status(404).send({code: 0});
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
  //console.log(reqQ);
  if (reqQ === 'T' || reqQ === 'EA' || reqQ === 'SA') {
    Question.find({}).then(function (result) {
      res.status(200).send(result);
    });
  }
});
//题库管理--更新题库
router.post('/updateTestBase', function (req, res) {
  let reqData = req.body.data;
  delete reqData.testBase.num;
  console.log(reqData);
  if (reqData.userType === 'EA' || reqData.userType === 'SA') {
    Question.findOneAndUpdate({
      _id: reqData.testBase._id
    }, {
      desc: reqData.testBase.desc,
      answer: reqData.testBase.answer,
      major: reqData.testBase.major,
      options: reqData.testBase.options,
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(200).send({code: 1, Msg: '更新失败',});
      } else {
        console.log('更新成功');
        res.status(200).send({code: 0, Msg: '更新成功',});
      }
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
            res.status(404).send({err: err,});
          } else {
            console.log('删除数据成功');
          }
        })
      }
      res.status(200).send({
        success: 0,
      });
    } else {
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
router.post('/addExcelTest', function (req, res) {

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
      }, function (err, jsonResult) {
        if (err) {
          console(err);
        } else {
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
            Question.find().sort({num: -1}).then(function (ques) {
              if (ques.length != 0) {
                numID = Number(ques[0].num);
              } else {
                numID = 1;
              }
            }).then(function () {
              for (let i = 0; i < jsonResult.length; i++) {
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
              for (let i = 0; i < result.length; i++) {
                if (result[i].desc !== '') {
                  let question = new Question({
                    num: result[i].num,
                    desc: result[i].desc,
                    options: result[i].options,
                    value: result[i].value,
                    name: result[i].name,
                    forId: result[i].forId,
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
              res.status(200).send({code: 0});
              console.log('question Save success all')
            })
          } else {
            res.status(404).send({code: 1});
            console.log('文件读取错误');
          }
        }
      });
    });
  });
});

//教师, 获取自定义课程
router.post('/getTeacherCustomCourse', function (req, res) {
  let reqData = req.body.data;
  if (req.session.users === undefined) {
    res.status(404).send({
      Msg: '未登录或是无权限',
      code: 1,
    });
  } else {
    let username = req.session.users.username;
    if (reqData.userType === 'SA' || reqData.userType === 'EA' || reqData.userType === 'T') {
      if (!fs.existsSync(uploadCoursePath + username)) {
        fs.mkdirSync(uploadCoursePath + username);
      }
      TechCosCou.find({
        userID: reqData.userID,
      }).then(function (techCosCou) {
        if (techCosCou.length !== 0) {
          let lab = techCosCou[0].tab;
          //console.log(techCosCou[0].tab);
          if (lab !== 0) {
            for (let i = 0; i < lab.length; i++) {
              let path = uploadCoursePath + username + '/' + lab[i].label;
              if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
              }
              //console.log(lab[i]);
              if (lab[i].children !== undefined) {
                if (lab[i].children.length >= 0) {
                  //console.log(lab[i].course);
                  for (let j = 0; j < lab[i].children.length; j++) {
                    let obj = lab[i].children[j].label;
                    //console.log(obj);
                    if (!fs.existsSync(path + '/' + lab[i].children[j].label)) {
                      fs.mkdirSync(path + '/' + lab[i].children[j].label);
                    }
                  }
                }
              }
            }
          }
          res.status(200).send({techCosCou: techCosCou,});
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
                userID: reqData.userID,
              }).then(function (techCosCou) {
                res.status(200).send({techCosCou: techCosCou,});
              });
            }
          });
        } else {
          res.status(404).send({Msg: '无法获取请求数据', code: 1,});
        }

      });
    } else if (reqData.userType === '') {
      res.status(404).send({
        Msg: '未登录或是无权限',
        code: 1,
      });
    }
  }

})

//教师, 添加自定义课程
router.post('/addCustomCourse', function (req, res) {
  //console.log(req.body.data.tab);
  if (req.body.data) {
    let reqData = req.body.data;
    let username = req.session.users.username;
    if (reqData.userType == 'SA' || reqData.userType == 'EA' || reqData.userType == 'T') {
      //console.log(reqData.tab);
      TechCosCou.findOneAndUpdate({
        userID: reqData.userID,
      }, {
        tab: reqData.tab,
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(404).send({Msg: '更新失败', code: 1,});
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
          res.status(200).send({Msg: '更新成功', code: 0,});
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
router.post('/uploadCourse', function (req, res) {
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
        if (arr[arr.length - 1] === 'pdf' || arr[arr.length - 1] === 'ppt') {
          console.log('pdf');
          //pdf/ppt的处理
          newPath = uploadCoursePath + username + '/' + fileName;
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              console.log('改名失败');
              res.status(404).send({Msg: '改名失败', code: 1,});
            }
            fs.stat(newPath, function (err, stats) {  //获取文件信息
              if (err) {
                return err;
              }
              res.status(200).send({Msg: '上传成功', code: 0,});
            });
          });
          //是微课 / 动画的处理
        } else {
          console.log('动画');
          newPath = uploadCoursePath + username + '/' + fileName;
          //console.log(newPath);
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              console.log('改名失败');
              res.status(404).send({Msg: '改名失败', code: 1,});
            }
            fs.stat(newPath, function (err, stats) {  //获取文件信息
              if (err) {
                return err;
              }
              res.status(200).send({Msg: '上传成功', code: 0,});
            });
          });
        }

      } else {
        res.status(404).send({Msg: '上传的文件名为空', code: 1,});
      }
    });
  } else {
    res.status(404).send({Msg: '用户无权限或未登录', code: 1,});
  }
});

//教师上传课件--成功后处理文件
router.post('/uploadCourseSec', function (req, res) {
  let reqData = req.body.data;
  let newFileName1 = reqData.newFileName1;
  let newFileName2 = reqData.newFileName2;
  let fileName = reqData.fileName;
  let fileType = reqData.fileType;
  let reqUserType = req.session.users.userType;
  let username = req.session.users.username;
  let sysType = os.type();
  let newPath = '';
  //console.log(fileType);
  if (reqUserType === 'T' || reqUserType === 'EA' || reqUserType === 'SA') {

    let arr = fileName.split(".");
    newPath = uploadCoursePath + username + '/';
    //console.log(newPath);
    if (!fs.existsSync(newPath + newFileName1)) {
      fs.mkdirSync(newPath + newFileName1);
    }
    if (!fs.existsSync(newPath + newFileName1 + '/' + newFileName2)) {
      fs.mkdirSync(newPath + newFileName1 + '/' + newFileName2);
    }
    let pdfPath = newPath + fileName;
    let coursePath = newPath + newFileName1 + '/' + newFileName2 + '/' + arr[0] + fileType;
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
        let pdf = require('pdf-poppler');
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
              for (let i = 0; i <= stats.length - 1; i++) {
                let arr1 = stats[i].split(".");
                if (arr1[arr1.length - 1] === 'png') {
                  let arr2 = arr1[0].split("-");
                  let name1 = Number(arr2[arr2.length - 1]);
                  let oldPath = path_dir + '/' + stats[i];
                  let newPath = path_dir + '/' + arr2[0] + '-' + name1 + '.' + arr1[arr1.length - 1];
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
              fs.unlink(pdfPath, function (err) {
                if (err) return console.log(err);
                console.log('文件删除成功');
              });
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
      res.status(200).send({code: 0, msg: msg});
      //console.log(msg)
    }).catch((error) => {
      console.log(error)
    });

  }
});

//教师上传微课--成功后移动文件到
router.post('/uploadMove', function (req, res) {
  let newFileName1 = req.body.data.newFileName1;
  let newFileName2 = req.body.data.newFileName2;
  let fileName = req.body.data.fileName;
  let reqUserType = req.session.users.userType;
  let username = req.session.users.username;
  let oldPath = uploadCoursePath + username + '/' + fileName;
  let newPath = uploadCoursePath + username + '/' + newFileName1 + '/' + newFileName2 + '/' + fileName;
  if (reqUserType === 'T' || reqUserType === 'EA' || reqUserType === 'SA') {
    fs.rename(oldPath, newPath, function (err) {
      if (!err)
        res.status(200).send({Msg: '课件处理成功', code: 0,});
      console.log("rename complete.");
    });
  }
});

//教师上传课件
router.post('/uploadCourse', function (req, res) {
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
        if (arr[arr.length - 1] === 'pdf' || arr[arr.length - 1] === 'ppt') {
          //pdf/ppt的处理
          newPath = uploadCoursePath + username + '/' + fileName;
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              console.log('改名失败');
              res.status(404).send({Msg: '改名失败', code: 1,});
            }
            fs.stat(newPath, function (err, stats) {  //获取文件信息
              if (err) {
                return err;
              }
              res.status(200).send({Msg: '上传成功', code: 0,});
            });
          });
          //是pdf的处理
        } else {
          newPath = uploadCoursePath + username + '/' + fileName;
          //console.log(newPath);
          fs.rename(oldPath, newPath, function (err) {
            if (err) {
              console.log('改名失败');
              res.status(404).send({Msg: '改名失败', code: 1,});
            }
            fs.stat(newPath, function (err, stats) {  //获取文件信息
              if (err) {
                return err;
              }
              res.status(200).send({Msg: '上传成功', code: 0,});
            });
          });
        }

      } else {
        res.status(404).send({Msg: '上传的文件名为空', code: 1,});
      }
    });
  } else {
    res.status(404).send({Msg: '用户无权限或未登录', code: 1,});
  }
});

//获取课程树
router.post('/getCenterTree', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  CenterTree.findOneAndUpdate({
    name: 'centerTree'
  }, {
    newTime: new Date(),
    children: bannerLeftData,
  }, function (err) {
    if (err) {
      console.log(err);
      res.status(404).send({
        Msg: '更新失败',
      });
    } else {
      console.log('更新centerTree成功');
      CenterTree.find({}).then(function (result) {
        res.status(200).send(result);
      });
    }
  });
});

//更新课程树
router.post('/updateCenterTree', function (req, res) {
  let reqUserType = req.session.users.userType;
  if (reqUserType === 'EA' || reqUserType === 'SA') {

  } else {
    res.status(404).send({
      Msg: '用户无权限或未登录',
      code: 1,
    });
  }
});

//上传头像
router.post('/uploadAvatar', function (req, res) {
  let form = new formidable.IncomingForm();
  form.uploadDir = "../public/resource/myAvatar";//设置头像上传存放地址
  form.maxFieldsSize = 2 * 1024 * 1024; //设置最大2M
  form.keepExtensions = true;
  let reqS = req.session.users;

  form.parse(req, function (err, fields, files) {
    let arr = files.file.path.split('\\');
    fs.writeFileSync("../../resource/myAvatar/" + arr[arr.length - 1], fs.readFileSync("../public/resource/myAvatar/" + arr[arr.length - 1], 'utf8'));
    //console.log(arr[arr.length-1]);
    if (reqS.userType === 'S' || reqS.userType === 'O') {
      Student.findOneAndUpdate({
        userID: reqS.userID
      }, {
        avatar: arr[arr.length - 1]
      }, function (err) {
        if (err) {
          res.status(404).send({Msg: '上传成功', code: 0,});
          console.log(err);
        } else {
          res.status(200).send({Msg: '上传成功', code: 0,});
        }
      })
    } else if (reqS.userType === 'T' || reqS.userType === 'EA' || reqS.userType === 'SA') {
      Teacher.findOneAndUpdate({
        userID: reqS.userID
      }, {
        avatar: arr[arr.length - 1]
      }, function (err) {
        if (err) {
          res.status(404).send({Msg: '上传成功', code: 0,});
          console.log(err);
        } else {
          res.status(200).send({Msg: '上传成功', code: 0,});
        }
      })
    }
  });
});

//获取班级和专业
router.post('/getClass', function (req, res) {
  // console.log('jdsfjawnejkfnaef');
  Student.find({}).then(function (student) {
    let classMsg = [];
    let majorMsg = [];
    let CC = [];
    let MM = [];
    if (student) {
      for (let i = 0; i < student.length; i++) {
        classMsg.push(student[i].classGrade);
        majorMsg.push(student[i].major);
      }
      classMsg = core.unique(classMsg);
      for (let i = 0; i < classMsg.length; i++) {
        CC.push({label: classMsg[i]});
      }
      majorMsg = core.unique(majorMsg);
      for (let i = 0; i < majorMsg.length; i++) {
        MM.push({label: majorMsg[i]});
      }
      res.status(200).send({
        classMsg: CC,
        majorMsg: MM
      });
    } else {
      res.status(404).send({code: 0});
    }
  });
});

//获取所有教师姓名
router.post('/getAllTeachName', function (req, res) {
  let userType = req.session.users.userType;
  if (userType === 'EA' || userType === 'SA') {

    Teacher.find({}).then(function (teacher) {
      let allTeachName = [];
      if (teacher.length !== 0) {
        for (let i = 0; i < teacher.length; i++) {
          allTeachName.push({label: teacher[i].user});
        }
        //console.log(allTeachName);
        res.status(200).send({code: 0, allTeachName: allTeachName});
      } else {
        res.status(404).send({code: 1, Msg: '没有教师'});
      }
    });

  }
});
//创建签到记录
function newTimeSheet(course1,weekDay) {
  //console.log(course1);
  //console.log(weekDay);
  let date1 = core.getDayAll(weekDay);
  let date2 = date1[course1.index];
  //console.log(date2);

  Student.find({          //找到班级所有学生
    classGrade: course1.className,
  }).then(function (student) {
    if (student.length !== 0) {
      let studentAll = [];
      for (let i = 0; i < student.length; i++) {
        studentAll.push({ stuName: student[i].user, state: 4 ,isUser: false,});
      }
      TimeSheet.findOne({
        courseDate: date2,
        startTime: course1.course.startTime,
      }).then(function (timeSheet) {
        //console.log(timeSheet);
        if (timeSheet === null) {
          let timeSheet = new TimeSheet(
            {
              courseName: course1.course.courseName,
              courseDate: date2,
              teacher: course1.course.teacher,
              className: course1.className,
              startTime: course1.course.startTime,
              endTime: course1.course.endTime,
              stateList: studentAll,
            }
          );
          timeSheet.save(function (err) {
            if (err) {
              console.log('创建签到表失败');
            } else {
              studentAll = [];
              console.log('创建签到表成功');
            }
          });
        } else {
          TimeSheet.updateOne({
            courseDate: date2,
            startTime: course1.course.startTime,
          }, {
            $set: {
              courseName: course1.course.courseName,
              teacher: course1.course.teacher,
              className: course1.className,
              endTime: course1.course.endTime,
              stateList: studentAll,
            }
          }, function (err) {
            if (err) {
              console.log(err);
              console.log('更新签到表失败');
            } else {
              console.log('更新签到表成功');
            }
          });
        }
      })
    }
  })
}
//修改-某天的课程表方法
function alterTable1(course1, weekAll) {
  //console.log(course1);
  if (course1.courseDate === 'newCourse') {
    if (course1.index === 0) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse.0": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 1) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse.1": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 2) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse.2": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 3) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse.3": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 4) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse.4": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 5) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse.5": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 6) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse.6": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 7) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse.7": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    }
  } else if (course1.courseDate === 'newCourse2') {
    if (course1.index === 0) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse2.0": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 1) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse2.1": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 2) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse2.2": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 3) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse2.3": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 4) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse2.4": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 5) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse2.5": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 6) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse2.6": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 7) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse2.7": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    }
  } else if (course1.courseDate === 'newCourse3') {
    if (course1.index === 0) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse3.0": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 1) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse3.1": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 2) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse3.2": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 3) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse3.3": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 4) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse3.4": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 5) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse3.5": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 6) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse3.6": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 7) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse3.7": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    }
  } else if (course1.courseDate === 'newCourse4') {
    if (course1.index === 0) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse4.0": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 1) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse4.1": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 2) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse4.2": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 3) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse4.3": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 4) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse4.4": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 5) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse4.5": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 6) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse4.6": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 7) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse4.7": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    }
  } else if (course1.courseDate === 'newCourse5') {
    if (course1.index === 0) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse5.0": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 1) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse5.1": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 2) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse5.2": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 3) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse5.3": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 4) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse5.4": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 5) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse5.5": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 6) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse5.6": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    } else if (course1.index === 7) {
      for (let i = 0; i < weekAll.length; i++) {
        CourseTable.findOneAndUpdate({
          courseDate: weekAll[i],
          className: course1.className,
        }, {
          createDate: moment().format("YYYY-MM-DD"),
          $set: {"course.0.newCourse5.7": course1.course},
        }, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('更新成功');
            if (course1.edit === false) {
              newTimeSheet(course1, weekAll[i])
            }
          }
        });
      }
    }
  }
}
//创建-课程表
router.post('/newCourseTable', function (req, res) {
    let reqData = req.body.data;
    //console.log(reqData);
    let weekAll = core.getWeekAll(reqData.date1, reqData.date2);
    let firstWeekAll = core.getDayAll(reqData.date1);
    let lastWeekAll = core.getDayAll(reqData.date2);
    let date1Time = (new Date(reqData.date1)).getTime();
    let date2Time = (new Date(reqData.date2)).getTime();
    if (reqData.edit === false) {
      if ((new Date(firstWeekAll[reqData.index])).getTime() < date1Time) {
        weekAll.shift();
      }
      if ((new Date(lastWeekAll[reqData.index])).getTime() > date2Time) {
        weekAll.pop()
      }
    }
    //console.log(weekAll);
    let reqSess = req.session.users;
    let userType = reqSess.userType;
    let username = reqSess.username;
    //let reqDate = moment(reqData.reqDate).format("YYYY-MM-DD");
    if (userType === 'EA' || userType === 'SA') {

      let p1 = new Promise((resolve, reject) => {
        for (let i = 0; i < weekAll.length; i++) {
          CourseTable.findOne({
            className: reqData.className,
            courseDate: weekAll[i]
          }).then(function (courseTable) {
            //console.log('11111');
            //console.log(courseTable);
            if (courseTable === null) {
              let courseTable = new CourseTable(
                {
                  className: reqData.className,
                  createDate: moment().format('YYYY-MM-DD'),
                  courseDate: weekAll[i],
                  createName: username,
                  teachList: ["张老师", "付老师"],
                  course: courseP,
                }
              );
              courseTable.save();
            }
          });
        }
        setTimeout(function () {
          resolve('成功了1')
        },500);
      });

      let p2 = new Promise((resolve, reject) => {
        if (reqData.edit === true) {
          if (reqData.course.startTime === '' || reqData.course.courseName === '') {   //删除
            TimeSheet.remove({
              courseDate: reqData.oldDate,
              startTime: reqData.oldStartTime,
            },function (err) {
              if (err) {
                console.log(err);
                res.status(200).send({code: 1, Msg: '删除签到表失败',});
              } else {
                resolve('成功了2')
              }
            })

          } else if (reqData.course.startTime !== '' || reqData.course.courseName !== '') {   //编辑
            TimeSheet.findOneAndUpdate({
              courseDate: reqData.oldDate,
              startTime: reqData.oldStartTime,
            }, {
              startTime: reqData.course.startTime,
              endTime: reqData.course.endTime,
              courseName: reqData.course.courseName,
              teacher: reqData.course.teacher,
            }, function (err) {
              if (err) {
                console.log(err);
                res.status(200).send({code: 1, Msg: '更新签到表失败',});
              } else {
                resolve('成功了2')
              }
            });
          }
        } else {
          resolve('成功了2')
        }
      });

      Promise.all([p1, p2]).then((result) => {
        //console.log(reqData);
        //console.log(weekAll);
        alterTable1(reqData,weekAll);
        res.status(200).send({code: 0, msg: '创建课程表成功'});
      }).catch((error) => {
        console.log(error)
      });
    }
  });
//获取-课程表
router.post('/getCourseTable', function (req, res) {
  let userType = req.session.users.userType;
  let username = req.session.users.username;
  let reqData = req.body.data;
  let monday = core.getMonday(reqData.courseDate);
  console.log(reqData);
  console.log(monday);
  //console.log(reqData.className);
  let p1 = new Promise((resolve, reject) => {
    if (userType === 'S' || userType === 'O') {
      Student.find({
        user: username,
      }).then(function (stu) {
        //console.log(stu[0]);
        if (stu === null) {
          console.log('找不到该课程表');
          res.status(200).send({code: 1, msg: '登录失效或未登录'});
        } else {
          //console.log(stu);
          reqData.className = stu[0].classGrade;
          resolve('成功了1')
        }
      });
    } else {
      resolve('成功了1')
    }
  });

  Promise.all([p1]).then((result) => {
    //console.log(reqData);
    //console.log(result);
    CourseTable.findOne({
      courseDate: monday,
      className: reqData.className
    }).then(function (courseTable) {
      //console.log(courseTable);
      if (courseTable === null) {
        console.log('找不到该课程表');
        res.status(200).send({code: 1, msg: '找不到该课程表'});
      } else {
        //console.log(courseTable);
        res.status(200).send({code: 0, result: courseTable});
      }
    });
  }).catch((error) => {
    console.log(error)
  });
});
//老师获取学生考勤
router.post('/getTimeSheet', function (req, res) {
  let reqData = req.body.data;
  let userType = req.session.users.userType;
  //console.log(reqData);
  if (userType === 'EA' || userType === 'T' || userType === 'SA') {
    if (reqData.startTime !== '') {
      TimeSheet.findOne({
        courseDate: reqData.courseDate,
        startTime: reqData.startTime,
      }).then(function (timeSheet) {
        console.log(timeSheet);
        if (timeSheet !== null) {
          let newDate = new Date().getTime();
          let ee = moment(timeSheet.courseDate + ',' + timeSheet.endTime).format("YYYY-MM-DD,HH:mm:ss");
          let couDate = new Date(ee).getTime();
          if (newDate > couDate) {
            for (let i = 0; i < timeSheet.stateList.length; i++) {
              if (timeSheet.stateList[i].state === 4) {
                timeSheet.stateList[i].state = 1;
              }
            }
            StuLeave.findOneAndUpdate({
              _id: timeSheet._id
            }, {
              stateList: timeSheet.stateList,
            }, function (err) {
              if (err) {
                console.log(err);
                res.status(200).send({code: 1, Msg: '签到更新失败',});
              } else {
                console.log('签到更新成功');
              }
            })
          }
          res.status(200).send({code: 0, result: timeSheet, Msg: '获取成功',});
        } else {
          res.status(200).send({code: 1, Msg: '未找到签到表',});
        }

      });
    } else {
      res.status(200).send({code: 1, Msg: '数据错误',});
    }
  }
});
//获取请假信息
router.post('/getLeaveMsg', function (req, res) {
  let reqData = req.body.data;
  //console.log(reqData);
  StuLeave.find({
  }).then(function (stuLeave) {
    console.log(stuLeave);
    if (stuLeave.length !== 0) {
      res.status(200).send({code: 0, result: stuLeave, Msg: '返回成功',});
    } else {
      res.status(200).send({code: 1, Msg: '查找失败',});
    }
  });
});
//批准请假
router.post('/alterLeaveState', function (req, res) {
  let reqData = req.body.data.leaveState;
  let userType = req.session.users.userType;

  //console.log(reqData);
  //console.log(req.body.data.state);
  if (userType === 'EA' || userType === 'SA') {
    StuLeave.findOneAndUpdate({
      _id: reqData._id
    }, {
      state: req.body.data.state,
    }, function (err) {
      if (err) {
        console.log(err);
        res.status(200).send({code: 1, Msg: '更新失败',});
      } else {
        console.log('更新成功');
        let allDay = core.getBegin_EndAll(reqData.startDate, reqData.endDate);
        for (let i = 0; i < allDay.length; i++) {
          TimeSheet.updateOne({
            courseDate: allDay[i],
            "stateList.stuName": reqData.stuName,
          }, {
            $set: { "stateList.$.state" : 3, "stateList.$.isUser" : true }
          }, function (err) {
            if (err) {
              console.log(err);
              res.status(200).send({code: 1, Msg: '请假失败',});
            } else {
              console.log('已请假');
            }
          });
        }
        res.status(200).send({code: 0, Msg: '更新成功',});
      }
    });
  }
});
//学生-请假
router.post('/newStuLeaveMsg', function (req, res) {
  let reqData = req.body.data.form;
  let username = req.session.users.username;
  //console.log(reqData);
  if (reqData._id === undefined) {
    let stuLeave = new StuLeave(
      {
        startDate: reqData.startDate,
        endDate: reqData.endDate,
        startTime: reqData.startTime,
        endTime: reqData.endTime,
        stuName: username,
        reason: reqData.reason,
        state: 1,
      }
    );
    stuLeave.save(function (err) {
      if (err) {
        res.status(200).send({code: 1, Msg: '申请失败',});
      } else {
        res.status(200).send({code: 0, Msg: '申请成功',});
      }
    });
  } else {
    StuLeave.updateOne({
      _id: reqData._id,
    },{
      startDate: reqData.startDate,
      endDate: reqData.endDate,
      startTime: reqData.startTime,
      endTime: reqData.endTime,
      reason: reqData.reason,
      state: 1,
    },function (err) {
      if (err) {
        console.log(err);
        res.status(200).send({code: 1, Msg: '修改失败',});
      } else {
        console.log('修改成功');
        res.status(200).send({code: 0, Msg: '修改成功',});
      }
    })
  }
});
//学生-获取请假信息
router.post('/getStuLeaveMsg', function (req, res) {
  let username = req.session.users.username;
  //console.log(reqData);
  StuLeave.find({
    stuName: username,
  }).then(function (stuLeave) {
    //console.log(stuLeave);
    if (stuLeave.length !== 0) {
      res.status(200).send({code: 0, result: stuLeave, Msg: '返回成功',});
    } else {
      res.status(200).send({code: 1, Msg: '查找失败',});
    }
  });
});
//学生-删除请假
router.post('/dellStuLeaveMsg', function (req, res) {
  let reqData = req.body.data.item;
  //console.log(reqData);s
  StuLeave.remove({
    _id: reqData._id,
  },function (err) {
    if (err) {
      console.log(err);
      res.status(200).send({code: 1, Msg: '删除失败',});
    } else {
      console.log('删除成功');
      res.status(200).send({code: 0, Msg: '删除成功',});
    }
  })
});
//获取当天课程信息
router.post('/getAllStuClass', function (req, res) {
  let username = req.session.users.username;
  let userType = req.session.users.userType;
  let dayAll = core.getDayAll(moment().format("YYYY-MM-DD"));
  let className1 = '';
  let course = {
    courseDate: '',
    teacher: '',
    courseName: '',
    startTime: "",
    endTime: "",
  };
  let studentAll = [];
  let result = {
    courseDate: '',
    teacher: '',
    courseName: '',
    startTime: "",
    endTime: "",
  };
  //console.log(dayAll);

  CourseTable.findOne({        //找到班级
    courseDate: dayAll[0],
  }).then(function (courseTable) {
    //console.log(courseTable);
    if (courseTable !== null) {
      className1 = courseTable.className;
      Student.find({          //找到班级所有学生
        classGrade: className1,
      }).then(function (student) {
        if (student.length !== 0) {
          for (let i = 0; i < student.length; i++) {
            studentAll.push({ stuName: student[i].user, state: 4 ,isUser: false,});
          }
          let date = moment().format("YYYY-MM-DD");
          let newDate = new Date(moment().format("YYYY-MM-DD,HH:mm")).getTime();
          let stuArr = [];
          let index = 0;
          for (let i = 0; i < dayAll.length; i++) {
            if (dayAll[i] === date) {
              index = i;
            }
          }
          stuArr.push(courseTable.course[0].newCourse[index]);
          stuArr.push(courseTable.course[0].newCourse2[index]);
          stuArr.push(courseTable.course[0].newCourse3[index]);
          stuArr.push(courseTable.course[0].newCourse4[index]);
          stuArr.push(courseTable.course[0].newCourse5[index]);
          let end0 = new Date(moment(date + ',' + stuArr[0].endTime).format("YYYY-MM-DD,HH:mm")).getTime();
          let end1 = new Date(moment(date + ',' + stuArr[1].endTime).format("YYYY-MM-DD,HH:mm")).getTime();
          let end2 = new Date(moment(date + ',' + stuArr[2].endTime).format("YYYY-MM-DD,HH:mm")).getTime();
          let end3 = new Date(moment(date + ',' + stuArr[3].endTime).format("YYYY-MM-DD,HH:mm")).getTime();
          let end4 = new Date(moment(date + ',' + stuArr[4].endTime).format("YYYY-MM-DD,HH:mm")).getTime();

          if (stuArr[0].endTime !=='' && newDate < end0) {
              course = stuArr[0];
          } else if (stuArr[1].endTime !=='' && newDate < end1) {
              course = stuArr[1];
          } else if (stuArr[2].endTime !=='' && newDate < end2) {
              course = stuArr[2];
          } else if (stuArr[3].endTime !=='' && newDate < end3) {
              course = stuArr[3];
          } else if (stuArr[4].endTime !=='' && newDate < end4) {
              course = stuArr[4];
          } else {
          }
          result.courseName = course.courseName;
          result.courseDate = date;
          result.teacher = course.teacher;
          result.startTime = course.startTime;
          result.endTime = course.endTime;

          TimeSheet.findOne({
            courseDate: date,
            startTime: course.startTime,
          }).then(function (timeSheet) {
            //console.log(timeSheet);
            if (timeSheet === null) {
              let timeSheet = new TimeSheet(
                {
                  courseName: course.courseName,
                  courseDate: date,
                  teacher: course.teacher,
                  className: className1,
                  startTime: course.startTime,
                  endTime: course.endTime,
                  stateList: studentAll,
                }
              );
              timeSheet.save(function (err) {
                if (err) {
                  console.log('创建签到表失败');
                  res.status(200).send({code: 1, Msg: '未找到该签到表3',});
                } else {
                  console.log('创建签到表成功');
                  //console.log(result);
                  res.status(200).send({code: 0, result: result, Msg: '获取成功',});
                }
              });
            } else {
              //console.log(result);
              res.status(200).send({code: 0, result: result, Msg: '获取成功',});
            }
          });
        } else {
          res.status(200).send({code: 1, Msg: '未找到该班级学生',});
        }
      });
    } else {
      res.status(200).send({code: 1, Msg: '未找到该课程表1',});
    }
  });
});
//学生-获取签到信息
router.post('/getSignInMsg', function (req, res) {
  let resData = req.body.data.stuCourse;
  //console.log(resData);
  let username = req.session.users.username;
  let userType = req.session.users.userType;
  if (userType === 'S' || userType === 'O') {
    TimeSheet.findOne({
      courseDate: resData.courseDate,
      startTime: resData.startTime,
    }).then(function (timeSheet) {
      let resSheet = timeSheet.stateList;
      for (let i = 0; i < resSheet.length; i++) {
        if (resSheet[i].stuName === username) {
          //console.log(resSheet[i]);
          res.status(200).send({code: 0, result: resSheet[i], Msg: '获取状态成功',});
        }
      }
      setTimeout(function () {
        //res.status(200).send({code: 1, Msg: '获取状态失败',});
      },100)
    })
  }
});
//学生签到
router.post('/stuSignIn', function (req, res) {
  let resData = req.body.data.stuCourse;
  //console.log(resData);
  let username = req.session.users.username;
  let userType = req.session.users.userType;
  if (userType === 'S' || userType === 'O') {
    let newDate = new Date().getTime();
    let startTime = new Date(moment(resData.courseDate + ',' + resData.startTime).format("YYYY-MM-DD,HH:mm")).getTime();
    if (newDate <= startTime) {
      TimeSheet.updateOne({
        courseDate: resData.courseDate,
        startTime: resData.startTime,
        "stateList.stuName": username,
      }, {
        $set: { "stateList.$.state" : 0, "stateList.$.isUser" : true }
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '签到失败',});
        } else {
          console.log('签到成功');
          res.status(200).send({code: 0, Msg: '签到成功',});
        }
      });
    } else if (newDate > startTime) {
      TimeSheet.updateOne({
        courseDate: resData.courseDate,
        startTime: resData.startTime,
        "stateList.stuName": username,
      }, {
        $set: { "stateList.$.state" : 2, "stateList.$.isUser" : true }
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '签到失败',});
        } else {
          console.log('签到成功');
          res.status(200).send({code: 0, Msg: '签到成功',});
        }
      });
    }
  }
});
//老师代签到
router.post('/teachSignIn', function (req, res) {
  let resData = req.body.data.stuCourse;
  console.log(resData);
  let userType = req.session.users.userType;
  if (userType === 'T' || userType === 'EA') {
    let newDate = new Date().getTime();
    let startTime = new Date(moment(resData.courseDate + ',' + resData.startTime).format("YYYY-MM-DD,HH:mm")).getTime();
      TimeSheet.findOne({
        courseDate: resData.courseDate,
        startTime: resData.startTime,
      }).then(function (timeSheet) {
        let sList = timeSheet.stateList;
        let sListState = '';
        //console.log(timeSheet.stateList);
        for (let i = 0; i < sList.length; i++) {
          //console.log(sList[i]);
          if (sList[i].stuName === resData.username) {
            if (sList[i].state === 0) {
              if (newDate <= startTime) {
                sListState = 4;
              } else if (newDate >= startTime) {
                sListState = 2;
              }
            } else if (sList[i].state === 2) {
                sListState = 4;
            } else if (sList[i].state === 4) {
              if (newDate <= startTime) {
                sListState = 0;
              } else if (newDate >= startTime) {
                sListState = 2;
              }
            }
          }
        }

        TimeSheet.updateOne({
          courseDate: resData.courseDate,
          startTime: resData.startTime,
          "stateList.stuName": resData.username,
        }, {
          $set: { "stateList.$.state" : sListState }
        }, function (err) {
          if (err) {
            console.log(err);
            res.status(200).send({code: 1, Msg: '签到失败',});
          } else {
            console.log('签到成功');
            res.status(200).send({code: 0, Msg: '签到成功',});
          }
        });
      });
    }
});
//新增精品课程
router.post('/addBestCourse', function (req, res) {
  // console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;

    // console.log(reqData)
    SetCourse.findOne({}).then(function (result) {
      let bestcourseContent = result.bestCourse
      for(var i = 0; i < bestcourseContent.length; i++){
        for(var j = 0; j < reqData.courseInfo.length; j++){
          if(bestcourseContent[i].label === reqData.courseInfo[j].label){
            let newArry =[]
            for(var k = 0; k < reqData.courseInfo.length; k++){
              if(k !== j){
                newArry.push(reqData.courseInfo[k])
              }
            }
            console.log(newArry)
            reqData.courseInfo = newArry
          }else if(bestcourseContent[i].label !== reqData.courseInfo.label){

          }
        }
      }
        let bestcourse = result.bestCourse
        for(var i = 0; i < reqData.courseInfo.length; i++){
          bestcourse.push(reqData.courseInfo[i])
        }
        //console.log(bestcourse)
        let bestCourseLength = result.bestCourse.length
        // console.log(result[0].bestCourse.length)
        if(bestCourseLength <= 5){
          if (reqData.userType == 'SA' || reqData.userType == 'EA') {
            /*let setCourse = new SetCourse(
              {
                bestcourse: bestcourse,
              }
            );
            setCourse.save(function (err) {
              if (err) {
                console.log('创建签到表失败');
                res.status(200).send({code: 1, Msg: '未找到该签到表3',});
              } else {
                console.log('创建签到表成功');
                //console.log(result);
                res.status(200).send({code: 0, result: result, Msg: '获取成功',});
              }
            });*/
            // console.log(bestcourse)
            SetCourse.findOneAndUpdate({
              _id:result._id
            }, {
              //$set: { "bestcourse" : newbestCourse }
              bestCourse : bestcourse
            }, function (err) {
              if (err) {
                console.log(err);
                res.status(200).send({code: 1, Msg: '添加失败',});
              } else {
                console.log('添加成功');
                res.status(200).send({code: 0, Msg: '添加成功',result:bestcourse});
              }
            });
          } else {
            res.status(404).send({
              Msg: '用户无添加权限',
              success: 1,
            });
          }
        }else if(bestCourseLength > 5){
          res.status(200).send({code: 2, msg: '精品课程已满'});
        }
    })
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});
//更新精品课程顺序
router.post('/updateBestCourse', function (req, res) {
  // console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    console.log(reqData)
    SetCourse.findOne({}).then(function (result) {
        if (reqData.userType == 'SA' || reqData.userType == 'EA') {
          SetCourse.findOneAndUpdate({
            _id:result._id
          }, {
            bestCourse : reqData.courseInfo
          }, function (err) {
            if (err) {
              console.log(err);
              res.status(200).send({code: 1, Msg: '更新失败',});
            } else {
              console.log('添加成功');
              res.status(200).send({code: 0, Msg: '更新成功',result:reqData.courseInfo});
            }
          });
        } else {
          res.status(404).send({
            Msg: '用户无添加权限',
            success: 1,
          });
        }
    })
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});
//获取精品课程
router.post('/getBestCourse', function (req, res){
  // let reqData = req.body.data;
  //console.log(reqData);
  SetCourse.find({
  }).then(function (restlt) {
    // console.log(stuLeave);
    if (restlt.length !== 0) {
      res.status(200).send({code: 0, result: restlt, Msg: '返回成功',});
    } else {
      let addCouData = new SetCourse({
        bestCourse: [],
        suggCourse: []
      });
      addCouData.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('course Save success');
        }
      });
    }
  });
});
//新增推荐课程
router.post('/addSuggCourse', function (req, res) {
  // console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    console.log(reqData)
    SetCourse.findOne({}).then(function (result) {
      let suggcourseContent = result.suggCourse
      for(var i = 0; i < suggcourseContent.length; i++){
        for(var j = 0; j < reqData.courseInfo.length; j++){
          if(suggcourseContent[i].label === reqData.courseInfo[j].label){
            let newArry =[]
            for(var k = 0; k < reqData.courseInfo.length; k++){
              if(k !== j){
                newArry.push(reqData.courseInfo[k])
              }
            }
            console.log(newArry)
            reqData.courseInfo = newArry
          }else if(suggcourseContent[i].label !== reqData.courseInfo.label){

          }
        }

      }
        let suggcourse = result.suggCourse
        for(var i = 0; i < reqData.courseInfo.length; i++){
          suggcourse.push(reqData.courseInfo[i])
        }
        //console.log(bestcourse)
        let suggCourseLength = result.suggCourse.length
        // console.log(result[0].bestCourse.length)
        if(suggCourseLength <= 24){
          if (reqData.userType == 'SA' || reqData.userType == 'EA') {
            SetCourse.findOneAndUpdate({
              _id:result._id
            }, {
              //$set: { "bestcourse" : newbestCourse }
              suggCourse : suggcourse
            }, function (err) {
              if (err) {
                console.log(err);
                res.status(200).send({code: 1, Msg: '添加失败',});
              } else {
                console.log('添加成功');
                res.status(200).send({code: 0, Msg: '添加成功',result:suggcourse});
              }
            });
          } else {
            res.status(404).send({
              Msg: '用户无添加权限',
              success: 1,
            });
          }
        }else{
          res.status(200).send({code: 2, msg: '推荐课程已满'});
        }
    })
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});
//更新推荐课程顺序
router.post('/updateSuggCourse', function (req, res) {
  // console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    console.log(reqData)
    SetCourse.findOne({}).then(function (result) {
        if (reqData.userType == 'SA' || reqData.userType == 'EA') {
          SetCourse.findOneAndUpdate({
            _id:result._id
          }, {
            suggCourse : reqData.courseInfo
          }, function (err) {
            if (err) {
              console.log(err);
              res.status(200).send({code: 1, Msg: '添加失败',});
            } else {
              console.log('添加成功');
              res.status(200).send({code: 0, Msg: '添加成功',result:reqData.courseInfo});
            }
          });
        } else {
          res.status(404).send({
            Msg: '用户无添加权限',
            success: 1,
          });
        }
    })
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});
//删除精品课程
router.post('/delBestCou', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    // let bestcourse =[]
    // bestcourse = reqData.courseInfo
    // console.log(bestcourse)
    if (reqData.userType === 'SA' || reqData.userType === 'EA') {
      console.log(reqData.courseInfo)
      SetCourse.findOneAndUpdate({

      }, {
        //$set: { "bestcourse" : newbestCourse }
        bestCourse : reqData.courseInfo
      }, function (err) {

        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '删除失败',});
        } else {
          console.log('添加成功');
          res.status(200).send({code: 0, Msg: '删除成功',});
        }
      });
    } else {
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
//删除推荐课程
router.post('/delSuggCou', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    // let bestcourse =[]
    // bestcourse = reqData.courseInfo
    // console.log(bestcourse)
    if (reqData.userType === 'SA' || reqData.userType === 'EA') {
      console.log(reqData.courseInfo)
      SetCourse.findOneAndUpdate({

      }, {
        //$set: { "bestcourse" : newbestCourse }
        suggCourse : reqData.courseInfo
      }, function (err) {

        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '删除失败',});
        } else {
          console.log('添加成功');
          res.status(200).send({code: 0, Msg: '删除成功',});
        }
      });
    } else {
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
//新增我的足迹
router.post('/addMyfoot', function (req, res) {
  let reqData = req.body.data;
  reqData.courseInfo.time = moment().format("YYYY-MM-DD HH:mm:ss");
  //console.log(reqData.courseInfo);
  let reqUserType = reqData.userType;
  let myFootArray = [];
    if (reqUserType === 'S' || reqUserType === 'O') {
      // console.log("1")
      Student.findOne({
        user: reqData.userName
      }).then(function (result) {
        // console.log("2")
        myFootArray = result.myFootprint;
        let myFootPrint = [];
        myFootPrint = result.myFootprint;
        let newArray = [];
        for(var i = 0; i < myFootArray.length; i++){
          if(myFootArray[i].label === reqData.courseInfo.label){
            let index = '';
            index = i;
            // console.log(index)
            for(var j = 0; j < myFootPrint.length; j++){
              if(j !== index){
                newArray.push(myFootPrint[j]);
                myFootArray = newArray
                // console.log(newArray)
                // console.log(myFootArray)
              }
            }
          }else{
            if(myFootArray.length >= 10){
              myFootArray.pop(myFootArray[9]);
              console.log(myFootArray)
            }
          }
        }

        myFootArray.unshift(reqData.courseInfo);
        // console.log("3")
        Student.findOneAndUpdate({
          user: reqData.userName
        }, {
          myFootprint: myFootArray
        }, function (err) {
          // console.log("4")
          if (err) {
            console.log(err);
            res.status(200).send({code: 1, Msg: '添加失败',});
          } else {
            //console.log('修改成功IDNo');
            res.status(200).send({code: 0, Msg: '添加成功',});
          }
        });
      })
    } else if (reqUserType === 'SA' || reqUserType === 'EA' || reqUserType === 'T') {
      //console.log(reqUser);
      Teacher.findOne({
        user: reqData.userName
      }).then(function (result) {
         //console.log("2");
        //console.log(result);
        myFootArray = result.myFootprint;
        let myFootPrint = [];
        myFootPrint = result.myFootprint;
        let newArray = [];
        for(var i = 0; i < myFootArray.length; i++){
          if(myFootArray[i].label === reqData.courseInfo.label){
            let index = '';
            index = i;
            // console.log(index)
            for(var j = 0; j < myFootPrint.length; j++){
              if(j !== index){
                newArray.push(myFootPrint[j]);
                myFootArray = newArray
                // console.log(newArray)
                // console.log(myFootArray)
              }
            }
          }else{
            if(myFootArray.length >= 10){
              myFootArray.pop(myFootArray[9]);
              console.log(myFootArray)
            }
          }
        }

        myFootArray.unshift(reqData.courseInfo);
        // console.log("3")
        Teacher.findOneAndUpdate({
          user: reqData.userName
        }, {
          myFootprint: myFootArray
        }, function (err) {
          // console.log("4")
          if (err) {
            console.log(err);
            res.status(200).send({code: 1, Msg: '添加失败',});
          } else {
            //console.log('修改成功IDNo');
            res.status(200).send({code: 0, Msg: '添加成功',});
          }
        });
      })
    }
});
//获取我的足迹
router.post('/getMyfoot', function (req, res) {
  let reqData = req.body.data;
  //console.log(reqData)
  let reqUserType = reqData.userType;
  let myFootArray = [];
  if (reqUserType === 'S' || reqUserType === 'O') {
    Student.findOne({
      user: reqData.userName
    }).then(function (result) {
      myFootArray = result.myFootprint;
      if (myFootArray) {
        res.status(200).send({code: 0, result: myFootArray, Msg: '返回成功',});
      } else {
        res.status(200).send({code: 1, Msg: '返回失败',});
      }
    })

  } else if (reqUserType === 'EA' || reqUserType === 'T' || reqUserType === 'SA') {
    //console.log(reqUser);
    Teacher.findOne({
      user: reqData.userName
    }).then(function (result) {
      myFootArray = result.myFootprint;
      //console.log(myFootArray);
      if (myFootArray) {
        res.status(200).send({code: 0, result: myFootArray, Msg: '返回成功',});
      } else {
        res.status(200).send({code: 1, Msg: '返回失败',});
      }
    })
  }
});
//删除我的足迹
router.post('/delMyfoot', function (req, res) {
  //console.log(req.body.data);
  if (req.body.data) {
    let reqData = req.body.data;
    // let bestcourse =[]
    // bestcourse = reqData.courseInfo
    // console.log(bestcourse)
    if (reqData.userType === 'SA' || reqData.userType === 'EA'|| reqData.userType === 'T') {
      //console.log(reqData.courseInfo);
      Teacher.findOneAndUpdate({
        user: reqData.userName
      }, {
        //$set: { "bestcourse" : newbestCourse }
        myFootprint : reqData.courseInfo
      }, function (err) {

        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '删除失败',});
        } else {
          console.log('添加成功');
          res.status(200).send({code: 0, Msg: '删除成功',});
        }
      });
    } else if (reqData.userType === 'S' || reqData.userType === 'O') {
      //console.log(reqData.courseInfo);
      Student.findOneAndUpdate({
        user: reqData.userName
      }, {
        //$set: { "bestcourse" : newbestCourse }
        myFootprint : reqData.courseInfo
      }, function (err) {

        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '删除失败',});
        } else {
          console.log('添加成功');
          res.status(200).send({code: 0, Msg: '删除成功',});
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
//为热门课程给每个课程计数
router.post('/countHot', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    let clickNew = '';
    // console.log(reqData)
    SetCourse.findOne({}).then(function (result) {
      // console.log(result.countForHot)
      let countForHot = result.countForHot;
      let newArray = [];
      for(var i = 0; i < countForHot.length; i++){
      if(countForHot[i].label === reqData.courseInfo.label){
        clickNew = countForHot[i].clickNum;
        let index = '';
        index = i;
        // console.log(index)
        for(var j = 0; j < countForHot.length; j++){
          if(j !== index){
            newArray.push(countForHot[j])

            // console.log(newArray)
            // console.log(myFootArray)
          }

        }
        countForHot = newArray;
        console.log()
      }else{
        if(countForHot.length >= 6){
          countForHot.pop(countForHot[5])
          // console.log(countForHot)
        }
      }
    }
      // console.log(countForHot)
      reqData.courseInfo.clickNum += clickNew + 1;
      //console.log(reqData.courseInfo.clickNum);
      countForHot.unshift(reqData.courseInfo);
      for(var i = 0; i < countForHot.length; i++){
        for(var j = i + 1; j < countForHot.length; j++){
          if(countForHot[i].clickNum < countForHot[j].clickNum){
            let bottom = '';
            bottom = countForHot[i]
            countForHot[i] = countForHot[j]
            countForHot[j] = bottom
          }else{

          }
        }
      }

      SetCourse.findOneAndUpdate({
        _id:result._id
      }, {
        //$set: { "bestcourse" : newbestCourse }
        countForHot : countForHot
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '添加失败',});
        } else {
          console.log('添加成功');
          res.status(200).send({code: 0, Msg: '添加成功',result:countForHot});
        }
      });
    })
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});
//学霸排行相关
router.post('/studentHot', function (req, res) {
  if (req.body.data) {
    let reqData = req.body.data;
    let clickNew = '';
    let stuhot = [];
    let studentHotArray = []
    // console.log(reqData)
    // SetCourse.findOne({}).then(function (result) {
    //   stuhot = result.studentHot;
    // });

    Student.findOne({
      user: reqData.name
    }).then(function (result) {
      //console.log('11');
      if (result !== null) {
        clickNew = result.clickNum + 1;
      }
      // if(stuhot.length === 0){
      //   stuhot.push(result)
      // }else if(stuhot.length > 0){
      //   for(var i = 0; i < stuhot.length; i++){
      //     // console.log(stuhot[i])
      //     if(reqData.name === stuhot[i].user){
      //       clickNew = result.clickNum + 1;
      //       break
      //     }else{
      //       clickNew = result.clickNum + 1;
      //       stuhot.push(result)
      //       break
      //     }
      //   }
      //   console.log("vvv")
      // }
      // for(var k = 0; k < stuhot.length; k++){
      //   for(var j = k + 1; j < stuhot.length; j++){
      //     if(stuhot[k].clickNum < stuhot[j].clickNum){
      //       let bottom = '';
      //       bottom = stuhot[k]
      //       stuhot[k] = stuhot[j]
      //       stuhot[j] = bottom
      //     }else{
      //
      //     }
      //   }
      // }
      // if(stuhot.length >= 8){
      //   stuhot.pop(stuhot[7])
      //   console.log("aaa")
      // }

      Student.findOneAndUpdate({
        user: reqData.name
      }, {
        //$set: { "bestcourse" : newbestCourse }
        clickNum : clickNew
      }, function (err) {
        if (err) {
          console.log(err);
          res.status(200).send({code: 1, Msg: '失败',});
        } else {
          // console.log(stuhot)
          Student.find({}).then(function (stu) {
            stuhot = stu
            if (stuhot.length !== 0) {
              for(var k = 0; k < stuhot.length; k++){
                for(var j = k + 1; j < stuhot.length; j++){
                  if(stuhot[k].clickNum < stuhot[j].clickNum){
                    let bottom = '';
                    bottom = stuhot[k]
                    stuhot[k] = stuhot[j]
                    stuhot[j] = bottom
                  }else{

                  }
                }
              }
              for(var h = 0; h < 8; h++){
                if(stuhot[h].clickNum !== 0){
                  studentHotArray.push(stuhot[h])
                }
              }
              SetCourse.findOneAndUpdate({}, {
                //$set: { "bestcourse" : newbestCourse }
                studentHot : studentHotArray
              }, function (err) {
                if (err) {
                  console.log(err);
                  res.status(200).send({code: 1, Msg: '失败',});
                } else {
                  console.log('成功');
                  res.status(200).send({code: 0, Msg: '成功',result:studentHotArray});
                }
              });
            } else {
              res.status(404).send({code: 1, Msg: '没有学生'});
            }
          });
        }
      });

    })
  } else {
    res.status(404).send({
      Msg: '无法获取请求数据',
      success: 1,
    });
  }
});
module.exports = router;
