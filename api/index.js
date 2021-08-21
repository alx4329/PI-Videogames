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

app.engine('html', nunjucks.render)

 async function loadGenres(){
  let i=1;
  let genres = [];
  do {
    let request = await fetch(`https://api.rawg.io/api/genres?page=${i}&key=${API_KEY}`); 
    var genresJson = await request.json();
    // console.log(genresJson )
    let array = await genresJson.results;
    let middleArray = array.map((item)=>{
      obj = {
        id : item.id,
        name : item.name,
        img  : item.image_background
      }; 
      genres.push(obj)
    })
    i++
  }
  while (genresJson.next);
  // console.log('estamos afuera')
  // console.log(genres)

  let newGenres = genres.map((gen)=> Genre.create({
    id: gen.id,
    name: gen.name,
    image: gen.img
  }))

  Promise.all(newGenres)
    .then(console.log('genres loaded!'))
}

async function loadPlatforms(){
  let i=1;
  let platforms = [];
  do {
    let request = await fetch(`https://api.rawg.io/api/platforms?page=${i}&key=${API_KEY}`); 
    var platformsJson = await request.json();
    // console.log(genresJson )
    let array = await platformsJson.results;
    let middleArray = array.map((item)=>{
      obj = {
        id : item.id,
        name : item.name,
        
      }; 
      platforms.push(obj)
    })
    i++
  }
  while (platformsJson.next);
  // console.log('estamos afuera')
  console.log(platforms)

  let newPlatforms = platforms.map((pla)=> Platform.create({
    id: pla.id,
    name: pla.name,
    
  }))

  Promise.all(newPlatforms)
    .then(console.log('platforms loaded!'))
}



// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  loadGenres();
  loadPlatforms();
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
