const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  name: String,
  teams: [String],
  updatedBy: [String],
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


module.exports = model('WorkGroup', itemSchema);
