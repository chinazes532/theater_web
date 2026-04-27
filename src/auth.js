const { User } = require("../database/models/User");
const { bcrypt } = require("bcrypt");
const { jwt } = require("jsonwebtoken");

require("dotenv").config();

const generateJWT = (login, role) => {
    return jwt.sign({login, role}, process.env.SECRET_KEY, {expireIn: "30m"});
}