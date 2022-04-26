const express = require('express');
const router = express.Router({mergeParams: true});
const { isLoggedIn } = require('../middleware');

const catchAsync = require('../utilities/catchAsync');
const Opportunity = require("../models/opportunity");
const Ngo = require("../models/ngo")

router.post('/add', isLoggedIn, catchAsync(async(req, res) => {
    const id = req.user._id;
    let n = await Ngo.find({"author" : id});
    n = n[0];
    const ngoId = n._id;
    const ngo = await Ngo.findById(ngoId);
    const opportunity = new Opportunity(req.body);
    ngo.opportunities.push(opportunity);
    await ngo.save();
    await opportunity.save();
    // req.flash('success', 'Created new review!');
    res.redirect('/ngo/opportunity')
}))

module.exports = router;