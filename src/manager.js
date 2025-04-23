const { parentPort } = require('worker_threads');
async function startManager() {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    while(true){
        const mins = 10
        await sleep(60000 * mins);//3000ms
        // i++;
        // console.log('Infinite Loop Test n:', i);
    }
}

startManager();

