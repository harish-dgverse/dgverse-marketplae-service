const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const userFlow2 = async () => {
    const socialMediaLinkBcci = [{
        media: 'insta',
        url: 'https://www.instagram.com/bcci.update/?hl=en'
    },
    {
        media: 'twitter',
        url: 'https://twitter.com/BCCI'
    },
    {
        media: 'fb',
        url: 'https://www.facebook.com/IndianCricketTeam'
    },
    {
        media: 'discord',
        url: 'https://discord.com/BCCI'
    },
    {
        media: 'yt',
        url: 'https://www.youtube.com/@bcciofficial'
    }];
    const additionalInfoCollection = [
        {
            attribute: 'Format',
            value: '50 over',
        },
        {
            attribute: 'Number of teams',
            value: '14',
        },
        {
            attribute: 'Winner',
            value: 'India',
        },
        {
            attribute: 'Runners Up',
            value: 'Sri Lanka',
        },
        {
            attribute: 'Semi finalists',
            value: 'Pakistan, New zealand',
        },
    ];
    const additionalInfoNftFinal = [
        {
            attribute: 'Venue',
            value: 'Wankhede Stadium, Mumbai',
        },
        {
            attribute: 'Winner',
            value: 'India',
        },
        {
            attribute: 'Opponents',
            value: 'Sri Lanka',
        },
        {
            attribute: 'Round',
            value: 'Final',
        },
        {
            attribute: 'Man of the match',
            value: 'MS Dhoni',
        },
    ];
    const additionalInfoNftQF = [
        {
            attribute: 'Venue',
            value: 'Narendra Modi Stadium A Ground, Ahmedabad',
        },
        {
            attribute: 'Winner',
            value: 'India',
        },
        {
            attribute: 'Opponents',
            value: 'Australia',
        },
        {
            attribute: 'Round',
            value: 'Quarter Final',
        },
        {
            attribute: 'Man of the match',
            value: 'Yuvraj Singh',
        },
    ];
    const additionalInfoNftSF = [
        {
            attribute: 'Venue',
            value: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
        },
        {
            attribute: 'Winner',
            value: 'India',
        },
        {
            attribute: 'Opponents',
            value: 'Pakistan',
        },
        {
            attribute: 'Round',
            value: 'Semi Final',
        },
        {
            attribute: 'Man of the match',
            value: 'Sachin Tendulkar',
        },
    ];
    const tagsCollection = [
        {
            tag: 'icc'
        }, {
            tag: 'bcci'
        }
        , {
            tag: 'india'
        }
        , {
            tag: '2011'
        }
    ];
    const tagsNFt1 = [
        {
            tag: 'msd'
        }, {
            tag: 'ms'
        }
        , {
            tag: 'dhoni'
        }
        , {
            tag: '2011'
        }, {
            tag: 'cricket'
        }, {
            tag: 'icc'
        }, {
            tag: 'india'
        }
    ];
    const tagsNFt2 = [
        {
            tag: 'yuvi'
        }, {
            tag: 'bcci'
        }
        , {
            tag: 'dhoni'
        }
        , {
            tag: '2011'
        }, {
            tag: 'cricket'
        }, {
            tag: 'icc'
        }, {
            tag: 'india'
        }
    ];
    const tagsNFt3 = [
        {
            tag: 'sachin'
        }, {
            tag: 'bcci'
        }
        , {
            tag: 'dhoni'
        }
        , {
            tag: '2011'
        }, {
            tag: 'cricket'
        }, {
            tag: 'icc'
        }, {
            tag: 'india'
        }
    ];
    const bcciWallet = '0.0.15397434';
    const mohanlalWallet = '0.0.15397435';
    const imagesBcci = { cover_pic: '7.jpeg', display_pic: '7.jpeg', icon: '7.jpeg', thumbnail: '7.jpeg' };
    const tokenId2011Collection = '0.0.15397475';
    const collection2011wc = { cover_pic: '0.0.15397475.jpeg', display_pic: '0.0.15397475.jpeg', icon: '0.0.15397475.jpeg', thumbnail: '0.0.15397475.jpeg' };
    const ftImages = { cover_pic: '0.0.33333.jpeg', display_pic: '0.0.33333.jpeg', icon: '0.0.33333.jpeg', thumbnail: '0.0.33333.jpeg' };
    const final2011 = { cover_pic: '0.0.15397475.1.jpeg', display_pic: '0.0.15397475.1.jpeg', icon: '0.0.15397475.1.jpeg', thumbnail: '0.0.15397475.1.jpeg' };
    const quarter2011 = { cover_pic: '0.0.15397475.2.jpeg', display_pic: '0.0.15397475.2.jpeg', icon: '0.0.15397475.2.jpeg', thumbnail: '0.0.15397475.2.jpeg' };
    const semi2011 = { cover_pic: '0.0.15397475.3.jpeg', display_pic: '0.0.15397475.3.jpeg', icon: '0.0.15397475.3.jpeg', thumbnail: '0.0.15397475.3.jpeg' };
    const mohanlalImage = { cover_pic: '20.jpeg', display_pic: '20.jpeg', icon: '20.jpeg', thumbnail: '20.jpeg' };
    const user_role = '1';

    const bcciSeed = await prisma.user.upsert({
        where: { user_id: 7 },
        update: {},
        create: {
            user_id: 7,
            user_name: 'BCCI',
            user_role: '1',
            subscriptionType: 'platinum',
            verified: 2,
            SocialMedia: {
                create: socialMediaLinkBcci
            },
            image: {
                create: imagesBcci,
            },
        },
    });

    const walletSeed1 = await prisma.wallet.upsert({
        where: { wallet_address: bcciWallet },
        update: {},
        create: {
            wallet_client: 'hashpack',
            wallet_address: bcciWallet,
            user_id: bcciSeed.user_id
        },
    });

    const mohanlalSeed = await prisma.user.upsert({
        where: { user_id: 20 },
        update: {},
        create: {
            user_id: 20,
            user_name: 'Mohanlal Viswanathan nair',
            user_role: '1',
            SocialMedia: {
                create: socialMediaLinkBcci
            },
            image: {
                create: mohanlalImage,
            },
        },
    });

    const mohanlalWalletSeed = await prisma.wallet.upsert({
        where: { wallet_address: mohanlalWallet },
        update: {},
        create: {
            wallet_client: 'hashpack',
            wallet_address: mohanlalWallet,
            user_id: mohanlalSeed.user_id
        },
    });

    const tokenSeed2011Collection = await prisma.token.upsert({
        where: { token_id: tokenId2011Collection },
        update: {},
        create: {
            token_id: tokenId2011Collection,
            treasury_account: bcciWallet,
            name: '2011 World Cup Moments',
            description: 'Collection of great moments from 2011 Indian world cup triumph',
            token_type: 'nft',
            token_category: 'Photography',
            private_key: true,
            kyc_key: true,
            admin_key: true,
            supply_key: true,
            symbol: null,
            wipe_key: true,
            freeze_key: true,
            pause_key: true,
            fee_schedule_key: true,
            total_supply: 3,
            max_supply: 100,
            social_media: {
                create: socialMediaLinkBcci
            },
            image: {
                create: collection2011wc,
            },
            wallet_id: walletSeed1.wallet_address,
            user_id: bcciSeed.user_id,
            additional_info: {
                create: additionalInfoCollection,
            },
            tags: {
                create: tagsCollection
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const nftSeedFinal = await prisma.NFT.upsert({
        where: { nft_id: '0.0.15397475.1' },
        update: {},
        create: {
            nft_id: '0.0.15397475.1',
            token_id: '0.0.15397475',
            wallet_address: bcciWallet,
            nft_name: 'Winning moment',
            description: 'World cup winning moments. Dhoni finishes off in style',
            user_id: bcciSeed.user_id,
            mintedBy: bcciSeed.user_id,
            serial_number: 1,
            social_media: {
                create: socialMediaLinkBcci
            },
            image: {
                create: final2011,
            },
            additional_info: {
                create: additionalInfoNftFinal,
            },
            tags: {
                create: tagsNFt1
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const nftSeedQF = await prisma.NFT.upsert({
        where: { nft_id: '0.0.15397475.2' },
        update: {},
        create: {
            nft_id: '0.0.15397475.2',
            token_id: '0.0.15397475',
            wallet_address: bcciWallet,
            nft_name: 'Yuvi chasing australia',
            description: 'india beating australia in a crucial match. Thanks to Yuvi\'s great knock',
            user_id: bcciSeed.user_id,
            mintedBy: bcciSeed.user_id,
            serial_number: 2,
            social_media: {
                create: socialMediaLinkBcci
            },
            image: {
                create: quarter2011,
            },
            additional_info: {
                create: additionalInfoNftQF,
            },
            tags: {
                create: tagsNFt2
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const nftSeedSF = await prisma.NFT.upsert({
        where: { nft_id: '0.0.15397475.3' },
        update: {},
        create: {
            nft_id: '0.0.15397475.3',
            token_id: '0.0.15397475',
            wallet_address: bcciWallet,
            nft_name: 'Beating pakistan',
            description: 'Sachin scoring 83 in first batting and getting reprieve 3 times',
            user_id: mohanlalSeed.user_id,
            mintedBy: bcciSeed.user_id,
            serial_number: 3,
            social_media: {
                create: socialMediaLinkBcci
            },
            image: {
                create: semi2011,
            },
            additional_info: {
                create: additionalInfoNftSF,
            },
            tags: {
                create: tagsNFt3
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const sbtTokenSeed = await prisma.token.upsert({
        where: { token_id: '0.0.11111' },
        update: {},
        create: {
            token_id: '0.0.11111',
            treasury_account: bcciWallet,
            name: 'CUSAT B Tech SBT',
            description: 'Certificates of B.Tech grads',
            token_type: 'sbt',
            token_category: 'Photography',
            private_key: true,
            kyc_key: true,
            admin_key: true,
            supply_key: true,
            symbol: null,
            wipe_key: true,
            freeze_key: true,
            pause_key: true,
            fee_schedule_key: true,
            total_supply: 3,
            max_supply: 100,
            social_media: {
                create: socialMediaLinkBcci
            },
            image: {
                create: { cover_pic: '0.0.11111.jpeg', display_pic: '0.0.11111.jpeg', icon: '0.0.11111.jpeg', thumbnail: '0.0.11111.jpeg' },
            },
            wallet_id: walletSeed1.wallet_address,
            user_id: bcciSeed.user_id,
            additional_info: {
                create: additionalInfoCollection,
            },
            tags: {
                create: tagsCollection
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const ftTokenSeed = await prisma.token.upsert({
        where: { token_id: '0.0.33333' },
        update: {},
        create: {
            token_id: '0.0.33333',
            treasury_account: bcciWallet,
            name: 'King of Kotha fans show',
            description: 'FDFS ticket for KOK fans show',
            token_type: 'ft',
            token_category: 'Photography',
            private_key: true,
            kyc_key: true,
            admin_key: true,
            supply_key: true,
            symbol: null,
            wipe_key: true,
            freeze_key: true,
            pause_key: true,
            fee_schedule_key: true,
            total_supply: 100,
            max_supply: 100,
            social_media: {
                create: socialMediaLinkBcci
            },
            image: {
                create: ftImages,
            },
            wallet_id: walletSeed1.wallet_address,
            user_id: bcciSeed.user_id,
            additional_info: {
                create: additionalInfoCollection,
            },
            tags: {
                create: tagsCollection
            },
        },
        include: {
            image: true,
            social_media: true
        }
    });

    const ftTokenSeedSt = await prisma.socialToken.upsert({
        where: { StId: 1 },
        update: {},
        create: {
            StId: 1,
            token_id: '0.0.33333',
            ownedByWalletId: bcciWallet,
            ownedBy: bcciSeed.user_id,
            volume: 100,
        },
    });

    const userView1 = await prisma.userView.upsert({
        where: { view_id: 1 },
        update: {},
        create: {
            view_id: 1,
            token_id: "0.0.15397475",
            user_id: mohanlalSeed.user_id,
        },
    });

    const userView2 = await prisma.userView.upsert({
        where: { view_id: 2 },
        update: {},
        create: {
            view_id: 2,
            token_id: "0.0.15397475",
            user_id: mohanlalSeed.user_id,
        },
    });

    const userlike1 = await prisma.UserLike.upsert({
        where: { like_id: 1 },
        update: {},
        create: {
            like_id: 1, // PK of this table
            token_id: "0.0.15397475",
            like: true,
            user_id: mohanlalSeed.user_id,
        },
    });

    const userlike2 = await prisma.UserLike.upsert({
        where: { like_id: 2 },
        update: {},
        create: {
            like_id: 2, // PK of this table
            nft_id: "0.0.15397475.1",
            like: true,
            user_id: mohanlalSeed.user_id,
        },
    });

    const usershare = await prisma.UserShare.upsert({
        where: { share_id: 1 },
        update: {},
        create: {
            share_id: 1, // PK of this table
            token_id: "0.0.15397475",
            media: "whatsapp",
            user_id: mohanlalSeed.user_id,
        },
    });

    const usershare2 = await prisma.UserShare.upsert({
        where: { share_id: 2 },
        update: {},
        create: {
            share_id: 2, // PK of this table
            nft_id: "0.0.15397475.1",
            media: "whatsapp",
            user_id: mohanlalSeed.user_id,
        },
    });

    const userFav = await prisma.favorites.upsert({
        where: { favorites_id: 1 },
        update: {},
        create: {
            favorites_id: 1, // PK of this table
            nft_id: "0.0.15397475.1",
            user_id: mohanlalSeed.user_id,
        },
    });

    const userFav2 = await prisma.favorites.upsert({
        where: { favorites_id: 2 },
        update: {},
        create: {
            favorites_id: 2, // PK of this table
            token_id: "0.0.15397475",
            user_id: mohanlalSeed.user_id,
        },
    });

    const userFollowing = await prisma.followings.upsert({
        where: { followings_id: 1 },
        update: {},
        create: {
            followings_id: 1, // PK of this table
            following_user_id: 7,
            user_id: mohanlalSeed.user_id,
        }
    });

    const notification1 = await prisma.notifications.upsert({
        where: { ntfcn_id: 1 },
        update: {},
        create: {
            ntfcn_id: 1, // PK of this table
            identifier: "0.0.15397475",
            type: "token",
            message: "Mohanlal Viswanathan nair have wishlisted 2011 World Cup Moments",
            user_id: bcciSeed.user_id,
        },
    });

    const notification2 = await prisma.notifications.upsert({
        where: { ntfcn_id: 2 },
        update: {},
        create: {
            ntfcn_id: 2, // PK of this table
            identifier: "0.0.15397475",
            type: "token",
            message: "Mohanlal Viswanathan nair have liked 2011 World Cup Moments",
            user_id: bcciSeed.user_id,
        },
    });

    const notification3 = await prisma.notifications.upsert({
        where: { ntfcn_id: 3 },
        update: {},
        create: {
            ntfcn_id: 3, // PK of this table
            identifier: "20",
            type: "token",
            message: "Mohanlal Viswanathan nair have started following you",
            user_id: bcciSeed.user_id,
        },
    });
    return nftSeedFinal;
}

module.exports = {
    userFlow2
}