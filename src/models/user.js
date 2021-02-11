// a Mongoose schema file; the user database model

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: {unique: true}
        },
        email: {
            type: String,
            required: true,
            index: {unique: true}
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
    {
        //Assigns createdAt and updatedAt fields with a Data type 
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema)
module.exports = User