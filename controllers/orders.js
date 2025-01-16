/***********************************/
/*** Import des module nécessaires */
const DB = require('../db.config')
const Order = DB.Order
const User = DB.User

/**************************************/
/*** Routage de la ressource Order */

exports.getAllOrders = (req, res) => {
    Order.findAll({ paranoid: false })
        .then(Orders => res.json({ data: cocktails }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getOrder = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération du order
        let order = await Order.findOne({ where: { id: cocktailId }, include: { model: User, attributes: ['id', 'pseudo', 'email'] } })

        // Test si résultat
        if (order === null) {
            return res.status(404).json({ message: 'This order does not exist !' })
        }

        // Renvoi du Order trouvé
        return res.json({ data: order })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addOrder = async (req, res) => {
    const { user_id, nom, description, recette } = req.body

    // Validation des données reçues
    if (!user_id || !nom || !description || !recette) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si le coktail existe
        let order = await Order.findOne({ where: { nom: nom }, raw: true })
        if (order !== null) {
            return res.status(409).json({ message: `The order ${nom} already exists !` })
        }

        // Céation du order
        order = await Order.create(req.body)
        return res.json({ message: 'Order Created', data: order })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.updateOrder = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        // Recherche du order et vérification
        let order = await Order.findOne({ where: { id: cocktailId }, raw: true })
        if (order === null) {
            return res.status(404).json({ message: 'This order does not exist !' })
        }

        // Mise à jour du order
        await Order.update(req.body, { where: { id: cocktailId } })
        return res.json({ message: 'Order Updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashOrder = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    Order.restore({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashOrder = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du order
    Order.destroy({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteOrder = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du order
    Order.destroy({ where: { id: cocktailId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}