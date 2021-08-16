const { Router } = require('express');
const { conn } = require('../db.js');
const { Videogame, Genre } = require('../db');
const router = require('express').Router();
const fetch = require("node-fetch");
const { API_KEY} = process.env

router.get('/videogames',async function(req,res){
    try {
        let pedido;
        let game = req.query.name;
        if(game){
            pedido =await fetch(`https://api.rawg.io/api/games?search=${game}&key=${API_KEY}`)
            let answer = await pedido.json();
            if(answer.length>0){
                res.send(answer)
            }
        }
        pedido = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)
        let answer= await pedido.json();
        res.send(answer)
        console.log('resultado 1')
        console.log(answer.results[0])
        console.log('resultado 2')
        console.log(answer.results[1])
        console.log('resultado 3')
        console.log(answer.results[2])
    } catch (error){
        console.log(error)
    }
})


module.exports = router;