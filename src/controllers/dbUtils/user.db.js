const userFields = {
  user_id: true,
  user_name: true,
  subscriptionType: true,
  verified: true,
  user_role: true,
  timestamp: true,
  Wallet: {
    select: {
      wallet_address: true,
    },
  },
  SocialMedia: {
    select: {
      media: true,
      url: true,
    },
  },
  image: {
    select: {
      icon: true,
      cover_pic: true,
      display_pic: true,
      thumbnail: true,
    },
  },
  _count: {
    select: { userFollowers: true, Token: true, nft: true, UserView: true },
  },
};

const collectionsOwnedFields = {
  name: true,
  total_supply: true,
  timestamp: true,
  token_id: true,
  token_type: true,
  wallet: {
    select: {
      wallet_address: true,
      wallet_client: true,
    },
  },
  image: {
    select: {
      display_pic: true,
    },
  },
  user: {
    select: {
      user_name: true,
      subscriptionType: true,
      verified: true,
      user_id: true,
      image: {
        select: {
          icon: true
        }
      }
    }
  },
  Sale: {
    where: { status: 'ON_GOING' },
    select: {
      quotedPrice: true,
      saleId: true,
      sellerId: true,
      volume: true,
    },
  }
};

const nftOwnedFields = {
  nft_name: true,
  nft_id: true,
  status: true,
  timestamp: true,
  token: {
    select: {
      token_id: true,
      token_type: true,
      name: true,
    },
  },
  wallet: {
    select: {
      wallet_address: true,
      wallet_client: true,
    },
  },
  image: {
    select: {
      display_pic: true,
    },
  },
  user: {
    select: {
      user_name: true,
      subscriptionType: true,
      verified: true,
      user_id: true,
      image: {
        select: {
          icon: true
        }
      }
    }
  },
  Sale: {
    where: { status: 'ON_GOING' },
    select: {
      quotedPrice: true,
      saleId: true,
      sellerId: true,
    }
  }
};


const nftOnSaleFields = {
  saleMode: true,
  quotedPrice: true,
  expiresAt: true,
  timestamp: true,
  NFT: {
    select: {
      nft_id: true,
      nft_name: true,
      image: {
        select: {
          icon: true
        }
      },
      token: {
        select: {
          token_id: true,
          name: true
        }
      },
    }
  }
};

const completedSaleFields = {
  saleMode: true,
  quotedPrice: true,
  expiresAt: true,
  timestamp: true,
  volume: true,
  NFT: {
    select: {
      nft_id: true,
      nft_name: true,
      image: {
        select: {
          icon: true
        }
      },
      token: {
        select: {
          token_id: true,
          name: true
        }
      },
    }
  },
  token: {
    select: {
      token_id: true,
      name: true,
      symbol: true,
    }
  },
  userBuyer: true,
  userSeller: true,
};

const nftMintedFields = {
  nft_id: true,
  nft_name: true,
  image: {
    select: {
      icon: true
    }
  },
  token: {
    select: {
      token_id: true,
      name: true,
      user: {
        select: {
          user_name: true, 
          subscriptionType: true,
          verified: true,
          user_id: true,
        }
      }
    }
  },
};

const onSalePrimaryDetails = {
  saleMode: true,
  saleId: true,
  quotedPrice: true,
  expiresAt: true,
  timestamp: true,
};

const nftFields = {
  nft_id: true,
  nft_name: true,
  image: {
    select: {
      thumbnail: true
    }
  },
}

const nftOnSaleActionFields = {
  ...onSalePrimaryDetails,
  NFT: {
    select: nftFields,
  }
}

module.exports = {
  userFields,
  collectionsOwnedFields,
  nftOwnedFields,
  nftOnSaleFields,
  nftOnSaleActionFields,
  completedSaleFields,
  nftMintedFields,
};
