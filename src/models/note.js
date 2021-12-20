const mongoose = require('mongoose');
require("mongoose-type-url");
const NoteSchema = new mongoose.Schema({
   title:{
       type: String,
       required: true,
       unique:true
    },
    content: {
        type: String,
        required:true
    },
    image: {
        type: mongoose.SchemaTypes.Url,
        required:true
    },
    register: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Register'
    }

});

//create collections
const Note = new mongoose.model("Note", NoteSchema);
module.exports =  Note ;
