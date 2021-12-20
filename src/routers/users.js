const express = require("express");
const router = new express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),catchAsync(users.login
))

router.get('/logout', users.logout);

//about page
router.get("/about", (req, res) => {
    res.render("about");
});

module.exports = router;