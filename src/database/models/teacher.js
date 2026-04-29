const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const Teacher = sequelize.define(
    'Teacher',
    {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthay_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'teachers',
        timestamps: false
    }
)

Teacher.associate = (models) => {
    Teacher.hasMany(models.Lesson);
}

module.exports = { Teacher }