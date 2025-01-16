/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const categorieCtrl = require('../controllers/categorie')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Categorie Time:', event.toString())
    next()
})

/**************************************/
/*** Routage de la ressource Categorie */

router.get('', categorieCtrl.getAllCategories)

router.get('/:id', categorieCtrl.getCategorie)

router.put('', checkTokenMiddleware, categorieCtrl.addCategorie)

router.patch('/:id', checkTokenMiddleware, categorieCtrl.updateCategorie)

router.post('/untrash/:id', checkTokenMiddleware, categorieCtrl.untrashCategorie)

router.delete('/trash/:id', checkTokenMiddleware, categorieCtrl.trashCategorie)

router.delete('/:id', checkTokenMiddleware, categorieCtrl.deleteCategorie)

module.exports = router