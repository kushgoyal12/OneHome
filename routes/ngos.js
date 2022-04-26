const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

const catchAsync = require('../utilities/catchAsync');
const Ngo = require("../models/ngo")

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    res.render('ngos/home')
}))

router.get('/v', (req, res) => {
    res.render('ngos/base')
})

router.get('/login', (req, res) => {
    res.render('ngos/login')
})

router.get('/register', (req, res) => {
    res.render('ngos/register')
})

router.get('/profile', isLoggedIn, catchAsync(async(req, res) => {
    const id = req.user._id;
    let ngo = await Ngo.find({"author" : id});
    ngo = ngo[0];
    res.render('ngos/profile', {ngo});
}))

router.put('/', isLoggedIn, catchAsync(async(req, res) => {
    const id = req.user._id;
    let v = await Ngo.find({"author" : id});
    v = v[0];
    const vid = v._id;
    const ngo = await Ngo.findByIdAndUpdate(vid, req.body, { runValidators: true, new: true });
    res.redirect('/ngo');
}))

router.get('/opportunity', isLoggedIn, catchAsync(async(req, res) => {
    const id = req.user._id;
    let n = await Ngo.find({"author" : id});
    n = n[0];
    const ngoId = n._id;
    // const ngo = await Ngo.findById(ngoId);
    // console.log(ngo);
    const ngo = await Ngo.findById(ngoId).populate('opportunities');
    res.render('ngos/opportunity', { ngo });
}))

router.get('/opportunity/add', isLoggedIn, catchAsync(async(req, res) => {
    res.render('ngos/addOpportunity');
}))


module.exports = router;