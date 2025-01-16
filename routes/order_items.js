/***********************************/
/*** Import des module nécessaires */
const express = require('express')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const order_itemsCtrl = require('../controllers/order_items')

/***************************************/
/*** Récupération du routeur d'express */
let router = express.Router()

/*********************************************/
/*** Middleware pour logger dates de requete */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Order_items Time:', event.toString())
    next()
})

/**************************************/
/*** Routage de la ressource Order_items */

router.get('', order_itemsCtrl.getAllOrder_itemss)

router.get('/:id', order_itemsCtrl.getOrder_items)

router.put('', checkTokenMiddleware, order_itemsCtrl.addOrder_items)

router.patch('/:id', checkTokenMiddleware, order_itemsCtrl.updateOrder_items)

router.post('/untrash/:id', checkTokenMiddleware, order_itemsCtrl.untrashOrder_items)

router.delete('/trash/:id', checkTokenMiddleware, order_itemsCtrl.trashOrder_items)

router.delete('/:id', checkTokenMiddleware, order_itemsCtrl.deleteOrder_items)

module.exports = router