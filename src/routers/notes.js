const express = require("express");
const router = new express.Router();
const notes = require('../controllers/notes');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn ,validateNote,isAuthor} = require('../middlewares/middleware');

// router.get('/makenotes', async (req, res) => {
//         const note =  new Note({ title:"Tussi great ho", content:"Bake Bale startup",image:"https://t.ly/V42J"});
//         await note.save();
//         res.send(note);
// });
router.route('/')
    .get(isLoggedIn, catchAsync(notes.index))
    .post(isLoggedIn, validateNote, catchAsync(notes.createNote))

router.get('/add', isLoggedIn,notes.renderNewForm);    

router.route('/:id')
    .get(isLoggedIn,isAuthor,catchAsync(notes.showNote))
    .put(isLoggedIn,isAuthor, validateNote, catchAsync(notes.showEditNote))
    .delete(isLoggedIn,isAuthor, catchAsync(notes.deleteNote))


router.get("/:id/edit", isLoggedIn,isAuthor, catchAsync(notes.renderEditForm));

module.exports = router;