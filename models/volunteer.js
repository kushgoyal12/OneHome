const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    gender: String,
    dob: Date,
    about: String,
    experience: String,
    profession: String,
    skills: String, 
    street: String,
    additional: String, 
    zip: String,
    place: String,
    country: String, 
    code: String,
    phone: String,
    email: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);