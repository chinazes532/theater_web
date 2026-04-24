const { Lesson } = require("../database/models/lesson")

class LessonController {
    async get(req, res) {
        try {
            const lessons = await Lesson.findAll();

            if (lessons.length === 0) {
                res.status(404).json({"message": "Lessons not found"})
            }

            return res.json({"lessons": lessons})
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
            
        }
    };

    async getOne(req, res) {
        try {
            const { lessonId } = req.params;
            const lesson = await Lesson.findByPk(lessonId);

            if (!lesson) {
                return res.status(404).json({"message": "Lesson not found"})
            }

            return res.json({"lesson": lesson})
            
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async post(req, res) {
        try {
            const {studentId, teacherId, disciplineId, date} = req.body;

            if (!studentId || !teacherId || !disciplineId || !date) {
            return res.status(404).json({"message": "Payload is incorrect"}); 
            }

            date = new Date(date);

            const newLesson = await Lesson.create({
                studentId,
                teacherId,
                disciplineId,
                date
            })

            return res.status(201).json({"lesson": newLesson});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async put(req, res) {
        try {
            const {lessonId} = req.params;
            const {studentId, teacherId, disciplineId, date} = req.body;

            const lesson = await Lesson.findByPk(lessonId);

            if (!lesson) {
                return res.status(404).json({"message": "Lesson not found"})
            }

            date = new Date(date);

            await lesson.update({
                studentId,
                teacherId,
                disciplineId,
                date
            })

            return res.status(200).json({"lesson": lesson});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async delete(req, res) {
        try {
           const {lessonId} = req.params;
           const lesson = await Lesson.findByPk(lessonId);

           if (!lesson) {
                return res.status(404).json({"message": "Lesson not found"})
            }

            await Lesson.destroy({
                where: { id: lessonId }
            });

            return res.status(200).json({"message": "Lesson deleted"});
        } catch (error) {
            return res.status(500).json({"message": `${error}`});
        }
    }
}

module.exports = { LessonController };