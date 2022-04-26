const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NgoSchema = new Schema({
    username: String,
    ngo_name: String,
    about: String,
    email: String,
    link: String,
    street: String,
    additional: String, 
    zip: String,
    place: String,
    country: String, 
    code: String,
    phone: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    opportunities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Opportunity'
        }
    ]
});

module.exports = mongoose.model('Ngo', NgoSchema)