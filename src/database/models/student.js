const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const Student = sequelize.define(
    'Student',
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
        tableName: 'students',
        timestamps: false
    }
)

Student.associate = (models) => {
    Student.hasMany(models.Lesson);
}

module.exports = { Student }