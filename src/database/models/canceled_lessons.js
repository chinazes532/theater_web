const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const CanceledLesson = sequelize.define(
    'CanceledLesson',
    {
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'canceled_lessons',
        timestamps: false, 
    }
)

CanceledLesson.associate = (models) => {
    CanceledLesson.belongsTo(models.Lesson);
}

module.exports = { CanceledLesson }