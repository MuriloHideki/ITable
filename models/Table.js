const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  number: {
    type: String,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Reserved'],
    default: 'Available'
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
