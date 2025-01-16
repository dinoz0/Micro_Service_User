/***********************************/
/*** Import des module nécessaires */
const DB = require('../db.config')
const Categorie = DB.Categorie
const User = DB.User

/**************************************/
/*** Routage de la ressource Categorie */

exports.getAllProducts = (req, res) => {
    Categorie.findAll({ paranoid: false })
        .then(Products => res.json({ data: cocktails }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        // Récupération du categorie
        let categorie = await Categorie.findOne({ where: { id: cocktailId }, include: { model: User, attributes: ['id', 'pseudo', 'email'] } })

        // Test si résultat
        if (categorie === null) {
            return res.status(404).json({ message: 'This categorie does not exist !' })
        }

        // Renvoi du Categorie trouvé
        return res.json({ data: categorie })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.addCocktail = async (req, res) => {
    const { user_id, nom, description, recette } = req.body

    // Validation des données reçues
    if (!user_id || !nom || !description || !recette) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        // Vérification si le coktail existe
        let categorie = await Categorie.findOne({ where: { nom: nom }, raw: true })
        if (categorie !== null) {
            return res.status(409).json({ message: `The categorie ${nom} already exists !` })
        }

        // Céation du categorie
        categorie = await Categorie.create(req.body)
        return res.json({ message: 'Categorie Created', data: categorie })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.updateCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        // Recherche du categorie et vérification
        let categorie = await Categorie.findOne({ where: { id: cocktailId }, raw: true })
        if (categorie === null) {
            return res.status(404).json({ message: 'This categorie does not exist !' })
        }

        // Mise à jour du categorie
        await Categorie.update(req.body, { where: { id: cocktailId } })
        return res.json({ message: 'Categorie Updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.untrashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    Categorie.restore({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.trashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du categorie
    Categorie.destroy({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.deleteCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!cocktailId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression du categorie
    Categorie.destroy({ where: { id: cocktailId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}