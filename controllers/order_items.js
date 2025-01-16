/***********************************/
/*** Import des module nécessaires */
const DB = require('../db.config')
const Order_item = DB.Order_item
const User = DB.User

/**************************************/
/*** Routage de la ressource Order_item */

exports.getAllOrder_items = (req, res) => {
    Order_item.findAll({ paranoid: false })
        .then(Order_items => res.json({ data: order_items }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getOrder_item = async (req, res) => {
    let order_itemId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!order_itemId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération du order_item
        let order_item = await Order_item.findOne({ where: { id: order_itemId }, include: { model: User, attributes: ['id', 'pseudo', 'email'] } })

        // Test si résultat
        if (order_item === null) {
            return res.status(404).json({ message: 'This order_item does not exist !' })
        }

        // Renvoi du Order_item trouvé
        return res.json({ data: order_item })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addOrder_item = async (req, res) => {
    const { user_id, nom, description, recette } = req.body

    // Validation des données reçues
    if (!user_id || !nom || !description || !recette) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si le coktail existe
        let order_item = await Order_item.findOne({ where: { nom: nom }, raw: true })
        if (order_item !== null) {
            return res.status(409).json({ message: `The order_item ${nom} already exists !` })
        }

        // Céation du order_item
        order_item = await Order_item.create(req.body)
        return res.json({ message: 'Order_item Created', data: order_item })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.updateOrder_item = async (req, res) => {
    let order_itemId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!order_itemId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        // Recherche du order_item et vérification
        let order_item = await Order_item.findOne({ where: { id: order_itemId }, raw: true })
        if (order_item === null) {
            return res.status(404).json({ message: 'This order_item does not exist !' })
        }

        // Mise à jour du order_item
        await Order_item.update(req.body, { where: { id: order_itemId } })
        return res.json({ message: 'Order_item Updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashOrder_item = (req, res) => {
    let order_itemId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!order_itemId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    Order_item.restore({ where: { id: order_itemId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashOrder_item = (req, res) => {
    let order_itemId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!order_itemId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du order_item
    Order_item.destroy({ where: { id: order_itemId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteOrder_item = (req, res) => {
    let order_itemId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!order_itemId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du order_item
    Order_item.destroy({ where: { id: order_itemId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}