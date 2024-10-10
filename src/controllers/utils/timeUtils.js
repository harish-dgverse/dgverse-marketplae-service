const getConditionXDaysBefore = (numOfDays) => {
    const currentTime = new Date();
    const ISTOffset = 330;   // IST offset UTC +5:30 
    const ISTTime = new Date(currentTime.getTime() + (ISTOffset)*60000);
    const daysAgo = new Date(ISTTime.getTime());
    daysAgo.setDate(ISTTime.getDate() - numOfDays);

    return {
        lte: ISTTime,
        gte: daysAgo,
    };
}

module.exports = {
    getConditionXDaysBefore
}