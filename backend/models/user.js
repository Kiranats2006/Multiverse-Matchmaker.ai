// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: "" // store URL later (Cloudinary, S3, etc.)
    },
    interests: {
        type: [String],
        default: []
    },
    firstLogin: {
  type: Boolean,
  default: true
}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
