const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const User = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "user",
            allowNull: false
        }
    },
    {
        tableName: 'users',
        timestamps: false, 
    }
)

module.exports = { User };