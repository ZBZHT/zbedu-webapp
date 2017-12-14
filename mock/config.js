/**
 * Created by BWY on 2017/12/11.
 */
const path = require('path');
const config = {
  '/api/menu/header': {
    method: 'get',
    data: './test.json'
  },
  '/menu/header/nav': {
    method: 'get',
    data: './HeaderData.json'
  },
  '/api/menu/index': {
    method: 'get',
    data: './index.json'
  },
  '/api/menu/testQuestion': {
    method: 'get',
    data: './testQuestion.json'
  }
};

for(let item in config) {
  if(config.hasOwnProperty(item)) {
    config[item].path = path.resolve(__dirname,config[item].data);
    config[item].target = 'http://localhost:3000';
  }
}

module.exports = config;
