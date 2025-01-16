/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const cartCtrl = require('../controllers/cart')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Cart Time:', event.toString())
    next()
})

/**************************************/
/*** Routage de la ressource Cart */

router.get('', cartCtrl.getAllCarts)

router.get('/:id', cartCtrl.getCart)

router.put('', checkTokenMiddleware, cartCtrl.addCart)

router.patch('/:id', checkTokenMiddleware, cartCtrl.updateCart)

router.post('/untrash/:id', checkTokenMiddleware, cartCtrl.untrashCart)

router.delete('/trash/:id', checkTokenMiddleware, cartCtrl.trashCart)

router.delete('/:id', checkTokenMiddleware, cartCtrl.deleteCart)

module.exports = router