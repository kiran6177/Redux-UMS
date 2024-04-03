const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/ums');

async function dbConnect(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.log('Unable to connect to the database:', error);
      }
}

module.exports = {dbConnect,sequelize}