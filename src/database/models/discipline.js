const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const Discipline = sequelize.define(
    'Discipline',
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'disciplines',
        timestamps: false
    }
)

Discipline.associate = (models) => {
    Discipline.hasMany(models.Lesson);
}

module.exports = { Discipline }