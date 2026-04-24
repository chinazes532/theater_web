const { Teacher } = require("../database/models/teacher")

class TeacherController {
    async get(req, res) {
        try {
            const teachers = await Teacher.findAll();

            if (teachers.length === 0) {
                res.status(404).json({"message": "Teachers not found"})
            }

            return res.json({"teachers": teachers})
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
            
        }
    };

    async getOne(req, res) {
        try {
            const { teacherId } = req.params;
            const teacher = await Teacher.findByPk(teacherId);

            if (!teacher) {
                return res.status(404).json({"message": "Teacher not found"})
            }

            return res.json({"teacher": teacher})
            
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async post(req, res) {
        try {
            const {fullName, phone, birthayDate, age} = req.body;

            if (!fullName || !phone || !birthayDate || !age) {
            return res.status(404).json({"message": "Payload is incorrect"}); 
            }

            const newTeacher = await Teacher.create({
                fullName,
                phone,
                birthayDate,
                age
            })

            return res.status(201).json({"teacher": newTeacher});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async put(req, res) {
        try {
            const {teacherId} = req.params;
            const {fullName, phone, birthayDate, age} = req.body;

            const teacher = await Teacher.findByPk(teacherId);

            if (!teacher) {
                return res.status(404).json({"message": "Teacher not found"})
            }

            await teacher.update({
                fullName,
                phone,
                birthayDate,
                age
            })

            return res.status(200).json({"teacher": teacher});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async delete(req, res) {
        try {
            const {teacherId} = req.params;

            const teacher = await Teacher.findByPk(teacherId);

            if (!teacher) {
                return res.status(404).json({"message": "Teacher not found"})
            }

            await Teacher.destroy({
                where: { id: studentId }
            });

            return res.status(200).json({"message": "Teacher deleted"});
        } catch (error) {
            return res.status(500).json({"message": `${error}`});
        }
    }
}

module.exports = { TeacherController };