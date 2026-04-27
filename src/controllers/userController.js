const { User } = require("../database/models/User")
const { bcrypt } = require("bcrypt")
const { jwt } = require("jsonwebtoken")

class UserController {
    async register(req, res) {
       const {username, password, role} = req.body;
       const candidate = await User.findOne({where: login, attributes: ['login']});

       if (candidate) {
        return res.status(500).json({"message": `User already exist`});
       } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({login, hashedPassword: hashPassword, role});
        const token = generateJWT(user.login, user.role);
        console.log(token);

        return res.json({"access_token": token})
       }
    }
}

module.exports = { UserController };