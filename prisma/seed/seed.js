const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// const {userFlow1} = require('./userFlowSeeds/flow1');
const {userFlow2} = require('./userFlowSeeds/flow2');
const {analyticSeedFlow} = require('./userFlowSeeds/analyticSeed');
// const {userFlow2} = require('./userFlowSeeds/flow2');
// const {userFlow3} = require('./userFlowSeeds/flow3');
// const {userFlow4} = require('./userFlowSeeds/flow4');

async function main() {
    const response  = await userFlow2();
    const analyticSeedFlowRes  = await analyticSeedFlow();
    console.log(response)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })