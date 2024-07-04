const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('player', 'root', 'Kautilya@1', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;