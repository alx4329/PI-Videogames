const { Router } = require('express');
const { conn } = require('../db.js');
const { Videogame, Genre } = require('../db');
const router = require('express').Router();
const fetch = require("node-fetch");
const { API_KEY} = process.env

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
                include: Genre
                })
                if(dbGames.length === 0) res.send(`There's no game like that`)
                res.json(dbGames)
            } 
        } else {
            let resultsAmount = 100; 
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
            console.log(answers.length)
            let valuesToSend =[];
            let values = answers.map((item)=>{
                for(let i=0; i< item.results.length ; i++){
                    let obj = {
                        id: item.results[i].name,
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
            res.send(AllValuesToSend)
        }        
    } catch (error){
        console.log(error)
    }
})
router.get('/videogame/:videogame', async function(req,res){
    let game = req.params.videogame;
    try{
        let request;
        let gameToDetail = {};
        request 
    } catch(errot){
        console.log(error)
    }
})
      

module.exports = router;