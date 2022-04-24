const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NgoSchema = new Schema({
    username: String,
    location: String,
    about: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Ngo', NgoSchema)