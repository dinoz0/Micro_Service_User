/***********************************/
/*** Import des module nécessaires */
const DB = require('../db.config')
const Cart = DB.Cart
const User = DB.User

/**************************************/
/*** Routage de la ressource Cart */

exports.getAllCarts = (req, res) => {
    Cart.findAll({ paranoid: false })
        .then(Carts => res.json({ data: cocktails }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getCart = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération du cart
        let cart = await Cart.findOne({ where: { id: cocktailId }, include: { model: User, attributes: ['id', 'pseudo', 'email'] } })

        // Test si résultat
        if (cart === null) {
            return res.status(404).json({ message: 'This cart does not exist !' })
        }

        // Renvoi du Cart trouvé
        return res.json({ data: cart })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addCart = async (req, res) => {
    const { user_id, nom, description, recette } = req.body

    // Validation des données reçues
    if (!user_id || !nom || !description || !recette) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si le coktail existe
        let cart = await Cart.findOne({ where: { nom: nom }, raw: true })
        if (cart !== null) {
            return res.status(409).json({ message: `The cart ${nom} already exists !` })
        }

        // Céation du cart
        cart = await Cart.create(req.body)
        return res.json({ message: 'Cart Created', data: cart })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.updateCart = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        // Recherche du cart et vérification
        let cart = await Cart.findOne({ where: { id: cocktailId }, raw: true })
        if (cart === null) {
            return res.status(404).json({ message: 'This cart does not exist !' })
        }

        // Mise à jour du cart
        await Cart.update(req.body, { where: { id: cocktailId } })
        return res.json({ message: 'Cart Updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashCart = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    Cart.restore({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashCart = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du cart
    Cart.destroy({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteCart = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du cart
    Cart.destroy({ where: { id: cocktailId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}