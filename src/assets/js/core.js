/**********************
 * core.js
 * 公共函数
 *********************/
const fs = require('fs')
const _ = require('lodash')
const os = require('os')
const moment = require('moment')

module.exports = {

  /**
   * 格式化时间文本
   * @param {Date} text 要格式化的文本
   * @param {String} date 时间对象
   * @returns {String}
   * @example
   * $Date.format("现在是yyyy年MM月dd日 hh点mm分ss秒，星期w",new Date());
   * y 表示年份
   * M 大写M表示月份
   * d 表示几号
   * h 表示小时
   * m 表示分
   * s 表示秒
   * w 表示星期几
   **/
  formatDate: function (text, date) {
    var reg = /yyyy|yy|M+|d+|h+|m+|s+|q+|S|w/g
    text = text.replace(reg, function (pattern) {
      var result
      switch (pattern) {
        case 'yyyy':
          result = date.getFullYear()
          break
        case 'yy':
          result = date.getFullYear().toString().substring(2)
          break
        case 'M':
        case 'MM':
          result = date.getMonth() + 1
          break
        case 'dd':
        case 'd':
          result = date.getDate()
          break
        case 'hh':
        case 'h':
          result = date.getHours()
          break
        case 'mm':
        case 'm':
          result = date.getMinutes()
          break
        case 'ss':
        case 's':
          result = date.getSeconds()
          break
        case 'q':
          result = Math.floor((date.getMonth() + 3) / 3)
          break
        case 'S':
          result = date.getMilliseconds()
          break
        case 'w':
          result = '日一二三四五六'.charAt(date.getDay())
          break
        default:
          result = ''
          break
      }
      if (pattern.length === 2 && result.toString().length === 1) {
        result = '0' + result
      }
      return result
    })
    return text
  },
  /**
   * 得到服务器信息
   */
  getServerInfo: function () {
    let ipv4 = []
    let mac = []
    var networkInterfaces = os.networkInterfaces()
    for (var key in networkInterfaces) {
      if (networkInterfaces.hasOwnProperty(key)) {
        var interfaces = networkInterfaces[key]
        for (var i = 0; i < interfaces.length; i++) {
          if (interfaces[i].family === 'IPv4' && !interfaces[i].internal) {
            ipv4.push(interfaces[i].address)
            mac.push(interfaces[i].mac)
          }
        }
      }
    }

    return {
      host: os.hostname(),
      ipv4: ipv4,
      mac: mac
    }
  },
  /**
   * 获取服务器时间
   */
  getServerTime: function () {
    return this.formatDate('[yyyy.MM.dd hh:mm:ss]', new Date())
  },

  /**
   * 获取访问者的信息
   * @params req 请求
   * @params data 数据对象
   */
  getReqInfo: function (req, data) {
    var info = {
      ___reqTime: new Date(),
      ___reqAddr: req ? req.connection.remoteAddress : ''
    }

    if (!arguments[0]) { // 如果没传第一个参数req
      var schemaBase = {}
      schemaBase['___reqTime'] = Date
      schemaBase['___reqAddr'] = String
      return schemaBase
    }

    if (!arguments[1]) { // 如果没传第二个参数data
      return _.assign(req.body, info)
    } else {
      return _.assign(data, info)
    }
  },
  /**
   * 检查文件夹是否存在
   * @params folderDir 文件夹路径
   * @params ifCreate 如果不存在是否自动创建
   */
  folderExist: function (folderDir, ifCreate) {
    fs.stat(folderDir, function (err, stats) {
      if (!err) {
        return true
      }
      if (err.errno === -2) {    // 文件不存在
        if (ifCreate) {
          fs.mkdir(folderDir)
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    })
  },
  /**
   * 删除数组中指定元素
   * arr指定要删除的数组
   * index指定要删除的数组下标
   */
  remove: function (arr, index) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== index) {
        result.push(arr[i])
      }
    }
    return result
  },
  /**
   * userType(user)
   * 返会用户类型的汉字
   */
  userType: function (user) {
    let userT = ''
    if (user === 'S' || user === 'O') {
      userT = '学生'
      return userT
    } else if (user === 'T') {
      userT = '教师'
      return userT
    } else if (user === 'EA') {
      userT = '教务管理员'
      return userT
    } else if (user === 'SA') {
      userT = '管理员'
      return userT
    }
  },
  /**
   * 从一个给定的数组arr中,随机返回num个不重复项
   */
  getArrayItems: function (arr, num) {
    // 新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var tempArray = []
    for (var index in arr) {
      tempArray.push(arr[index])
    }
    // 取出的数值项,保存在此数组
    var returnArray = []
    for (var i = 0; i < num; i++) {
      // 判断如果数组还有可以取出的元素,以防下标越界
      if (tempArray.length > 0) {
        // 在数组中产生一个随机索引
        var arrIndex = Math.floor(Math.random() * tempArray.length)
        // 将此随机索引的对应的数组元素值复制出来
        returnArray[i] = tempArray[arrIndex]
        // 然后删掉此索引的数组元素,这时候temp_array变为新的数组
        tempArray.splice(arrIndex, 1)
      } else {
        // 数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
        break
      }
    }
    return returnArray
  },
  /**
   * currTestType(Type)
   * 返会考试题类型的汉字
   */
  getCurrTestType: function (Type) {
    let currTestType = ''
    if (Type === '101') {
      currTestType = '期末考试'
      return currTestType
    } else if (Type === '102') {
      currTestType = '期中考试'
      return currTestType
    } else if (Type === '103') {
      currTestType = '随堂练习'
      return currTestType
    } else if (Type === '104') {
      currTestType = '单元测试'
      return currTestType
    } else if (Type === '105') {
      currTestType = '资格考试'
      return currTestType
    } else if (Type === '106') {
      currTestType = '在线练习'
      return currTestType
    }
  },
  /**
   * currTestType(Type)
   * 返会考试题类型的汉字
   */
  getGender: function (Type) {
    let gender
    if (Type === 1) {
      gender = '男'
      return gender
    } else if (Type === 2) {
      gender = '女'
      return gender
    }
  },
  /**
   * 传入一个arr, 输出去除重复后的数组
   * 数组去重
   */
  unique: function (arr) {
    for (var i = 0, hash = []; i < arr.length; i++) {
      if (hash[arr[i]] === undefined) {
        hash[arr[i]] = 1
      }
    }
    var j = 0
    var keys = []
    for (keys[j++] in hash);
    return keys
  },
  /**
   * 传入一个日期, 如：2018-6-27
   * 返回该日期所在周的周一日期
   */
  getMonday: function (data) {
    let now = new Date(data)
    let nowTime = now.getTime()
    let day = now.getDay()
    let oneDayLong = 24 * 60 * 60 * 1000
    let MondayTime = nowTime - (day - 1) * oneDayLong
    let monday = moment(new Date(MondayTime)).format('YYYY-MM-DD')
    return monday
  },
  /**
   * 传入开始时间和结束时间, 如：“2018-6-27”，“2018-7-27”
   * 返回该日期时间段所有周一日期列表数组
   */
  getWeekAll: function (begin, end) {
    let dateAllArr = []
    begin = this.getMonday(begin)
    let ab = begin.split('-')
    let ae = end.split('-')
    let db = new Date()
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
    let de = new Date()
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2])
    let unixDb = db.getTime()
    let unixDe = de.getTime()
    for (let k = unixDb; k <= unixDe;) {
      dateAllArr.push(moment(new Date(parseInt(k))).format('YYYY-MM-DD'))
      k = k + 7 * 24 * 60 * 60 * 1000
    }
    return dateAllArr
  },
  /**
   * 传入某一时间, 如：“2018-6-27”
   * 返回该日期前两天如：“2018-6-25”
   */
  getYestoday: function (date) {
    let aa = moment(this.getMonday(date)).format('YYYY-MM-DD')
    let ab = aa.split('-')
    let db = new Date()
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
    let unixDb = db.getTime()
    let unixDe = unixDb - 7 * 24 * 60 * 60 * 1000
    let dateAllArr = moment(new Date(parseInt(unixDe))).format('YYYY-MM-DD')
    return dateAllArr
  },
  /**
   * 传入某一时间, 如：“2018-6-27”
   * 返回该日期下周一
   */
  getTomorrow: function (date) {
    let aa = moment(this.getMonday(date)).format('YYYY-MM-DD')
    let ab = aa.split('-')
    let db = new Date()
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
    let unixDb = db.getTime()
    let unixDe = unixDb + 7 * 24 * 60 * 60 * 1000
    let dateAllArr = moment(new Date(parseInt(unixDe))).format('YYYY-MM-DD')
    return dateAllArr
  },
  /**
   * 传入一个日期, 如：“2018-06-27”
   * 返回该日期所在周的所有日期的列表数组
   */
  getDayAll: function (date) {
    let dateAllArr = []
    let aa = moment(this.getMonday(date)).format('YYYY-MM-DD')
    let ab = aa.split('-')
    let db = new Date()
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
    let unixDb = db.getTime()
    let unixDe = unixDb + 6 * 24 * 60 * 60 * 1000
    for (let k = unixDb; k <= unixDe;) {
      dateAllArr.push(moment(new Date(parseInt(k))).format('YYYY-MM-DD'))
      k = k + 24 * 60 * 60 * 1000
    }
    return dateAllArr
  },
  /**
   * 传入开始日期和结束日期, 如：“2018-06-27” “2018-07-20”
   * 返回时间段内所有日期的列表数组
   */
  getBegin_EndAll: function (begin, end) {
    let ee = []
    var ab = begin.split('-')
    var ae = end.split('-')
    var db = new Date()
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
    var de = new Date()
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2])
    var unixDb = db.getTime()
    var unixDe = de.getTime()
    for (var k = unixDb; k <= unixDe;) {
      ee.push(moment(new Date(parseInt(k))).format('YYYY-MM-DD'))
      k = k + 24 * 60 * 60 * 1000
    }
    return ee
  }
}
