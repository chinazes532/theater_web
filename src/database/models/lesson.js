const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbServer');

const Lesson = sequelize.define(
    'Lesson',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
            type: DataTypes.DATEONLY, 
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,     
            allowNull: false          
        }
    
    },
    {
        tableName: 'lessons',
        timestamps: false
    }
)

Lesson.associate = (models) => {
    Lesson.belongsTo(models.Student, { foreignKey: 'student_id' });
    Lesson.belongsTo(models.Teacher, { foreignKey: 'teacher_id' });
    Lesson.belongsTo(models.Discipline, { foreignKey: 'discipline_id' });
    Lesson.hasOne(models.CanceledLesson, { foreignKey: 'lesson_id' });
};


module.exports = { Lesson }