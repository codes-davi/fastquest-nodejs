const Sequelize = require('sequelize');

const connection = new Sequelize('fastquestions','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;