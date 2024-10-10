const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const moment = require('moment');

const userFlow1 = async () => {
    const socialMedia1Link = [{
        media: 'insta',
        url: 'user 1'
    }];
    const socialMedia2Link = [{
        media: 'insta',
        url: 'user 1'
    }, {
        media: 'twitter',
        url: 'twitter 2'
    }];
    const user1Seed = await prisma.user.upsert({
        where: { user_id: 1 },
        update: {},
        create: {
            user_name: 'dg user 1',
            user_role: '1',
            subscriptionType: 'platinum',
            verified: 2,
            SocialMedia: {
                create: [{
                    media: 'insta',
                    url: 'user 1'
                }
                ]
            },
            image: {
                create: { cover_pic: 'user 1.png', display_pic: 'user 1.png', icon: 'user 1.png', thumbnail: 'user 1.png' },
            },
        },
    });

    const user2Seed = await prisma.user.upsert({
        where: { user_id: 2 },
        update: {},
        create: {
            user_name: 'Space Grotesk',
            user_role: '1',
            SocialMedia: {
                create: socialMedia2Link
            },
            image: {
                create: { cover_pic: 'user 2.png', display_pic: 'user 2.png', icon: 'user 2.png', thumbnail: 'user 2.png' },
            },
        },
    });

    const user3Seed = await prisma.user.upsert({
        where: { user_id: 3 },
        update: {},
        create: {
            user_name: 'Cyber Punk',
            user_role: '1',
            SocialMedia: {
                create: socialMedia1Link
            },
            image: {
                create: { cover_pic: 'user 3.png', display_pic: 'user 3.png', icon: 'user 3.png', thumbnail: 'user 3.png' },
            },
        },
    });

    const user4Seed = await prisma.user.upsert({
        where: { user_id: 4 },
        update: {},
        create: {
            user_name: 'John Connor',
            user_role: '1',
            SocialMedia: {
                create: socialMedia2Link
            },
            image: {
                create: { cover_pic: 'user 4.png', display_pic: 'user 4.png', icon: 'user 4.png', thumbnail: 'user 4.png' },
            },
        },
    });

    const walletSeed1 = await prisma.wallet.upsert({
        where: { wallet_address: '0.0.47694621' },
        update: {},
        create: {
            wallet_client: 'hashpack',
            wallet_address: '0.0.47694621',
            user_id: user1Seed.user_id
        },
    });

    const walletSeed2 = await prisma.wallet.upsert({
        where: { wallet_address: '0.0.47694622' },
        update: {},
        create: {
            wallet_client: 'hashpack',
            wallet_address: '0.0.47694622',
            user_id: user2Seed.user_id
        },
    });

    const walletSeed3 = await prisma.wallet.upsert({
        where: { wallet_address: '0.0.47694623' },
        update: {},
        create: {
            wallet_client: 'hashpack',
            wallet_address: '0.0.47694623',
            user_id: user3Seed.user_id
        },
    });

    const walletSeed4 = await prisma.wallet.upsert({
        where: { wallet_address: '0.0.47694624' },
        update: {},
        create: {
            wallet_client: 'hashpack',
            wallet_address: '0.0.47694624',
            user_id: user4Seed.user_id
        },
    });

    const tokenSeed1 = await prisma.token.upsert({
        where: { token_id: '0.0.47694636' },
        update: {},
        create: {
            token_id: '0.0.47694636',
            name: 'Collection of antartica',
            token_type: 'nft',
            private_key: true,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { cover_pic: 'token cp 1.png', display_pic: 'token 1.png', icon: 'token 1.png', thumbnail: 'token 1.png' },
            },
            wallet_id: walletSeed1.wallet_address,
            user_id: user1Seed.user_id,
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const tokenSeed2 = await prisma.token.upsert({
        where: { token_id: '0.0.47694637' },
        update: {},
        create: {
            token_id: '0.0.47694637',
            name: 'All Ape Kind',
            token_type: 'nft',
            private_key: true,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { cover_pic: 'token 2 cp.png', display_pic: 'token 2.png', icon: 'token 2.png', thumbnail: 'token 2.png' },
            },
            wallet_id: walletSeed1.wallet_address,
            user_id: user1Seed.user_id,
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const tokenSeed3 = await prisma.token.upsert({
        where: { token_id: '0.0.47694638' },
        update: {},
        create: {
            token_id: '0.0.47694638',
            name: 'Acrocalypse',
            token_type: 'nft',
            private_key: true,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { cover_pic: 'token 3 cp.png', display_pic: 'token 3 dp.png', icon: 'token 3 dp.png', thumbnail: 'token 3 dp.png' },
            },
            wallet_id: walletSeed1.wallet_address,
            user_id: user1Seed.user_id,
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const tokenSeed4 = await prisma.token.upsert({
        where: { token_id: '0.0.47694639' },
        update: {},
        create: {
            token_id: '0.0.47694639',
            name: 'Touken you',
            token_type: 'nft',
            private_key: true,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { cover_pic: 'token 4 cp.png', display_pic: 'token 4 dp.png', icon: 'token 4 dp.png', thumbnail: 'token 4 dp.png' },
            },
            wallet_id: walletSeed4.wallet_address,
            user_id: user4Seed.user_id,
        },
        include: {
            image: true,
            social_media: true
        }
    });
    const userRelationToTokenSeed = await prisma.UserRelationToToken.upsert({
        where: { token_id_wallet_address: { token_id: '0.0.47694636', wallet_address: walletSeed4.wallet_address } },
        update: {},
        create: {
            token_id: '0.0.47694636',
            wallet_address: walletSeed4.wallet_address,
            user_id: user1Seed.user_id,
            kyc_status: true
        },
    });

    const nftSeed1_1_image = "nft 1.1.png";
    const nftSeed2_1_image = "nft 2.1.png";
    const nftSeed3_1_image = "nft 3.1.png";
    const nftSeed3_2_image = "nft 3.2.png";
    const nftSeed3_3_image = "nft 3.3.png";
    const nftSeed4_1_image = "nft 4.1.png";
    const nftSeed1_1 = await prisma.NFT.upsert({
        where: { nft_id: '0.0.47694636.1' },
        update: {},
        create: {
            nft_id: '0.0.47694636.1',
            token_id: '0.0.47694636',
            wallet_address: '0.0.47694621',
            nft_name: 'Antartican ice',
            user_id: user1Seed.user_id,
            mintedByUser: user1Seed.user_id,
            serial_number: 1,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { display_pic: nftSeed1_1_image, icon: nftSeed1_1_image, thumbnail: nftSeed1_1_image },
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });


    const nftSeed2_1 = await prisma.NFT.upsert({
        where: { nft_id: '0.0.47694637.1' },
        update: {},
        create: {
            nft_id: '0.0.47694637.1',
            token_id: '0.0.47694637',
            wallet_address: '0.0.47694622',
            nft_name: 'Ape man',
            user_id: user1Seed.user_id,
            mintedByUser: user1Seed.user_id,
            serial_number: 1,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { display_pic: nftSeed2_1_image, icon: nftSeed2_1_image, thumbnail: nftSeed2_1_image },
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const nftSeed3_1 = await prisma.NFT.upsert({
        where: { nft_id: '0.0.47694638.1' },
        update: {},
        create: {
            nft_id: '0.0.47694638.1',
            token_id: '0.0.47694638',
            wallet_address: '0.0.47694623',
            nft_name: 'Crocodile #1',
            user_id: user1Seed.user_id,
            mintedByUser: user1Seed.user_id,
            serial_number: 1,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { display_pic: nftSeed3_1_image, icon: nftSeed3_1_image, thumbnail: nftSeed3_1_image },
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const nftSeed3_2 = await prisma.NFT.upsert({
        where: { nft_id: '0.0.47694638.2' },
        update: {},
        create: {
            nft_id: '0.0.47694638.2',
            token_id: '0.0.47694638',
            wallet_address: '0.0.47694623',
            nft_name: 'Crocodile #2',
            user_id: user1Seed.user_id,
            mintedByUser: user1Seed.user_id,
            serial_number: 2,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { display_pic: nftSeed3_2_image, icon: nftSeed3_2_image, thumbnail: nftSeed3_2_image },
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const nftSeed3_3 = await prisma.NFT.upsert({
        where: { nft_id: '0.0.47694638.3' },
        update: {},
        create: {
            nft_id: '0.0.47694638.3',
            token_id: '0.0.47694638',
            wallet_address: '0.0.47694623',
            nft_name: 'Crocodile #3',
            user_id: user1Seed.user_id,
            mintedByUser: user1Seed.user_id,
            serial_number: 1,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { display_pic: nftSeed3_3_image, icon: nftSeed3_3_image, thumbnail: nftSeed3_3_image },
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const nftSeed4_1 = await prisma.NFT.upsert({
        where: { nft_id: '0.0.47694639.1' },
        update: {},
        create: {
            nft_id: '0.0.47694639.1',
            token_id: '0.0.47694639',
            wallet_address: '0.0.47694624',
            nft_name: 'Anima',
            user_id: user4Seed.user_id,
            mintedByUser: user4Seed.user_id,
            serial_number: 1,
            social_media: {
                create: [{
                    media: 'insta',
                    url: 'xfdcgv'
                }, {
                    media: 'fb',
                    url: 'fb link'
                }]
            },
            image: {
                create: { display_pic: nftSeed4_1_image, icon: nftSeed4_1_image, thumbnail: nftSeed4_1_image },
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const userlike1 = await prisma.UserLike.upsert({
        where: { like_id: 1 },
        update: {},
        create: {
            like_id: 1, // PK of this table
            token_id: "0.0.47694636",
            like: true,
            user_id: user1Seed.user_id,
        },
    });

    const userlike2 = await prisma.UserLike.upsert({
        where: { like_id: 2 },
        update: {},
        create: {
            like_id: 2, // PK of this table
            token_id: "0.0.47694636",
            like: true,
            user_id: user2Seed.user_id,
        },
    });

    const usershare = await prisma.UserShare.upsert({
        where: { share_id: 1 },
        update: {},
        create: {
            share_id: 1, // PK of this table
            nft_id: "0.0.47694636.1",
            media: "insta",
            user_id: user1Seed.user_id,
        },
    });

    const usershare2 = await prisma.UserShare.upsert({
        where: { share_id: 2 },
        update: {},
        create: {
            share_id: 2, // PK of this table
            nft_id: "0.0.47694636.1",
            media: "insta",
            user_id: user2Seed.user_id,
        },
    });

    const notification1 = await prisma.notifications.upsert({
        where: { ntfcn_id: 1 },
        update: {},
        create: {
            ntfcn_id: 1, // PK of this table
            identifier: "2",
            type: "user",
            message: "X_user have wishlisted NFT_Name",
            user_id: user1Seed.user_id,
        },
    });

    const notification2 = await prisma.notifications.upsert({
        where: { ntfcn_id: 2 },
        update: {},
        create: {
            ntfcn_id: 2, // PK of this table
            identifier: "0.0.47694636.1",
            type: "nft",
            message: "X_User have made a bid of x hbar for NFT_Name",
            user_id: user2Seed.user_id,
        },
    });
    return 'usershare';
}

module.exports = {
    userFlow1
}