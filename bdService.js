const Payment = require('./src/models/payment');
const Unpaid = require('./src/models/unpaid');
const Paid = require('./src/models/paid');

const {DataTypes} = require("sequelize");

class BdService {
    async createNewPayment(wallet, IP, btcExchangeRate, priceInBtc) {
        try {
            await Payment.sync()
            await Unpaid.sync()

            const newPayment = await Payment.create({
                IP: IP,
                createdAt: new Date().toISOString(),
                status: 'unpaid',
                senderWallet: '',
                address: wallet.address,
                public: wallet.public,
                path: wallet.path,
                priceInBtc: priceInBtc,
                btcExchangeRate: btcExchangeRate
            });
            await Unpaid.create({id: newPayment.id})
            return newPayment.public;
        } catch (e) {
            console.error(`@createNewPayment: ${e}`);
            throw e;
        }
    }

    async getUnpaidPayments() {
        try {
            return await Unpaid.findAll()
        } catch (e) {
            return null;
        }
    }

    async getPaymentById(id) {
        return await Payment.findOne({
            where: {id}
        });
    }

    async changePaymentToPaid(id) {
        try {
            const isDeleted = await Unpaid.destroy({
                where: {id}
            })
            if (isDeleted) {
                await Unpaid.create({id})
            }
        } catch (e) {
            console.error(`@changePaymentToPaid: ${e}`);
            throw e;
        }
    }

    findPaymentByUid(uid) {
        // return payment object or null
    }
}

module.exports = new BdService();
