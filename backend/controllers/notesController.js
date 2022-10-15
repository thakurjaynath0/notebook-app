const Notes = require('../models/Notes');
const {StatusCodes} = require('http-status-codes');
const { validationResult } = require('express-validator');



const createNote = async(req, res) => {
 const {title, description, tag} = req.body;

 const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
 }

 try {
    const note = await Notes.create({title, description, tag, user:req.user.userId});
    res.status(StatusCodes.OK).json(note)
 } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
 }

}

const getAllNotes = async(req, res) => {

    try {
        const notes = await Notes.find({user: req.user.userId});
        if(!notes){
            return res.status(StatusCodes.NOT_FOUND).send('No notes found');
        }
       
        res.status(StatusCodes.OK).json(notes);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
}    


const getNote = async(req, res) => {
    const {id} = req.params;

    try {
        const note = await Notes.findOne({_id:id, user: req.user.userId});
        if(!note){
            return res.status(StatusCodes.NOT_FOUND).send('No notes found');
        }
        res.status(StatusCodes.OK).json(note);
        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
}


const updateNote = async(req, res) => {
    const {id} = req.params;
    const {title, description, tag} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    try {
        const note = await Notes.findOneAndUpdate({_id: id, user: req.user.userId}, {
            title, description, tag, user: req.user.userId
        }, {runValidators: true, new: true});

        if(!note){
            return res.status(StatusCodes.NOT_FOUND).send('No notes found');
        }

        res.status(StatusCodes.OK).json(note)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
}


const deleteNote = async(req, res) => {
    const {id} = req.params;

    try {
        const note = await Notes.findOneAndDelete({_id: id, user: req.user.userId});
        if(!note){
            return res.status(StatusCodes.NOT_FOUND).send('No notes found');
        }

        res.status(StatusCodes.OK).send('Deleted successfully');
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
    }
}


module.exports = {
    createNote,
    getAllNotes,
    getNote,
    updateNote,
    deleteNote
}