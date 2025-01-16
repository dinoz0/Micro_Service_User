/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Order */
module.exports = (sequelize) => {
    return Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        total_price: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, { paranoid: true })           // Ici pour faire du softDelete
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
Order.sync()
Order.sync({ force: true })
Order.sync({ alter: true })

