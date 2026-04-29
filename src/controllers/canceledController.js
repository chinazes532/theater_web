const { CanceledLesson } = require("../database/models/canceled_lessons")

class CanceledController {
    async get(req, res) {
        try {
            const canceledLessons = await CanceledLesson.findAll();

            if (canceledLessons.length === 0) {
                res.status(404).json({"message": "Canceled lessons not found"})
            }

            return res.json({"canceledLessons": canceledLessons})
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
            
        }
    };

    async getOne(req, res) {
        try {
            const { canceled_id } = req.params;
            const canceledLesson = await CanceledLesson.findByPk(canceled_id);

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
            const {lesson_id, reason} = req.body;

            if (!lesson_id || !reason) {
            return res.status(404).json({"message": "Payload is incorrect"}); 
            }

            const newCanceled = await CanceledLesson.create({
                lesson_id,
                reason
            })

            return res.status(201).json({"canceled": newCanceled});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async put(req, res) {
        try {
            const { canceled_id } = req.params;
            const {lesson_id, reason} = req.body;

            const canceledLesson = await CanceledLesson.findByPk(canceled_id);

            if (!canceledLesson) {
                return res.status(404).json({"message": "Canceled lesson not found"})
            }

            await canceledLesson.update({
                lesson_id,
                reason
            })

            return res.status(200).json({"canceledLesson": canceledLesson});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async delete(req, res) {
        try {
            const { canceled_id } = req.params;

            const canceledLesson = await CanceledLesson.findByPk(canceled_id);

            if (!canceledLesson) {
                return res.status(404).json({"message": "Canceled lesson not found"})
            }

            await CanceledLesson.destroy({
                where: { id: canceled_id }
            });

            return res.status(200).json({"message": "Canceled lesson deleted"});
        } catch (error) {
            return res.status(500).json({"message": `${error}`});
        }
    }
}

module.exports = { CanceledController };