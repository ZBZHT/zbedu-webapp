var crypto = require('crypto')
//var config = require('../config.js')
//加密
exports.encrypt = function (str) {
	var cipher = crypto.createCipher('aes192', 'zk');
	var enc = cipher.update(str, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
}
//解密
exports.decrypt = function (str) {
	var decipher = crypto.createDecipher('aes192', 'zk');
	var dec = decipher.update(str, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
}
//判断是否含有特殊字符
exports.containSpecial = function( s ) {      
  var contain = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);      
  return ( contain.test(s) );      
} 