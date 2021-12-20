const Register= require("../models/register");

module.exports.renderRegister = (req, res) => {
    res.render("register");
};

module.exports.register = async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;
        const user = new Register({ name, username, email, password });   
        const registeredUser = await Register.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
           
            req.flash('success', 'Welcome To Secreto Notes App!');
            res.redirect('/notes');
           
        });
        
        //res.status(201).render("login");
    } catch (e) {
        req.flash('error', e.message);
        res.status(400).redirect('/register');
    }
};
module.exports.renderLogin = (req, res) => {
    res.render("login");
};
module.exports.login = async (req, res, next) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/notes';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "You're logged out!");
    res.redirect('/login');
};