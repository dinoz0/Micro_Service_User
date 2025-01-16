/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Order_item */
module.exports = (sequelize) => {
    return Order_item = sequelize.define('Order_item', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        id_order: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        id_product: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER(100),
            allowNull: false
        },
        price: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
        }
    }, { paranoid: true })           // Ici pour faire du softDelete
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
Order_item.sync()
Order_item.sync({ force: true })
Order_item.sync({ alter: true })

