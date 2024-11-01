
const mongoose = require('mongoose');


const subSchema = new mongoose.Schema({
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
  plan: {
    type: String,
    required: true,
    default: 'Not Subscribed',
  },
}, { timestamps: true });



const SubscriberModel = mongoose.model('Subscriber', subSchema);

module.exports = SubscriberModel;
