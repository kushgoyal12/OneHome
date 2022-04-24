const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utilities/catchAsync');
const User = require('../models/user');
const Volunteer = require('../models/volunteer');
const Ngo = require('../models/ngo');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/:entity/register', catchAsync(async (req, res, next) => {
    try {
    const { email, username, password } = req.body;
    const { entity } = req.params;
    // console.log(entity);
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err);
        if(entity === "volunteer") {
            const volunteer = new Volunteer();
            volunteer.author = req.user._id;
            volunteer.save();
            req.flash('success', 'Welcome to One Home!');
            res.redirect(`/volunteer`);
        } else {
            const ngo = new Ngo();
            ngo.author = req.user._id;
            ngo.save();
            req.flash('success', 'Welcome to One Home!');
            res.render('ngos/home');
        }
    })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/:entity/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back!');
    const user = req.body.username;
    console.log(user);
    const redirectUrl = req.session.returnTo || '/volunteer';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/home');
})

module.exports = router;