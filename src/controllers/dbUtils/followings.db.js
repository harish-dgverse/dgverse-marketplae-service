const followingUserFields = {
  FollowingUser: {
    select: {
      user_id: true,
      user_name: true,
      subscriptionType: true,
      verified: true,
      Wallet: true,
      image: true,
    },
  },
  timestamp: true,
};

const followedUserFields = {
  User: {
    select: {
      user_id: true,
      user_name: true,
      subscriptionType: true,
      verified: true,
      Wallet: true,
      image: true,
    },
  },
  timestamp: true,
};

module.exports = {
  followingUserFields,
  followedUserFields,
};
