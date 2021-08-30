const fetch = require("node-fetch");
const { API_KEY} = process.env;
const { conn } = require('../../src/db.js')
const {Platform} = require('../../src/db')

    async function loadPlatforms(){
        let i=1;
        let platforms = [];
        do {
        let request = await fetch(`https://api.rawg.io/api/platforms?page=${i}&key=${API_KEY}`); 
        var platformsJson = await request.json();
        //  console.log(platformsJson.results.length )
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
        // console.log(platforms)
    
        let newPlatforms = platforms.map((pla)=> Platform.create({
        
        name: pla.name,    
        }))
    
        
    
        return Promise.all(newPlatforms)
        .then(console.log('platforms loaded!'))
    }

module.exports = loadPlatforms