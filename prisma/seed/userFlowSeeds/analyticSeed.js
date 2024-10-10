const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const analyticSeedFlow = async () => {

    const leaderboardSeed1 = await prisma.leaderBoard.upsert({
        where: { user_id: '20'},
        update: {},
        create: {
            user_id: '20',
            batch_number: '100',
            rank: 2
        },
    });

    const leaderboardSeed2 = await prisma.leaderBoard.upsert({
        where: { user_id: '7'},
        update: {},
        create: {
            user_id: '7',
            batch_number: '100',
            rank: 1
        },
    });

    const trend1 = await prisma.trend.upsert({
        where: { unique_id: '0.0.15397475'},
        update: {},
        create: {
            unique_id: '0.0.15397475',
            rank: 1,
            type: 'token',
            batch_number: '123',
        },
    });

    const trend2 = await prisma.trend.upsert({
        where: { unique_id: '0.0.15397475.1'},
        update: {},
        create: {
            unique_id: '0.0.15397475.1',
            rank: 2,
            type: 'nft',
            batch_number: '123',
        },
    });

    const trend3 = await prisma.trend.upsert({
        where: { unique_id: '0.0.15397475.2'},
        update: {},
        create: {
            unique_id: '0.0.15397475.2',
            rank: 3,
            type: 'nft',
            batch_number: '123',
        },
    });

    const trend4 = await prisma.trend.upsert({
        where: { unique_id: '0.0.15397475.3'},
        update: {},
        create: {
            unique_id: '0.0.15397475.3',
            rank: 1,
            type: 'nft',
            batch_number: '123',
        },
    });
    return trend2;
}

module.exports = {
    analyticSeedFlow
}