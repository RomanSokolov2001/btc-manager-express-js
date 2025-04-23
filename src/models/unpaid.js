const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');
const unpaidInstance = sequelize.define('unpaid', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
});

module.exports = unpaidInstance;
