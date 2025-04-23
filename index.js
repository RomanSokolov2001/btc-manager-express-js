const express = require("express");
const cors = require("cors");
const btcService = require("./btcService");
const mainService = require("./src/mainService");
const { Worker } = require('worker_threads');
const axios = require("axios");


require("dotenv").config();
const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());
const manager = new Worker("./src/manager.js");

process.on('uncaughtException', (err) => {
    console.error('🔥 Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Unhandled Rejection:', reason);
});


app.get("/api/wallet/create", async (req, res) => {
    // const wallet = await btcService.createHDWallet()
    // console.log(wallet);
    // await btcService.getHDWallet()
    await btcService.checkAddressBalance()
    res.status(200).send(html);
});

app.get("/test", async (req, res) => {
    const btcCurrentPrice = (await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur')).data.bitcoin.eur
    const totalPriceBtc = parseFloat((10/btcCurrentPrice).toFixed(8));

    // try {
    //     res.status(200).send(await mainService.createNewPayment());
    // } catch (e) {
    //     res.status(405).send("error");
    // }
});

app.listen(port, () => console.log(`Server running on port ${port}`));

app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack);
    return res.status(500).json({result: 'error', message: 'Internal server error', details: err.message});
});
