const { Sequelize  } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
})

const initDB = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("DB is created");
    } catch (error) {
        console.error(`Erorr - ${error}`);
        process.exit();
    }
}

module.exports = {sequelize, initDB};