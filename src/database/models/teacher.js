const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const Teacher = sequelize.define(
    'Teacher',
    {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthayDate: {
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