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
            volunteer.username = req.body.username;
            volunteer.save();
            req.flash('success', 'Welcome to One Home!');
            res.redirect(`/home`);
        } else {
            const ngo = new Ngo();
            ngo.author = req.user._id;
            ngo.username = req.body.username;
            ngo.save();
            req.flash('success', 'Welcome to One Home!');
            res.redirect(`/home`);
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
    const { entity } = req.params;
    let url = '';
    const username = req.body.username;
    if(entity === "volunteer") {
         Volunteer.find({"username" : username}, (err, blog) => {
            if (err || blog.length === 0) {
                url = `/${entity}/login`;
            } else {
                url = '/volunteer';
            }
        
            const redirectUrl = req.session.returnTo || url;
            console.log(redirectUrl);
            delete req.session.returnTo;
            res.redirect(redirectUrl);
        });
    } else {
        Ngo.find({"username" : username}, (err, blog) => {  
            if (err || blog.length === 0) {
                url = `/${entity}/login`;
            } else {
                url = '/ngo';
            }
            const redirectUrl = req.session.returnTo || url;
            console.log(redirectUrl);v
            delete req.session.returnTo;
            res.redirect(redirectUrl);
        
        });
    }
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/home');
})

module.exports = router;