const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');
const Unpaid = sequelize.define('paid', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    paidAt: DataTypes.STRING,
});

module.exports = Unpaid;
