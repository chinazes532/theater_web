const { Student } = require("../database/models/student")

class StudentController {
    async get(req, res) {
        try {
            const students = await Student.findAll();

            if (students.length === 0) {
                res.status(404).json({"message": "Students not found"})
            }

            return res.json({"students": students})
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
            
        }
    };

    async getOne(req, res) {
        try {
            const { studentId } = req.params;
            const student = await Student.findByPk(studentId);

            if (!student) {
                return res.status(404).json({"message": "Student not found"})
            }

            return res.json({"student": student})
            
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

            const newStudent = await Student.create({
                fullName,
                phone,
                birthayDate,
                age
            })

            return res.status(201).json({"student": newStudent});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async put(req, res) {
        try {
            const {studentId} = req.params;
            const {fullName, phone, birthayDate, age} = req.body;

            const student = await Student.findByPk(studentId);

            if (!student) {
                return res.status(404).json({"message": "Student not found"})
            }

            await student.update({
                fullName,
                phone,
                birthayDate,
                age
            })

            return res.status(200).json({"student": student});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async delete(req, res) {
        try {
            const {studentId} = req.params;
            const student = await Student.findByPk(studentId);

            if (!student) {
                return res.status(404).json({"message": "Student not found"})
            }

            await Student.destroy({
                where: { id: studentId }
            });

            return res.status(200).json({"message": "Student deleted"});
        } catch (error) {
            return res.status(500).json({"message": `${error}`});
        }
    }
}

module.exports = { StudentController };