const express = require('express');
const router = express.Router();

const catchAsync = require('../utilities/catchAsync');
const Volunteer = require("../models/volunteer")

router.get('/v', (req, res) => {
    res.render('volunteers/base')
})

router.get('/login', (req, res) => {
    res.render('volunteers/login')
})

router.get('/', catchAsync(async (req, res) => {
    res.render('volunteers/home')
}))

module.exports = router;