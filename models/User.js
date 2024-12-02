const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('./Address');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['Client', 'Restaurant'],
    default: 'Client'
  },
  cookingType: {
    type: String,
    enum: ['Japanese', 'Brazilian', 'Italian'],
    default: 'Brazilian'
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  address: {
    type: Address.schema,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
