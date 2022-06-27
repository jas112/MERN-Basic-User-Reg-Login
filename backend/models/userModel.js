const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add first name."]
    },
    lastName: {
        type: String,
        required: [true, "Please add last name."]
    },
    email: {
        type: String,
        required: [true, "Please add email."],
        unique: [true, "Email is not unique in our system."]
    },
    password: {
        type: String,
        required: [true, "Please add a password."]
    },

},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);

