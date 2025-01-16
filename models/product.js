/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Product */
module.exports = (sequelize) => {
    return Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        price: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: '',
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        }
    }, { paranoid: true })           // Ici pour faire du softDelete
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
Product.sync()
Product.sync({ force: true })
Product.sync({ alter: true })

