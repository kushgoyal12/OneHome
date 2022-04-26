const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
    oname: String,
    title: String,
    category: String,
    location: String,
    link: String,
    sdate: String,
    edate: String,
    aboutNgo: String, 
    aboutOpp: String,
    requirements: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Ngo'
    }
});

module.exports = mongoose.model('Opportunity', opportunitySchema)