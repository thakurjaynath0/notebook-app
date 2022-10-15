const mongoose =  require('mongoose');

const NotesSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide title']
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
        unique: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

module.exports = mongoose.model('Notes', NotesSchema);