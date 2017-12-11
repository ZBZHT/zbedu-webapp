/**
 * Created by BWY on 2017/12/11.
 */
const path = require('path');
const config = {
  '/api/menu/header': {
    method: 'get',
    data: './test.json'
  },
  '/api/menu/header2': {
    method: 'get',
    data: './test2.json'
  }
};

for(let item in config) {
  if(config.hasOwnProperty(item)) {
    config[item].path = path.resolve(__dirname,config[item].data);
    config[item].target = 'http://localhost:3000';
  }
}

module.exports = config;
