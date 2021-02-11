// Require the mongoose library
const mongoose = require('mongoose')

// Our Mongoose schema
// Define the note's database schema
const noteSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        //add the favoriteCount property
        favoriteCount: {
            type: Number,
            default: 0
        },
        //add the favoritedBy property
        favoritedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // Asigns createdAt and updatedAt fields with a Date type 
        timestamps: true
    }
)

// Define the 'Note' model with the schema
const Note = mongoose.model('Note', noteSchema)

// Export the module
module.exports = Note 

