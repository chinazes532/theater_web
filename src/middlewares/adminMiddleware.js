const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports =  function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    message: 'Для просмотра данной страницы необходимо авторизоваться'
                });
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user_role = decoded.role;
            
            if (!roles.includes(user_role)) {
                console.log(user_role);
                console.log(roles);
                return res.status(401).json({message: 'Нет доступа для просмотра данной страницы'});
            }
            req.user = decoded; 
            next();
        } catch (error) {
            res.status(401).json({message: 'Авторизация была провалена'});
        }
    }
}
