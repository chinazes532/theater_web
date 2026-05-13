const { CanceledLesson } = require("../database/models/canceled_lessons")
const { Lesson } = require("../database/models/lesson"); 

class CanceledController {
    async get(req, res) {
        try {
            const canceledLessons = await CanceledLesson.findAll();

            if (canceledLessons.length === 0) {
                return res.status(404).json({"message": "Canceled lessons not found"})
            }

            return res.json({"canceledLessons": canceledLessons})
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
            
        }
    };

    async getOne(req, res) {
        try {
            const { canceledId } = req.params;
            const canceledLesson = await CanceledLesson.findByPk(canceledId);

            if (!canceledLesson) {
                return res.status(404).json({"message": "Canceled lesson not found"})
            }

            return res.json({"canceledLesson": canceledLesson})
            
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async post(req, res) {
        try {
            const { lessonId, reason } = req.body;
    
            if (!lessonId || !reason) {
                return res.status(400).json({"message": "Payload is incorrect"}); 
            }
    
            // 1. Проверяем, существует ли урок в базе данных
            const lesson = await Lesson.findByPk(lessonId);
            if (!lesson) {
                return res.status(404).json({"message": "Урок с указанным ID не существует в базе данных"});
            }
    
            // 2. Создаем отмену, если урок найден
            const newCanceled = await CanceledLesson.create({
                lesson_id: lessonId,
                reason
            });
    
            return res.status(201).json({"canceled": newCanceled});
        } catch (error) {
            return res.status(500).json({"message": `${error}`});
        }
    }

    async put(req, res) {
        try {
            const { canceledId } = req.params;
            const {lessonId, reason} = req.body;

            const canceledLesson = await CanceledLesson.findByPk(canceledId);

            if (!canceledLesson) {
                return res.status(404).json({"message": "Canceled lesson not found"})
            }

            await canceledLesson.update({
                lesson_id: lessonId,
                reason
            })

            return res.status(200).json({"canceledLesson": canceledLesson});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async delete(req, res) {
        try {
            const { canceledId } = req.params;

            const canceledLesson = await CanceledLesson.findByPk(canceledId);

            if (!canceledLesson) {
                return res.status(404).json({"message": "Canceled lesson not found"})
            }

            await CanceledLesson.destroy({
                where: { id: canceledId }
            });

            return res.status(200).json({"message": "Canceled lesson deleted"});
        } catch (error) {
            return res.status(500).json({"message": `${error}`});
        }
    }
}

module.exports = { CanceledController };
