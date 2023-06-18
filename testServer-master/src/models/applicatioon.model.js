const { Schema, model } = require('mongoose');

const itemSchema = new Schema({

  type: String,
  position: String,
  workGroup: String,
  plan: Number,
  real_plan: Number,
  openedAt: Date,
  closedAt: {
    type: Date,
    default: null,
  },
  closedAtReal: {
    type: Date,
    default: null,
  },
  comment: String,
  passiveSearchBy: String,
  activeSearchBy: String,
  link: String,
  vacancy: String,
  deleted: {
    type: Boolean,
    default: false,
  },
  updatedBy: [String],
  updateLog: {
    position: [],
    workGroup: [],
    plan: [], // Should calculate automatically at create
    real_plan: [],
    openedAt: [],
    closedAt: [],
    closedAtReal: [],
    comment: [],
    passiveSearchBy: [],
    activeSearchBy: [],
    deleted: [],
  },
  createdAt: {
    type: Date,
  },
  createdById: String,
  createdBy: String,
  updatedAt: {
    type: Date,
  },
}, { timestamps: true });

itemSchema.statics.getApplications = async function (query, params = {}) {
  const limit = parseInt(params.limit || (params.noLimit ? '' : 25), 10);
  const skip = parseInt((params.page || 0) * limit, 10);
  const sortBy = params.sortBy || 'type -openedAt';
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


module.exports = model('Application', itemSchema);
