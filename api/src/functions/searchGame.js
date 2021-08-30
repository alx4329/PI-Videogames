const fetch = require('node-fetch')
const { API_KEY} = process.env
const { Videogame, Genre, Platform } = require('../db');


searchGame= async function(number,game){
    let resultsAmount = number; 
    let fetchesAmount = Math.ceil(resultsAmount/40);
    
    let fetches= [];

    for(i=0; i<fetchesAmount; i++){
        fetches.push('request' + i)
    }
    let answers=[];
    let requests = fetches.map( (request,index)=>{            
        return fetch(`https://api.rawg.io/api/games?search=${game}&key=${API_KEY}&page=${index+1}&page_size=40`)
            .then((response)=>response.json())
            .then((val)=> {
                return answers.push(val)                    
                
            })
    })
    
    await Promise.all(requests)
    // console.log(answers.length)
    let valuesToSend =[];
    let values = answers.map((item)=>{
        for(let i=0; i< item.results.length ; i++){
            let obj = {
                id: item.results[i].id,
                name: item.results[i].name,
                img: item.results[i].background_image,
                genres: item.results[i].genres,
                rating: item.results[i].rating,
            }                
            valuesToSend.push(obj)
        }
    })
    let dbGames = await Videogame.findAll({
        where: {
            name: game
        },
        include:{model: Genre, attributes:{exclude:["createdAt","updatedAt"]}, through: {attributes: []} }
    });
    let AllValuesToSend = valuesToSend.concat(dbGames)
    return AllValuesToSend
}


module.exports = searchGame