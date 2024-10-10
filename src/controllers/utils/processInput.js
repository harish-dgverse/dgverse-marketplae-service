const processTags = (tags) => {
    if (!tags) 
        return [];
    const tagArray = tags.trim().split(' ').filter(x => x[0] === '#' && x.length > 2).map(x => {
        return {
            tag: x.slice(1)
        }
    });
    return tagArray;
}

module.exports = {
    processTags,
}