const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const Lesson = sequelize.define(
    'Lesson',
    {
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discipline_id: {
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