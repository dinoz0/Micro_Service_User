/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Categorie */
module.exports = (sequelize) => {
    return Categorie = sequelize.define('Categorie', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        }
    }, { paranoid: true })           // Ici pour faire du softDelete
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
Categorie.sync()
Categorie.sync({ force: true })
Categorie.sync({ alter: true })

