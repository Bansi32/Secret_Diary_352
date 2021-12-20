const Note = require('../models/note');

module.exports.index = async (req, res) => {
    const note = await Note.find({ register: req.user._id });
    const user = await req.user.name;
    res.render("notes/diary", { note ,user});
};

module.exports.renderNewForm = async (req, res) => {
    const user = await req.user.name;
    res.render('notes/add',{user});
};
module.exports.createNote=async (req, res) => {
    // if (!req.body.note) {
    //     throw new ExpressError('Invalid Notes Data',400)//incomplete data form client side;
    //     }
    const note = new Note(req.body.note);
     note.register = req.user._id;
    const userNote = await note.save();

        req.flash('success', 'Successfully made a new note');
    res.redirect(`/notes/${userNote._id}`);
    //console.log(req.body);
};

module.exports.showNote= async (req, res) => {
    const { id } = req.params;
    
    const note = await Note.findById(id).populate('register');
    //console.log(note);
    if (!note) {
        req.flash('error', 'Note not found!');
        return redirect('./notes');
    }
    const user = await req.user.name;
    res.render('notes/show', { note,user });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
        req.flash('error', 'Note not found!');
        return redirect('./notes');
    }
    const user = await req.user.name;
    res.render('notes/edit', { note,user });
};

module.exports.showEditNote = async (req, res) => {
    const { id } = req.params;
    const note = await Note.findByIdAndUpdate(id, { ...req.body.note });

    req.flash('success', "Successfully updated note");
    res.redirect(`/notes/${note._id}`);
};

module.exports.deleteNote=async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
 
    req.flash('success', "Successfully deleted note");
    res.redirect('/notes');
}