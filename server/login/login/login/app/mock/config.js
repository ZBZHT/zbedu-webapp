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
  '/api/menu/101': {
    method: 'get',
    data: './testQuestion101.json'
  },
  '/api/menu/102': {
    method: 'get',
    data: './testQuestion102.json'
  },
  '/api/menu/103': {
    method: 'get',
    data: './testQuestion103.json'
  },
  '/api/menu/104': {
    method: 'get',
    data: './testQuestion104.json'
  },
  '/api/menu/105': {
    method: 'get',
    data: './testQuestion105.json'
  },
  '/api/menu/106': {
    method: 'get',
    data: './testQuestion106.json'
  },
  '/api/menu/107': {
    method: 'get',
    data: './testQuestion107.json'
  },
  '/api/menu/login': {
    method: 'login',
    data: './login.json'
  },
  '/api/menu/logOut': {
    method: 'logOut',
    data: './logOut.json'
  }
};

for(let item in config) {
  if(config.hasOwnProperty(item)) {
    config[item].path = path.resolve(__dirname,config[item].data);
    config[item].target = 'http://localhost:3000';
  }
}

module.exports = config;
