const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  position: String,
  message: String,
  workGroup: String,
  month: Number,
  year: Number,
  createdAt: {
    type: Date,
  },
}, { timestamps: true });


module.exports = model('AnalyticsNotes', itemSchema);
