const { Sequelize } = require('sequelize');
const sequelize = require('../util/database');

const Player = sequelize.define('player', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    dob: {
        type: Sequelize.STRING
    },
    photoUrl: {
        type: Sequelize.STRING
    },
    birthPlace: {
        type: Sequelize.STRING
    },
    noOfMatches: {
        type: Sequelize.INTEGER
    },
    score: {
        type: Sequelize.INTEGER
    },
    fifties: {
        type: Sequelize.INTEGER
    },
    hundreds: {
        type: Sequelize.INTEGER
    },
    wicket: {
        type: Sequelize.INTEGER
    },
    average: {
        type: Sequelize.INTEGER
    }

});

module.exports = Player;