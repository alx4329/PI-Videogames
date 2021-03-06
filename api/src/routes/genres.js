const { Router } = require('express');
const { conn } = require('../db.js');
const { Videogame, Genre, Platform } = require('../db');
const router = require('express').Router();
const fetch = require("node-fetch");
const db = require('../db.js');
const loadGenres = require('../functions/loadGenres.js')

router.get('/genres', async function (req,res){
    
    let genres = await Genre.findAll({
        attributes: {exclude:["createdAt","updatedAt"]},
        through: {attributes: []}
    });
    if (genres.length>0)  res.json(genres) 
    else {
        await loadGenres();
        const gens = await Genre.findAll({
            attributes: {exclude:["createdAt","updatedAt"]},
            through: {attributes: []}
        });
        // console.log(gens.length)
        res.json(gens)
    }

})

module.exports = router;