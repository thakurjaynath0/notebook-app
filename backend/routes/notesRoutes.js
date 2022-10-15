const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const fetchuser = require('../middlewares/fetchuser');

const {createNote,getAllNotes,getNote,updateNote,deleteNote} = require('../controllers/notesController');

router.route('/')
.get(fetchuser, getAllNotes)
.post(fetchuser, [body('title').isLength({ min: 3 }), body('description').isLength({ min: 5 })], createNote);

router.route('/:id')
.get(fetchuser, getNote)
.patch(fetchuser, updateNote)
.delete(fetchuser, deleteNote);


module.exports = router;