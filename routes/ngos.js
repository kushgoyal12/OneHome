const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');

const catchAsync = require('../utilities/catchAsync');
const Ngo = require("../models/ngo")

router.get('/v', (req, res) => {
    res.render('ngos/base')
})

router.get('/login', (req, res) => {
    res.render('ngos/login')
})

router.get('/register', (req, res) => {
    res.render('ngos/register')
})

router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    res.render('ngos/home')
}))

module.exports = router;