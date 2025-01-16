/***********************************/
/*** Import des module nécessaires */
const DB = require('../db.config')
const Product = DB.Product
const User = DB.User

/**************************************/
/*** Routage de la ressource Product */

exports.getAllProducts = (req, res) => {
    Product.findAll({ paranoid: false })
        .then(Products => res.json({ data: cocktails }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getProduct = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération du product
        let product = await Product.findOne({ where: { id: cocktailId }, include: { model: User, attributes: ['id', 'pseudo', 'email'] } })

        // Test si résultat
        if (product === null) {
            return res.status(404).json({ message: 'This product does not exist !' })
        }

        // Renvoi du Product trouvé
        return res.json({ data: product })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addProduct = async (req, res) => {
    const { user_id, nom, description, recette } = req.body

    // Validation des données reçues
    if (!user_id || !nom || !description || !recette) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si le coktail existe
        let product = await Product.findOne({ where: { nom: nom }, raw: true })
        if (product !== null) {
            return res.status(409).json({ message: `The product ${nom} already exists !` })
        }

        // Céation du product
        product = await Product.create(req.body)
        return res.json({ message: 'Product Created', data: product })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.updateProduct = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        // Recherche du product et vérification
        let product = await Product.findOne({ where: { id: cocktailId }, raw: true })
        if (product === null) {
            return res.status(404).json({ message: 'This product does not exist !' })
        }

        // Mise à jour du product
        await Product.update(req.body, { where: { id: cocktailId } })
        return res.json({ message: 'Product Updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashProduct = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    Product.restore({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashProduct = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du product
    Product.destroy({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteProduct = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du product
    Product.destroy({ where: { id: cocktailId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}