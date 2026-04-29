const { User } = require("../database/models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config();

const generateJWT = (username, role) => {
    return jwt.sign({username, role}, process.env.SECRET_KEY, {expiresIn: "30m"});
}

class UserController {
    async register(req, res) {
       const {username, password, role} = req.body;
       const candidate = await User.findOne({ 
        where: { username }, 
        attributes: ['username'] 
    });

       if (candidate) {
        return res.status(500).json({"message": `User already exist`});
       } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, hashed_password: hashPassword, role});
        const token = generateJWT(user.username, user.role);

        return res.json(
            {"success": true, "access_token": token}
            )
       }
    }

    async login(req, res) {
        const {username, password} = req.body;
        const user = await User.findOne({ 
            where: { username }, 
        });

        if (!user) {
            return res.status(400).json({"message": `Incorrect data`});
        } else {
            let userPasswod = bcrypt.compareSync(password, user.hashed_password);

            if (!userPasswod) {
                return res.status(500).json({"message": `Incorrect data`});
            }
        }

        const token = generateJWT(user.username, user.role);

        return res.json(
            {"success": true, "access_token": token}
            )
    }
}

module.exports = { UserController };
