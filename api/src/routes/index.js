const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('./videogames');
const genres = require('./genres')
const platforms = require('./platforms')



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(videogames); 
router.use(genres); 
router.use(platforms); 
// router.use(genres); 

module.exports = router;
