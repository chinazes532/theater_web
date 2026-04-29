const { Discipline } = require("../database/models/discipline")

class DisciplineController {
    async get(req, res) {
        try {
            const disciplines = await Discipline.findAll();

            if (disciplines.length === 0) {
                res.status(404).json({"message": "Disciplines not found"})
            }

            return res.json({"disciplines": disciplines})
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
            
        }
    };

    async getOne(req, res) {
        try {
            const { discipline_id } = req.params;
            const discipline = await Discipline.findByPk(discipline_id);

            if (!discipline) {
                return res.status(404).json({"message": "Discipline not found"})
            }

            return res.json({"discipline": discipline})
            
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async post(req, res) {
        try {
            const {title, price} = req.body;

            if (!title || !price) {
            return res.status(404).json({"message": "Payload is incorrect"}); 
            }

            const newDiscipline = await Discipline.create({
                title,
                price
            })

            return res.status(201).json({"discipline": newDiscipline});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async put(req, res) {
        try {
            const { discipline_id } = req.params;
            const {title, price} = req.body;

            const discipline = await Discipline.findByPk(discipline_id);

            if (!discipline) {
                return res.status(404).json({"message": "Discipline not found"})
            }

            await discipline.update({
                title,
                price
            })

            return res.status(200).json({"discipline": discipline});
        } catch (error) {
            return res.status(500).json({"message": `${error}`})
        }
    }

    async delete(req, res) {
        try {
            const { discipline_id } = req.params;
            const discipline = await Discipline.findByPk(discipline_id);

            if (!discipline) {
                return res.status(404).json({"message": "Discipline not found"})
            }

            await Discipline.destroy({
                where: { id: discipline_id }
            });

            return res.status(200).json({"message": "Discipline deleted"});
        } catch (error) {
            return res.status(500).json({"message": `${error}`});
        }
    }
}

module.exports = { DisciplineController };