
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });



const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
