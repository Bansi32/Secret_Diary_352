const { noteSchema } = require('../joiSchema');
const ExpressError = require('../utils/ExpressError');
const Note = require('../models/note');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged In!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateNote = (req, res, next) => {
 
    const {error } =noteSchema.validate(req.body);
    if (error)
    {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg,400);
    }
    else {
        next();
    }
}
module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note.register.equals(req.user._id))
    {
        req.flash('error', 'you dont have permission!');
        return res.redirect(`/notes/${id}`);
    }
    next();
}
