const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  name: String,
  type: String,
  id: {
    type: String,
    unique: true,
    index: true,
  },
  updatedAt: {
    type: Date,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


module.exports = model('Channel', itemSchema);
