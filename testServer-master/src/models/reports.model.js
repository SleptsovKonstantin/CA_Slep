const { Schema, model } = require('mongoose');

const itemSchema = new Schema({

  hr: String,
  hrName: String,
  team: String,
  workGroup: String,
  plan: Number,
  month: String,
  year: String,
  days: {}, // day: day, otherSent,  otherAnswers, vkInterview, vkSent, vkAnswered, hhInit, hhOtkl, money, channel, comment
  updatedBy: String,
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
}, { timestamps: true });

itemSchema.statics.getReports = async function (query, params = {}) {
  const skip = parseInt(params.skip || 0, 10);
  const limit = parseInt(params.limit || 10, 10);
  const sortBy = params.sortBy || '-createdAt';

  const data = await this.find(query)
    .skip(skip)
    .limit(limit)
    .sort(sortBy)
    .lean();
  const count = await this.countDocuments(query);

  return {
    items: data, count, skip, limit, sortBy,
  };
};


module.exports = model('Report', itemSchema);
