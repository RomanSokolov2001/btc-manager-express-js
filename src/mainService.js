const btcService = require("../btcService");
const bdService = require("../bdService");
const unpaidInstance = require("./models/unpaid");
const axios = require("axios");

class MainService {
    async createNewPayment() {
        try {
            const derivedAddress = await btcService.deriveAddress()
            const btcExchangeRate = (await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')).data.bitcoin.eur
            const priceInBtc = parseFloat((10/btcExchangeRate).toFixed(8));
            return await bdService.createNewPayment(derivedAddress, "1.1.1.1", btcExchangeRate, priceInBtc)
        } catch (e) {

        }
    }

    async checkUnpaidPayments() {
        try {
            const unpaidPayments = await bdService.getUnpaidPayments()
            if (unpaidPayments && unpaidPayments.length > 0) {
                for (const payment of unpaidPayments) {
                    const paymentInstance = await bdService.getPaymentById(payment.id);
                    const balance = await btcService.checkAddressBalance(payment.address)
                    if (balance >= paymentInstance.priceInBtc) {
                        await bdService.changePaymentToPaid(payment.id)
                    }
                }
            }
        } catch (e) {
            console.error(`@checkUnpaidPayments: ${e}`);
        }
    }
}

module.exports = new MainService();
