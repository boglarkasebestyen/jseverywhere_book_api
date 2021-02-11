// Importing our note model (note.js) and adding it to a models object to be exported

const Note = require('./note')
const User = require('./user')

const models = {
    Note,
    User
}

module.exports = models

