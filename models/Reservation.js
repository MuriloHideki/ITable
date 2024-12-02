const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled', 'Pending'],
    default: 'Pending'
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
