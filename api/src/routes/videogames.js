const { Router } = require('express');
const { conn } = require('../db.js');
const { Videogame, Genre, Platform } = require('../db');
const router = require('express').Router();
const fetch = require("node-fetch");
const db = require('../db.js');
const { API_KEY} = process.env

// The RAWG API returns 40 games per page maximum. 
//As we want to do the pagination in our API, we do all the requests at the beginning. So we define the function 'getSomeGames' which receives a number of the minimal amount of games we will need in our API. Then it calls the RAWG API the necessary times to get at least that number, and returns an array of games.
const gamesToPaginate = 40

const getSomeGames = async function(number, ){
    let resultsAmount = number; 
    let fetchesAmount = Math.ceil(resultsAmount/40);
    
    let fetches= [];

    for(i=0; i<fetchesAmount; i++){
        fetches.push('request' + i)
    }
    
    let answers=[];
    let requests = fetches.map( (request,index)=>{            
        return fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${index+1}&page_size=40`)
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
                genres: item.results[i].genres
            }                
            valuesToSend.push(obj)
        }
    })
    let dbGames = await Videogame.findAll({
        include:Genre
    });
    let AllValuesToSend = valuesToSend.concat(dbGames)
    return AllValuesToSend
}




router.get('/videogames',async function(req,res){
    try {
        let game = req.query.game
        if(game){
            pedido =await fetch(`https://api.rawg.io/api/games?search=${game}&key=${API_KEY}`)
            let answer = await pedido.json();
            if(answer.length>0){
                res.send(answer)
            } else {
                let dbGames = await Videogame.findAll({
                    where: {
                        name: game
                    },
                include: {model: Genre, attributes:{exclude:["createdAt","updatedAt"]}, through: {attributes: []} }
                })
                if(dbGames.length === 0) res.send(`There's no game like that`)
                res.json(dbGames)
            } 
        } else {
            let games = await getSomeGames(gamesToPaginate)
            console.log(games.length)
            res.send(games)
        }        
    } catch (error){
        console.log(error)
    }
})
router.get('/videogame/:idVideogame', async function(req,res){
    let idGame = req.params.idVideogame;
    console.log(idGame)
    try{
        let request;
        let gameToDetail = {};
        request = await getSomeGames(gamesToPaginate)

        let game = request.find((game)=>(game.id === idGame))
        if(game){
            gameToDetail = {
                name: game.name,
                id: game.id,
                genres: game.genres,
                description: game.description,
                released: game.released,
                rating: game.rating,
                platforms: game.platforms

            } 
        } else {
            gameToDetail = await Videogame.findAll({
                where: {
                    id: idGame
                },
                include: {model: Genre, attributes:{exclude:["createdAt","updatedAt"]}, through: {attributes: []} }
            })
        }
        if (gameToDetail.id){
            res.send(gameToDetail)
        } else res.status(404).send({error: 'Game not found'})
        

    } catch(error){
        console.log(error)
    }
})
// params genres and platforms are array of id's. 
// newGenres and newPlatforms are arrays of strings. the names of the new platforms and genres
router.post('/videogame', async function(req, res) {
    // console.log(req.body); 
    let { name, description, released, rating, genres, newGenres, platforms, newPlatforms, maxId, maxGId, maxPId} =req.body; 
    
    let id = maxId +1;  
    let idG = maxGId ;  
    let idP = maxPId ;  
    let genresId = [];
    let platformsId = [];
    if(genres) genresId = genres; 

    if (newGenres) {
        let gens = newGenres.map((item) => {
            idG++
            return Genre.create({name: item, id: idG})
        })
        await Promise.all(gens).then((values)=> values.map((item)=> {
            console.log(item)
            genresId.push(item.id)}))
    }

    if(platforms) platformsId = platforms; 
    if(newPlatforms) {
        let plats = newPlatforms.map((item)=> {
            idP++;
            return Platform.create({ name: item, id: idP})})
        await Promise.all(plats).then((values)=> values.map((item)=> platformsId.push(item.id)))    
    }

    const newGame = await Videogame.create({
        id: id,
        name: name, 
        description: description,
        release_date: released,
        rating: rating        
    })

    await newGame.setGenres(genresId);
    await newGame.setPlatforms(platformsId);

    const gameCreated = await Videogame.findOne({
        where: {
            id: newGame.id
        },
        include: [
            {model: Genre, attributes:{exclude:["createdAt","updatedAt"]}, through: {attributes: []} },
            {model: Platform, attributes:{exclude:["createdAt","updatedAt"]},through: {attributes: []} }
        ],
        attributes: {exclude:["createdAt","updatedAt"]}
        
    })

    res.json(gameCreated)
})




module.exports = router;