const { Router } = require('express');
const { conn } = require('../db.js');
const { Videogame, Genre, Platform } = require('../db');
const router = require('express').Router();
const fetch = require("node-fetch");
const db = require('../db.js');
const loadPlatforms = require('../functions/loadPlatforms.js')

router.get('/platforms', async function (req,res){
    
    let platforms = await Platform.findAll({
        attributes: {exclude:["createdAt","updatedAt"]},
        through: {attributes: []}
    });
    if (platforms.length>0)  res.json(platforms) 
    else {
        await loadPlatforms();
        const plats = await Platform.findAll({
            attributes: {exclude:["createdAt","updatedAt"]},
            through: {attributes: []}
        });
        // console.log(plats.length)
        res.json(plats)
    }

})

module.exports = router;