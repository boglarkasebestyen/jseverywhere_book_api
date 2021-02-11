module.exports = {
    //resolve the author info for a note when requested
    author: async (note, args, {models}) => {
        return await models.User.findById(note.author)
    },
    //resolve the favoritedBy info for a note when requested
    favoritedBy: async (note, args, {models}) => {
        return await models.User.find({_id: {$in: note.favoritedBy}})
    }
}