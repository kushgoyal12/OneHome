const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

const catchAsync = require('../utilities/catchAsync');
const Volunteer = require("../models/volunteer")

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    res.render('volunteers/home')
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