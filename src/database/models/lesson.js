const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const Lesson = sequelize.define(
    'Lesson',
    {
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        disciplineId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'lessons',
        timestamps: false
    }
)

Lesson.associate = (models) => {
    Lesson.belongsTo(models.Student);
}
Lesson.associate = (models) => {
    Lesson.belongsTo(models.Teacher);
}
Lesson.associate = (models) => {
    Lesson.belongsTo(models.Discipline);
}
Lesson.associate = (models) => {
    Lesson.hasOne(models.CanceledLesson)
}

module.exports = { Lesson }