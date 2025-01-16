/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Cart */
module.exports = (sequelize) => {
    return Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        id_product: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        }
    }, { paranoid: true })           // Ici pour faire du softDelete
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
Cart.sync()
Cart.sync({ force: true })
Cart.sync({ alter: true })

