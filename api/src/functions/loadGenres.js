const fetch = require("node-fetch");
const { API_KEY} = process.env;
const { conn } = require('../../src/db.js')
const {Genre} = require('../../src/db')
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
        
        name: gen.name,
        image: gen.img
        }))
    
        return Promise.all(newGenres)
        .then(console.log('genres loaded!'))
    }

    module.exports = loadGenres

