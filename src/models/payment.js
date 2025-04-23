const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');
const Payment = sequelize.define('payments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    IP: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    status: DataTypes.STRING,
    senderWallet: DataTypes.STRING,
    address: DataTypes.STRING,
    public: DataTypes.STRING,
    path: DataTypes.STRING,
    btcExchangeRate: DataTypes.DOUBLE,
    priceInBtc: DataTypes.DOUBLE,
});

module.exports = Payment;
