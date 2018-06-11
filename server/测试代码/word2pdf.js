/**
 * Created by Administrator on 2018/5/30.
 */
const word2pdf = require('word2pdf');
const fs = require('fs');

const convert = async () => {
  const data = await word2pdf('C:/11.docx');
  fs.writeFileSync('C:/11.pdf', data);
};

convert();

