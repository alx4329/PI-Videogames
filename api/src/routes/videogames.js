const { Router } = require('express');
const { conn } = require('../db.js');
const { Videogame, Genre, Platform } = require('../db');
const router = require('express').Router();
const fetch = require("node-fetch");
const db = require('../db.js');
const { API_KEY} = process.env
const getSomeGames = require('../functions/getSomeGames.jsx');
const searchGame = require('../functions/searchGame')
// The RAWG API returns 40 games per page maximum. 
//As we want to do the pagination in our API, we do all the requests at the beginning. 
// So we define the function 'getSomeGames' which receives a number of the minimal amount of games we will need in our API.
//  Then it calls the RAWG API the necessary times to get at least that number, and returns an array of games.
const gamesToPaginate = 40






router.get('/videogames',async function(req,res){
    try {
        let game = req.query.game       
        
        if(game){
            let games = await searchGame(gamesToPaginate, game);
            res.send(games)

        } else {
            let games = await getSomeGames(gamesToPaginate)
            // console.log(games.length)
            res.send(games)
        }        
    } catch (error){
        console.log(error)
    }
})
router.get('/videogame/:idVideogame', async function(req,res){
    let idGame = req.params.idVideogame;
    try{
        let request = await fetch(`https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`)
        let game = await request.json()
        
        //  console.log(game)
        
        if(game.platforms){
            platforms = game.platforms.map((plat)=>plat.platform);
            game.description_raw ? description=game.description_raw : description = "No description for this one";
            let gameToSend = {
                name: game.name,
                img: game.background_image,
                img2: game.background_image_additional,
                genres: game.genres,
                released: game.released,
                rating: game.rating, 
                platforms: platforms,
                description: description
                
            }
            res.send(gameToSend)
        } else {
            let dbGame = await Videogame.findAll({
                where: {
                    id: idGame
                },
                include: [
                    {model: Genre, attributes:{exclude:["createdAt","updatedAt"]}, through: {attributes: []} },
                    {model: Platform, attributes:{exclude:["createdAt","updatedAt"]},through: {attributes: []} }
                ],            })
            if (dbGame.length>0){
                res.send(dbGame[0])}
                else res.status(404).send({error: "Game not found"})
        } 
        

    } catch(error){
        console.log(error)
    }
})
// params genres and platforms are array of id's. 
// newGenres and newPlatforms are arrays of strings. the names of the new platforms and genres
router.post('/videogame', async function(req, res) {
    // console.log(req.body); 
    let { name, description, released, rating, genres, newGenres, platforms, newPlatforms} =req.body; 

    
    let genresId = [];
    let platformsId = [];
    if(genres) genresId = genres; 

    if (newGenres) {
        let gens = newGenres.map((item) => {
            
            return Genre.create({name: item})
        })
        await Promise.all(gens).then((values)=> values.map((item)=> {
            console.log(item)
            genresId.push(item.id)}))
    }

    if(platforms) platformsId = platforms; 
    if(newPlatforms) {
        let plats = newPlatforms.map((item)=> {
            
            return Platform.create({ name: item})})
        await Promise.all(plats).then((values)=> values.map((item)=> platformsId.push(item.id)))    
    }

    const newGame = await Videogame.create({
        
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