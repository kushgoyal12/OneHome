const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

const catchAsync = require('../utilities/catchAsync');
const Volunteer = require("../models/volunteer")
const Opportunity = require("../models/opportunity");

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const opportunities = await Opportunity.find({});
    // console.log(opportunity);
    res.render('volunteers/home', { opportunities })
}))

router.get('/opportunity/:id', isLoggedIn, catchAsync(async (req, res) => {
    const opportunity = await Opportunity.findById(req.params.id);
    res.render()
}))

router.get('/v', (req, res) => {
    res.render('volunteers/base')
})

router.get('/login', (req, res) => {
    res.render('volunteers/login')
})

router.get('/register', (req, res) => {
    res.render('volunteers/register')
})

router.get('/profile', isLoggedIn, catchAsync(async(req, res) => {
    const id = req.user._id;
    let volunteer = await Volunteer.find({"author" : id});
    volunteer = volunteer[0];
    res.render('volunteers/profile', {volunteer});
}))

router.put('/', isLoggedIn, catchAsync(async(req, res) => {
    const id = req.user._id;
    let v = await Volunteer.find({"author" : id});
    v = v[0];
    const vid = v._id;
    const volunteer = await Volunteer.findByIdAndUpdate(vid, req.body, { runValidators: true, new: true });
    res.redirect('/volunteer');
}))

module.exports = router;