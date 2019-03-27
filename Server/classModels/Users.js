const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    notes: {
        type: String
    },
    userImagaPath: {
        type: String,
        default: null
    },
    userImagaPathAlt: {
        type: String,
        default: null
    },
    filePathNode :{
        type: Array,
        default: null
    },
    isAdmin: {
        type: Boolean,
        defualt: false
    }
})

module.exports = mongoose.model('admins', userSchema);