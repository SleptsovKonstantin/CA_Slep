const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  count: {}, // / { position: count }
  createdAt: {
    type: Date,
  },
}, { timestamps: true });


module.exports = model('EmployeeCount', itemSchema);
