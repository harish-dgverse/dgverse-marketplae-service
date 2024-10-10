# Trend/Leaderboard

3 table records are created for handling trend.

1. trend/leaderboard
    Trend/leaderboard main table, updated periodically and ranked each entry.

2. trend_registry
    Updated periodically, and taken for combination of tokenId/nftId/user and sum of weight

3. trend_history
    Every eligible transactions in trend registry is recorded in history table with timestamp and their assigned weight.

    Eligible transactions: 
    - like
    - views
    - share
    - follow
    - mint
    - create
    - wishlist
    - transfer

## Add trend

For every new born record, trend hisotry will be created. 
    Eligible transactions: 
    - like
    - views
    - share
    - follow
    - mint
    - create
    - wishlist
    - transfer

## Reset trend

Taking records from history grouped by token/nft/user and summed the weights

## Get trend

Getting trend from trend main table.