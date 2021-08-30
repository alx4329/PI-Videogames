//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const {Genre, Platform} = require('./src/db')
const { conn } = require('./src/db.js');
const express = require('express'); 
const app = express();
const fetch = require("node-fetch");
const { API_KEY} = process.env;
const nunjucks = require('nunjucks');
const loadGenres = require('./src/functions/loadGenres')
const loadPlatforms = require('./src/functions/loadPlatforms')

app.engine('html', nunjucks.render)
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  loadGenres();
  loadPlatforms();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});


