const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
    category: String,
    link: String,
    sdate: Date,
    eDate: Date,
    aboutNgo: String, 
    aboutopp: String,
    requirements: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Ngo'
    }
});

module.exports = mongoose.model('Opportunity', opportunitySchema)