/*let str ="2016-08-9T10:01:54.123Z";
let format = new Date("yyyy-MM-dd'T'HH:mm:ss.SSS Z");
let d = str.replace("Z", " UTC");//注意是空格+UTC
let e = d.replace("T", " ");
console.log(e);*/
let format =new Date("2018-03-20T06:06:17.726Z");
console.log(formatDate('yyyy-MM-dd', format));
function formatDate(text, date) {
  console.log(date);
  var reg = /yyyy|yy|M+|d+|h+|m+|s+|q+|S|w/g;
  text = text.replace(reg, function (pattern) {
    var result;
    switch (pattern) {
      case "yyyy":
        result = date.getFullYear();
        break;
      case "yy":
        result = date.getFullYear().toString().substring(2);
        break;
      case "M":
      case "MM":
        result = date.getMonth() + 1;
        break;
      case "dd":
      case "d":
        result = date.getDate();
        break;
      case "hh":
      case "h":
        result = date.getHours();
        break;
      case "mm":
      case "m":
        result = date.getMinutes();
        break;
      case "ss":
      case "s":
        result = date.getSeconds();
        break;
      case "q":
        result = Math.floor((date.getMonth() + 3) / 3);
        break;
      case "S":
        result = date.getMilliseconds();
        break;
      case "w":
        result = "日一二三四五六".charAt(date.getDay());
        break;
      default:
        result = "";
        break;
    }
    if (pattern.length == 2 && result.toString().length == 1) {
      result = "0" + result;
    }
    return result;
  });
  return text;
}
