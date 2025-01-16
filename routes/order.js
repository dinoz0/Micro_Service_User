/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const orderCtrl = require('../controllers/order')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Order Time:', event.toString())
    next()
})

/**************************************/
/*** Routage de la ressource Order */

router.get('', orderCtrl.getAllOrders)

router.get('/:id', orderCtrl.getOrder)

router.put('', checkTokenMiddleware, orderCtrl.addOrder)

router.patch('/:id', checkTokenMiddleware, orderCtrl.updateOrder)

router.post('/untrash/:id', checkTokenMiddleware, orderCtrl.untrashOrder)

router.delete('/trash/:id', checkTokenMiddleware, orderCtrl.trashOrder)

router.delete('/:id', checkTokenMiddleware, orderCtrl.deleteOrder)

module.exports = router