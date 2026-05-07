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
            const {student_id, teacher_id, discipline_id, date} = req.body;

            if (!student_id || !teacher_id || !discipline_id || !date) {
            return res.status(404).json({"message": "Payload is incorrect"}); 
            }

            date = new Date(date); 

            const newLesson = await Lesson.create({
                student_id,
                teacher_id,
                discipline_id,
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
            let {student_id, teacher_id, discipline_id, date} = req.body;

            const lesson = await Lesson.findByPk(lessonId);

            if (!lesson) {
                return res.status(404).json({"message": "Lesson not found"})
            }

            if (date) {
                date = new Date(date);
            }

            await lesson.update({
                student_id,
                teacher_id,
                discipline_id,
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
